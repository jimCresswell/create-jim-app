# To Do

## Development

These are changes to be made to this repo, the CLI tool, not the target project.

- [x] Add linting to this repo
- [x] Add formatting to this repo
- [x] Convert codebase to TypeScript
- [ ] Add testing to this repo.
- [ ] Add CI/CD workflows to this repo.
- [ ] Add semantic versioning to this repo, and make sure it is updated automatically.
- [ ] Refactor index.ts into tested modules.
- [ ] Simplify template copying logic.
- [ ] Add publishing to this repo.

## Functionality

This CLI tool should create a production-ready Next.js application.

- [x] Make sure all appropriate configuration files are written or copied to the target project.
- [x] Make sure the target project configuration files are complete and correct (ish).
- [ ] Update the target project eslint config to use the new flat config format.
- [ ] Stretch: use custom Next.js templates to further customize the target project.

## Feedback

Feedback to the user, from this CLI tool, should be clear and helpful.

- [x] validate if the Github CLI is installed.
- [x] validate if the user is logged in to Github.

## UX of the CLI

- [ ] Pull the version from the package.json file.
- [ ] Make sure all arguments can be passed using flags, so that the script can be run non-interactively.
- [ ] Distinguish between required and optional arguments.
- [ ] Make sure that optional arguments have sensible defaults.
- [ ] Add a spinner when creating the repository.
