<div align="center">
  <img src="./apps/web/public/logo.png" alt="Pingify logo" width="100" />
  <h1>Pingify</h1>

  [![Discord](https://img.shields.io/badge/join-community-5865F2?logo=discord&logoColor=white)](https://discord.gg/BKAuX4Ce9q)
  ![Last Commit](https://img.shields.io/github/last-commit/shaurya9524/pingify?logo=github&color=brightgreen)
  [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
</div>

## About

Pingify is an open-source Discord bot that delivers social media notifications straight to your server, so you and your community never miss a thing. This repository is a monorepo for both the bot and its web dashboard.

## Supported Platforms

| Platform      | Type                  |
|---------------|-----------------------|
| YouTube       | Videos                |
| Twitch        | Live Streams          |
| Kick          | Live Streams          |
| Trovo         | Live Streams          |
| Reddit        | New Posts             |
| X (Twitter)   | New Posts             |
| Bluesky       | New Posts             |

## Monorepo Structure

This is a monorepo containing two sub-projects:

```
pingify/
└── apps/
    ├── bot/        # Discord bot: handles API integrations, scheduling, and posting notifications
    └── web/        # Web dashboard: manage servers, integrations & subscriptions
```

Each app has its own README with setup and deployment instructions.

## Getting Started

### Prerequisites

- Node.js `>=18`
- MongoDB instance
- A Discord application & bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
git clone https://github.com/shaurya9524/pingify.git
cd pingify
```

Then follow the setup instructions in each app's README:

- [`apps/bot/README.md`](apps/bot/README.md)
- [`apps/web/README.md`](apps/web/README.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to Pingify.

## Community & Support

Have a question, found a bug, or just want to hang out? Join our Discord server, it's the best place to get help, follow updates, and connect with other Pingify users.

[![Join our Discord](https://img.shields.io/badge/join-community-5865F2?logo=discord&logoColor=white)](https://discord.gg/BKAuX4Ce9q)