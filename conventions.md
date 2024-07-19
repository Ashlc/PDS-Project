# Project conventions

Below are the conventions I'm proposing for this project. If you have any questions or suggestions, feel free to ask.

## Table of contents

- [Project conventions](#project-conventions)
  - [Table of contents](#table-of-contents)
  - [Code style](#code-style)
  - [Commit messages](#commit-messages)
  - [Branches](#branches)
  - [\[:construction:\] Folder structure](#construction-folder-structure)

## Code style

We will be using [Prettier](https://prettier.io/) to format our code. You can install it in your code editor or run it as a CLI tool. The configuration file is already in the repository. If you have any questions, feel free to ask.

## Commit messages

We will be using [IURICODE](https://github.com/iuricode/padroes-de-commits)'s commit standards in English. Please give it a read. If any questions arise, feel free to ask. GPT can also recommend a commit message.

Example of commit messages:

```bash
:sparkles: feat: Add new feature
:bug: fix: Correct a bug
:recycle: refactor: Code refactoring
```

Which will render as:

- :sparkles: feat: Add new feature
- :bug: fix: Correct a bug
- :recycle: refactor: Code refactoring


## Branches

We will be using the following branch naming convention:

- `main`: Main branch. Only stable code will be merged here.
- `develop`: Development branch. All new features will be merged here.
- `feature/feature-name`: Branch for developing a new feature.
- `fix/fix-name`: Branch for fixing a bug.
- `hotfix/hotfix-name`: Branch for fixing a bug in production.
- `release/release-name`: Branch for preparing a new release.
- `docs/docs-name`: Branch for documentation changes.
- `style/style-name`: Branch for style changes.

The ones you will be using the most are `main`, `develop`, `feature/feature-name`, and `fix/fix-name`.

## [:construction:] Folder structure 

SOON

