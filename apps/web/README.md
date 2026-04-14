# Pingify Dashboard

Pingify dashboard is a web app for managing your Discord server's notification subscriptions. Connect your server, browse supported platforms, and configure which channels receive notifications.

---

## Project Structure

```
apps/web/
├── app/
│   ├── dashboard/                # Main dashboard page
│   └── layout.tsx
├── components/
│   └── ui/
│       ├── GuildSubscriptionsCard.tsx
│       └── SubscriptionCard.tsx
├── lib/
│   ├── hooks/
│   │   └── useSubscriptions.ts   # Subscription state + fetching
│   └── types/                    # Shared TypeScript interfaces
└── database/
    ├── models/                   # Mongoose models
    └── utils/
        └── connectDb.ts          # MongoDB connection utility
```

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- MongoDB instance
- Discord application with OAuth2 configured ([Discord Developer Portal](https://discord.com/developers/applications))

### Setup

```bash
cd apps/web
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

### Environment Variables

| Variable                        | Description                     |
|---------------------------------|---------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key        |
| `DISCORD_CLIENT_ID`             | Discord OAuth2 client ID        |
| `DISCORD_CLIENT_SECRET`         | Discord OAuth2 client secret    |
| `DISCORD_CLIENT_TOKEN`          | Discord bot client token        |
| `MONGODB_URI`                   | MongoDB connection string       |
| `YOUTUBE_API_KEY`               | YouTube Data API key            |
| `TWITCH_CLIENT_ID`              | Twitch API client ID            |
| `TWITCH_CLIENT_SECRET`          | Twitch API client secret        |
| `TWITCH_CALLBACK_URL`           | Twitch EventSub callback URL    |
| `KICK_CLIENT_ID`                | Kick API client ID              |
| `KICK_CLIENT_SECRET`            | Kick API client secret          |
| `X_BEARER_TOKEN`                | X (Twitter) bearer token        |
| `TROVO_CLIENT_ID`               | Trovo API client ID             |

### Run in Development

```bash
npm run dev
```

### Build & Run

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`.

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on how to contribute to Pingify.

---

## Community & Support

Have a question, found a bug, or just want to hang out? Join our Discord server — it's the best place to get help, follow updates, and connect with other Pingify users.

[![Join our Discord](https://img.shields.io/badge/join-community-5865F2?logo=discord&logoColor=white)](https://discord.gg/BKAuX4Ce9q)