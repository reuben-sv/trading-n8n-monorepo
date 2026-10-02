# Trading Workflow Builder

A learning project for building a visual workflow editor for crypto trading automations. The project is inspired by a YouTube tutorial by Harkirat Singh, which I followed while learning and building alongside the video.

AI helped with the UI design. I wrote the frontend structure and implementation myself as part of the learning process.

## What it does

The client is a React app with a node-based workflow canvas. You can start a workflow with a trigger, add an action, and connect nodes. The current node examples include:

- **Triggers:** price and timer
- **Actions:** Lighter, Backpack, and Hyperliquid

This is a work in progress and a learning project. The current focus is the frontend workflow-building experience; the repository does not currently include a trading execution backend.

## Tech stack

- React, TypeScript, and Vite
- [React Flow](https://reactflow.dev/) for the workflow canvas
- Tailwind CSS
- A shared `common` package for workflow metadata types
- npm workspaces and Turborepo for the monorepo

## Run locally

Requirements: Node.js 24 or newer and npm 10.9.0.

Install dependencies from the repository root:

```sh
npm install
```

Start the client:

```sh
npm run dev --workspace=client
```

Open the `/create-workflow` route in the local Vite URL printed in the terminal.

## Useful commands

Run from the repository root:

```sh
npm run build
npm run lint
npm run check-types
```

## Project structure

```text
apps/
  client/       React workflow builder
packages/
  common/       Shared workflow metadata types
  eslint-config/
  typescript-config/
```

## Acknowledgment

Thanks to Harkirat Singh for the tutorial that inspired this project. This repository is my own learning implementation built while following along.
