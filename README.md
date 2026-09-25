# be-waizard

Backend for a chat with an AI wizard. A NestJS study project: modules, authentication, streaming, and an external API integration.

The mobile app (Expo) lives in another repository. This repository is the API only.

## Stack

- NestJS 11
- Prisma + SQLite
- JWT
- Zod
- SSE for the AI reply
- Swagger

Module layout, data model, and routes are in [docs/architecture.md](docs/architecture.md). What is already done is in [docs/status.md](docs/status.md).

## Current state

Prisma schema, the SQLite migration, and startup env validation are in place. Auth, conversations, and messages are not. See [docs/status.md](docs/status.md).

## How to run

```bash
npm install
cp .env.example .env
npm run start:dev
```

`PORT` and `DATABASE_URL` are required to boot. The other variables in `.env.example` are for later features.

```bash
npm test
npm run test:e2e
npm run lint
```

## How this repo is meant to be used

Each feature is implemented by hand. AI comes in afterward, to review what was finished. That review agreement is in [CLAUDE.md](CLAUDE.md).
