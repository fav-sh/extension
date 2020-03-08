## Fav.sh 2.0

## Wait why rebuild the project?

Long story short I have learned quite a bit about how Javascript and Bundling works since Fav.sh v1, rather than going back and trying to fix my mistakes in the original version, I've decided to rebuild the app from ground up instead.

## Dependencies

* NodeJS
* yarn (npm install -g yarn)

## Installation

* Ensure that you have NodeJS and Yarn

* `yarn` to install dependencies

* If you want working Github Gist intergraiton you will need to supply both a `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in an .env file. To get either you must create an Oauth application in Github. More info on this coming soon.


## How to run

**firefox** - run `yarn firefox`, this will build the extension and open Firefox with the extension installed. Note if this is your fist time building the command will fail. To get around this run yarn bundle then close the bundler and rerun yarn firefox. The same applies for chrome. This only needs to be done on a fresh install

**chrome** - run `yarn chrome`, this will build the extension and open Chrome with the extension installed

**settings page** - While the settings page can be accessed via the extension, if you want to just run the settings page use `yarn start:settings`

**web** - For easier debugging you can run the app as a web-app. Note this is very buggy right now.

## How to build

**firefox** - run `yarn build:firefox` to build the extension, the resulting zip file will be under `web-ext-artifacts`. Right now you if you want to run the extension you must do so under Addons > Debug > Install Temporary Extension. It will fail under a regular install because I haven't signed it.


## Project Structure

The project is structured with this basic structure

```
src/
  styles/
  js/
  entry/
  icons/
  manifest.json

```

`styles/` - stores the root styles of the extension, all components within the app are styled using `styled-components`

`js/` - stores all Javascript code to the app.

`entry/` - stores all entry points into the app

`icons/` - stores extension icons

`manifest.json` - extension manifest


## Keeping things clean

Typecheck - `yarn tsc` will check the typescript types

Prettier - `yarn format` will format the projects code with prettier

You can run both with `yarn ci`

## Debugging

Redux - This project ships with Redux devtools. Press ctrl + p to toggle the  redux panel. Note this panel is only included in the development version


## Contributing 

Feel free to check out this projects [TODO](TODO.md) to get a sense of things that need to be done. From there feel free to open a pull request. For non-technical users I really appreciate bug reports.
