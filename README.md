[![CircleCI](https://circleci.com/gh/moneyforwardvietnam/pjc_frontend/tree/develop.svg?style=svg&circle-token=2a9ce746920c8c7a368282a6c6b4b62e4dfea123)](https://circleci.com/gh/moneyforwardvietnam/pjc_frontend/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/moneyforwardvietnam/pjc_frontend/badge.svg?branch=develop&t=IVkH1r)](https://coveralls.io/github/moneyforwardvietnam/pjc_frontend?branch=develop)

# PJC Frontend

## Update submodule

```
  git submodule update --init --remote --merge
```

## How to develop

```bash
  cp .env.development .env.local
  yarn && yarn dev
```

## Setup VScode

- setup extensions on Linux / Mac:
  ```
    cat .vscode/extensions | xargs -L 1 code --install-extension
  ```
- on Window:
  ```
    cat .vscode/extensions |% { code --install-extension $_}
  ```
- If you cannot run, maybe your vscode install is not correct
    - setup your vscode path into environment
    - Cmd+Shift+P (MAC) or Ctrl+Shift+P (Windows) and typing: 'install code ...'
    - ![image](https://user-images.githubusercontent.com/88994767/151102867-8c48ad74-4a43-4f90-8e15-bfbc1b5a26a5.png)
    - Rerun your command to install extensions

## Support Docker local

- start
  ```
    docker-compose up
  ```
- stop
  ```
    docker-compose stop
  ```
- build
  ```
    docker-compose build
  ```

## To build and start production in local

```
  cp .env.development .env.local
  yarn build && yarn start
```

note: .local file is ignore by .gitignore

## To test all

- develop test code

```
  yarn test:dev
```

- update snapshot

```
  yarn test:update
```

- test all

```
  yarn test
```

## To test one file

- test one file (also snapshot)

```
  yarn test:one <path>
```

## Memo: Use to setup project, use in CAUTIONS

- Export all extensions:
  ```bash
    code --list-extensions > .vscode/extensions
  ```
