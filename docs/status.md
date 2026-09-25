# Status

Update this file when a feature is accepted in review. While a checkbox is open, the matching code does not exist or has not been reviewed.

Suggested order. A feature's tests land with the feature, not in a block at the end. A route's Swagger lands with the route.

## Foundation

- [x] Prisma, SQLite, and `PrismaModule`
- [x] Environment variables loaded at startup and reviewed

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

Prisma, SQLite, and startup env validation are in place. The schema is applied through `20260925182447`, on top of `20260925160911_init`. Next up is auth.
