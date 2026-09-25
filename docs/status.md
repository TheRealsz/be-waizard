# Status

Update this file when a feature is accepted in review. While a checkbox is open, the matching code does not exist or has not been reviewed.

Suggested order. A feature's tests land with the feature, not in a block at the end. A route's Swagger lands with the route.

## Foundation

- [ ] Prisma, SQLite, and `PrismaModule`
- [ ] Environment variables loaded at startup

## Auth

- [ ] Signup
- [ ] Signin
- [ ] JWT on protected routes
- [ ] E2E: happy path and a request without a token

## User

- [ ] `GET /users/me`
- [ ] `PATCH /users/me`
- [ ] `DELETE /users/me` (cascade conversations and messages)

## Conversations

- [ ] Create a conversation
- [ ] List the user's conversations
- [ ] E2E: another user cannot access the conversation

## Messages and AI

- [ ] Conversation history
- [ ] Send a message and store the user's
- [ ] `AiService` with the wizard's fixed prompt
- [ ] SSE (`token`, `done`, `error`) and persist `ASSISTANT` only at the end
- [ ] Rate limit on the message POST
- [ ] E2E of send with the AI mocked

## Cross-cutting

- [ ] Swagger at `/docs` covering the routes that exist

## Right now

Nothing beyond the Nest CLI scaffold (`src/main.ts`, `src/app.module.ts`).
