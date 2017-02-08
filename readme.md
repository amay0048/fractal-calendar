# A Calendar Picker Implemented in Angular, @Angular and React

[See this slide deck for a very tenuious rationale about this project](http://slides.com/anthonymay/1-component)

## You'll need node and libsass to run this code

```
brew install node
brew install libsass
npm install
```

## Directory Structure

[See this slide deck for an explaination of the directory structure](http://slides.com/anthonymay/1-component/#/4)

## NPM Scripts
The primary development tasks for the various environments are managed via npm scripts.

All these tasks can be run via the root of the project, by using `npm run {{taskName}}` e.g. `npm run watch:dev`

### @Angular
- `watch:dev`: This serves the the angular2 project using webpack-dev-server. The transpiled files are held in memory
- `build:dev`: This will build the codebase to www/@angular/*. Useful to examine the transpiled code.
- `watch:prod`: The same as watch:dev, but uses the -p option of webpack. This will serve the minified & uglified code. The transpiled code will be held in memory.
- `build:prod`: Same as previous, but this will output the code to www/@angular/*
    
### Angular
- `watch:dev:ng`: Same as above but it will compile the angular1 codebase
- `build:dev:ng`: Same as above, but it will output to www/angular/*
- `watch:prod:ng`: Same as above, but it will compile the angular1 codebase
- `build:prod:ng`: Same as above, but it will output the minifed code to www/angular/*

### React
- `watch:dev:react`: Same as above but it will compile the react codebase
- `build:dev:react`: Same as above, but it will output to www/react/*
- `watch:prod:react`: Same as above, but it will compile the react codebase
- `build:prod:react`: Same as above, but it will output the minifed code to www/react/*

### Tests
- `test`: This will run the mocha tests, currently these only cover the calendar data provider. This tasks will be run subsequent to all previous tasks, and every time you change a file if you're running any `watch` task.
