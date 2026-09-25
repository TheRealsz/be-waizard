# Context for AI review

Working instructions for any assistant (Cursor, Claude, or otherwise) in this repository.

## What this project is

A NestJS API for a chat with a single NPC, a wizard. The goal is to learn NestJS (modules, auth, streaming, an external API), not to ship a complete product.

The user implements each feature alone. The AI reviews the result when asked. Do not start the next feature early.

## Before answering

1. Read [docs/status.md](docs/status.md) to see what already exists.
2. Read [docs/architecture.md](docs/architecture.md) and treat it as the contract. If the code diverges from it, point out the divergence instead of inventing another design.
3. Look at the diff or the files of the feature under review. Do not assume the scaffold is still the real state if the status doc says otherwise.

## When the request is a review

Review only the feature just finished. Reply in the language the user wrote in.

Check, in this order:

- The feature matches the corresponding item in `docs/status.md` and the routes and rules in `docs/architecture.md`.
- The Nest module sits where the layout says it should, with a thin controller and the rule in the service.
- Protected routes require a JWT. Conversations and messages are reachable only by their owner.
- The password never comes back in a response, or in a log.
- Input is validated with Zod.
- The AI reply, once that feature exists, uses the wizard's fixed prompt and persists the assistant message only when the stream finishes.
- A unit test covers the service and, when the route is new, an e2e covers the happy path. For conversation and message e2e, cover the case where another user cannot access the resource.
- Swagger describes the new route.
- Nothing outside scope (a second NPC, refresh tokens, XP, multiplayer, offline).

Point out concrete problems and the smallest change that fixes them. Do not rewrite the user's solution. Do not implement the fix unless they explicitly ask.

If the review is accepted, update the checkbox in `docs/status.md`.

## When the request is implementation

Implement only what that message asks for. Stop at the end of that feature. Do not add the next one because it is nearby.

If the request contradicts `docs/architecture.md`, follow the request and update the doc in the same change, so the contract does not go stale.

## Outside this repository

Do not create an Expo app, screens, sprites, or navigation here. If the question is about the mobile contract, say what the API needs to expose and stop.
