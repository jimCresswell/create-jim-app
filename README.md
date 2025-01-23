# create-jim-app

Create a Next.js app, configured the way I like it.

## Development

Up to `SHOW_STACK=true node ./dist ./e2e_tests/test_apps/fake_app` and debugging errors.

## Overview

This is a CLI tool (this repository), built with:

- TypeScript
- ESLint
- Prettier
- Vitest
- Husky
- CI/CD Workflows (GitHub Actions)
- the `create-next-app` CLI tool
- the GitHub CLI

The function is to create a production-ready Next.js application (the target project) with:

- TypeScript
- ESLint
- Prettier
- Vitest
- Husky
- CI/CD Workflows (GitHub Actions)

by leveraging the `create-next-app` CLI tool. Created projects will be added to GitHub.

A future feature consideration is automatically deploying to Vercel, and configuring the GitHub-Vercel integration.

## Architecture

The tool is structured as follows:

- **CLI Interface**: Handles user input and options.
- **Templates**: Provides the configuration files for the target project, to be added to the project created using the `create-next-app` CLI tool.
- **Target Project Operations**: Automates setup tasks like dependency installation and GitHub integration.

## Installation

```bash
pnpm add -g create-jim-app
```

## Usage

```bash
create-jim-app [your-app-name]
```

## Options

- `--public` Create a public GitHub repository.
- `--private` Create a private GitHub repository.
- `--no-dependabot` Skip Dependabot configuration.
- `--new-dir` Create the app in a new directory with the name of the app, the default is to use the current directory.

## Development Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/create-jim-app.git
   cd create-jim-app
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the Tool Locally**:

   ```bash
   pnpm start
   ```

## Code Structure

- **src/**: Contains the main source code.
- **templates/**: Holds template files for new projects.
- **tests/**: Includes test files and configurations.

## Configuration Details

- **tsconfig.json**: Configures TypeScript settings.
- **.eslintrc**: Sets up ESLint rules.
- **prettier.config.cjs**: Defines Prettier formatting options.

## Testing

Run tests using Vitest:

```bash
pnpm test
```

## Common Tasks

- **Build the Project**:

  ```bash
  pnpm build
  ```

- **Lint the Code**:

  ```bash
  pnpm lint
  ```

## Troubleshooting

- **Common Issue 1**: Description and solution.
- **Common Issue 2**: Description and solution.

## Future Roadmap

- Implement Vercel deployment.
- Add more customization options for Next.js templates.
