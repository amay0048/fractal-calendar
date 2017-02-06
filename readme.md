```
brew install node
brew install libsass
```

# A Calendar Picker Implemented in Angular, @Angular and React

## Directory Structure

## NPM Scripts
The primary development tasks for the various environments are managed via npm scripts:

### @Angular
- `watch:dev`: "NODE_ENV=dev TARGET=@angular webpack-dev-server -w",
- `build:dev`: "NODE_ENV=dev TARGET=@angular webpack",
- `watch:prod`: "NODE_ENV=prod TARGET=@angular webpack-dev-server -w -p",
- `build:prod`: "NODE_ENV=prod TARGET=@angular webpack -p",
    
### Angular
- `watch:dev:ng`: "NODE_ENV=dev TARGET=angular webpack-dev-server -w",
- `build:dev:ng`: "NODE_ENV=dev TARGET=angular webpack",
- `watch:prod:ng`: "NODE_ENV=prod TARGET=angular webpack-dev-server -w -p",
- `build:prod:ng`: "NODE_ENV=prod TARGET=angular webpack -p",

### React
- `watch:dev:react`: "NODE_ENV=dev TARGET=react webpack-dev-server -w"
- `build:dev:react`: "NODE_ENV=dev TARGET=react webpack"
- `watch:prod:react`: "NODE_ENV=prod TARGET=react webpack-dev-server -w -p"
- `build:prod:react`: "NODE_ENV=prod TARGET=react webpack -p"

### Tests
    "test": "mocha -r ts-node/register src/**/*Test.ts"
