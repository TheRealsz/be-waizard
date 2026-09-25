# Architecture

Backend contract. If a decision changes, update this file before following the new code.

## Scope

In:

- Signup, signin, and JWT (access token only; no refresh token)
- Authenticated user profile and account deletion
- Create and list the current user's conversations
- Send a message, store history, and reply with the AI
- Fixed wizard personality prompt
- Streaming the reply over SSE
- Rate limit on the message send route
- Swagger
- Unit tests and basic e2e tests

Out: multiple NPCs, levels/XP, multiplayer, monetization, offline-first, and the mobile app in this repository.

The mobile app (Expo, Expo Router, TanStack Query) consumes this API. Screens planned there: sign in, sign up, chat with progressive text, a conversation drawer, a profile modal, and a delete confirmation. The API does not need to know about sprites or sound.

## Modules

```
src/
  main.ts
  app.module.ts
  prisma/            global PrismaModule
  auth/              signup, signin, JwtStrategy, guard
  users/             profile and deletion
  conversations/     create and list
  messages/          history, send, SSE
  ai/                fixed prompt + external API client
```

The controller receives the request and sends the response. The service holds the rule. Prisma stays behind the service. The AI HTTP client lives only in `ai/`.

## Data model

`schema.prisma` does not exist yet. When it is created, this is the shape:

```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  passwordHash  String
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  conversations Conversation[]
}

model Conversation {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String    @default("New conversation")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  messages  Message[]

  @@index([userId])
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  role           Role
  content        String
  createdAt      DateTime     @default(now())

  @@index([conversationId])
}

enum Role {
  USER
  ASSISTANT
}
```

SQLite via `DATABASE_URL`. Passwords are bcrypt hashes in `passwordHash`. Deleting the account deletes conversations and messages through the cascade.

## Auth

- `POST /auth/signup` and `POST /auth/signin` are public.
- Signup and signin return `{ accessToken }`.
- Every other route requires `Authorization: Bearer <token>`.
- Either a global guard with `@Public()` on open routes, or a guard only on protected controllers. Pick one and keep it.
- Expiry comes from `JWT_EXPIRES_IN`. No refresh token.

Signup body: `email`, `password`, optional `name`. Signin body: `email`, `password`.

## Authenticated routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/users/me` | Profile: `id`, `email`, `name`, `createdAt` |
| PATCH | `/users/me` | Updates `name` |
| DELETE | `/users/me` | Deletes the account |
| POST | `/conversations` | Creates a conversation. `title` is optional |
| GET | `/conversations` | Lists only the user's conversations, newest first |
| GET | `/conversations/:id/messages` | Conversation history, chronological |
| POST | `/conversations/:id/messages` | Stores the user message and opens the SSE reply |

Every conversation or message read and write filters by the token's `userId`. Another user's resource responds with 404.

`GET /users/me` does not include `passwordHash`.

## Streaming

Recorded decision: SSE, not WebSocket. The AI reply is a server-to-client stream; SSE covers that with less machinery. Switching to WebSocket means updating this file before implementing it.

`POST /conversations/:id/messages` with `{ content }`:

1. Validate the body and confirm the conversation belongs to the user.
2. Store the `USER` message.
3. Load the history and call `AiService` with the wizard's fixed prompt.
4. Send SSE events as tokens arrive.
5. When the stream finishes, store one `ASSISTANT` message with the full text.
6. If the stream fails midway, emit an error and do not store a partial assistant message.

SSE events:

- `token` — a piece of text
- `done` — id of the assistant message already saved
- `error` — failure; no `ASSISTANT` row persisted

The wizard prompt is a constant under `src/ai/`, not a user-editable field. The personality text is up to whoever implements it; the rule here is only that it is fixed and there is one of them.

`AiService` exposes the stream. URL, model, and key come from the environment. No other module calls the external API directly.

## Rate limit

`@nestjs/throttler` on `POST /conversations/:id/messages`: 10 requests per minute per user. Other routes are outside that limit.

## Validation and docs

- Zod at the HTTP boundary. A custom pipe or `nestjs-zod`; do not mix the two.
- Swagger at `/docs`.
- No global prefix. The routes above are the full path.

## Tests

- Unit: services, with Prisma and `AiService` mocked.
- E2E: signup/signin, a request without a token is rejected, a user cannot read someone else's conversation, sending a message with the AI mocked (no external network).

## Environment

See [.env.example](../.env.example). Do not commit `.env`.
