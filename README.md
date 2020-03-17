
<div align="center">
  <image src="icon.png" height="256" width="256">
  <h2>Fav Bookmark Manager</h2>
</div>

Fav is an open souce bookmark manager that syncronizes with Github Gist. This is the source code for the extension on Chrome and Firefox.

## Setup

* Make sure you have a NodeJS enviorment setup with `yarn` installed (`npm install -g yarn`)
* Clone the repository using `git clone` and install the dependencies with `yarn`


## Running the Extension

### Before you Run

Prior to running `yarn chrome` and `yarn firefox` for the first time, run `yarn bundle` and then quit once the bundle is built. 
If you do not do this then both these commands will fail

### Running in Firefox

To run the extension in Firefox use the command `yarn firefox` to run both the bundle and web-ext commands

### Running in Chrome

To run the extension in Chrome use the command `yarn chrome` to run both the bundle and web-ext commands


## Building the Extension

To build the extnsion for production follow the steps below for each platform

### Building Firefox

1. Run `yarn build:firefox` to build the extension with the firefox target.

### Building for Chrome

NOTE: You must have a build key in your home directory named `buidkey.pem` before trying to use the command `yarn build:chrome`

1. Run `yarn build:chrome` to build the extension for chrome.
2. Open chrome and navigate to `chrome://extensions` and enable developer settings
3. In developer settings pack the extension from the `dist/` directory




## Enviorment Varibles

* TARGET (chrome | firefox): Which browser to bundle for
* NODE_ENV (development | production): Enviorment to bundle for


## Liscense

[MIT](LICENSE.md)