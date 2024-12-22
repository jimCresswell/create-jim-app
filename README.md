# create-jim-app

Create a Next.js app, configured the way I like it.

This is CLI tool (this repo) to create a production-ready Next.js application (the target project) with:

- TypeScript
- ESLint
- Prettier
- Jest
- Husky
- CI/CD Workflows

## Installation

```bash
pnpm add -g setup-next-app-cli
```

## Usage

```bash
setup-next-app [app-name]
```

## Options

- `--public` Create a public GitHub repository.
- `--private` Create a private GitHub repository.
- `--no-dependabot` Skip Dependabot configuration.

## Start Developing

```bash
cd your-app-name
pnpm dev
```
