# Pingify

Pingify is a Discord bot that delivers real-time notifications from your favorite platforms: YouTube, Reddit, Twitch, Kick, X, Bluesky, and Trovo, directly to your Discord server. Once added to your server, the bot monitors your active subscriptions and posts rich embed notifications to designated channels whenever new content is published.

Subscriptions are managed exclusively via the [Pingify dashboard](https://pingify.vercel.app).

---

## Project Structure

```
apps/bot/
├── src/
│   ├── commands/        # Slash command definitions and handlers
│   ├── lib/
│   │   ├── workers/     # Per-platform polling workers
│   │   └── utils/       # Shared utilities (worker wrapper, etc.)
│   ├── database/
│   │   └── models/      # Mongoose models (Subscription, Guild, etc.)
│   └── index.ts         # Bot entrypoint
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- MongoDB instance
- Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Setup

```bash
cd apps/bot
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

### Environment Variables

| Variable               | Description                    |
|------------------------|--------------------------------|
| `CLIENT_ID`            | Discord application client ID  |
| `TOKEN`                | Discord bot token              |
| `MONGODB_URI`          | MongoDB connection string      |
| `YOUTUBE_API_KEY`      | YouTube Data API key           |
| `TWITCH_CLIENT_ID`     | Twitch API client ID           |
| `TWITCH_CLIENT_SECRET` | Twitch API client secret       |
| `TWITCH_CALLBACK_URL`  | Twitch EventSub callback URL   |
| `KICK_CLIENT_ID`       | Kick API client ID             |
| `KICK_CLIENT_SECRET`   | Kick API client secret         |
| `X_BEARER_TOKEN`       | X (Twitter) bearer token       |
| `TROVO_CLIENT_ID`      | Trovo API client ID            |

### Run in Development

```bash
npm run dev
```

### Build & Run

```bash
npm run build
npm start
```

---

## Slash Commands

| Command          | Description                                   |
|------------------|-----------------------------------------------|
| `/help`          | Display bot info and available commands       |
| `/usage`         | Learn how to set up and use Pingify           |
| `/subscriptions` | View all active subscriptions for your server |

To add, edit, or remove subscriptions, use the [Pingify dashboard](https://pingify.vercel.app).

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on how to contribute to Pingify.

---

## Community & Support

Have a question, found a bug, or just want to hang out? Join our Discord server, it's the best place to get help, follow updates, and connect with other Pingify users.

[![Join our Discord](https://img.shields.io/badge/join-community-5865F2?logo=discord&logoColor=white)](https://discord.gg/BKAuX4Ce9q)