
<div align="center">
  <image src="icon.png" height="256" width="256">
  <h2>Fav Bookmark Manager</h2>
</div>

Fav is an open souce bookmark manager that syncronizes with Github Gist. This is the source code for the extension on Chrome and Firefox.

## Status

[![Actions Status](https://github.com/fav-sh/extension/workflows/tests/badge.svg)](https://github.com/fav-sh/extension/actions)

## Download

<a href="https://chrome.google.com/webstore/detail/fav-bookmark-manager/gammmbkeceiljlgijimbhhgkfmiejnkl?hl=en" target="_blank" alt="chrome-download"><image src="resources/chrome.png"></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/fav/" target="_blank" alt="firefox-download"><image src="resources/firefox.png"></a>


## Setup

* Make sure you have a NodeJS enviorment setup with `yarn` installed (`npm install -g yarn`)
* Clone the repository using `git clone` and install the dependencies with `yarn`


## Authentication

You need a personal access token in order to authenticate with Github. For development, because memory is always wiped, put your token in an env and assign it to the variable `GITHUB_PERSONAL_ACCESS_TOKEN`. See `.env.example` for an example. This will prefill the info on that screen

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

**Releasing for Production**: To build a version to release to the app store, run `yarn build:firefox` then upload the zip file found in web-ext-artifacts

**Uploading Source Code**: The easiest way of uploading the source code for release is to run `yarn clean` to remove any temorary files then running `zip -r extension-source.zip .`


### Building for Chrome

NOTE: You must have a build key in your home directory named `buidkey.pem` before trying to use the command `yarn build:chrome`

1. Run `yarn build:chrome` to build the extension for chrome.
2. Open chrome and navigate to `chrome://extensions` and enable developer settings
3. In developer settings pack the extension from the `dist/` directory


## Authentication

Authentication is done via personal access tokens for both Chrome and Firefox. We attempted to use Github Oauth2 for a while but it proved to not be stable enough at this time.


## Enviorment Varibles

* TARGET (chrome | firefox): Which browser to bundle for
* NODE_ENV (development | production): Enviorment to bundle for
* 


## Branding

[Branding Guidelines for Chrome](https://blog.mozilla.org/addons/2015/11/10/promote-your-add-ons-with-the-get-the-add-on-button/)

[Branding Guidelines for Firefox](https://blog.mozilla.org/addons/2015/11/10/promote-your-add-ons-with-the-get-the-add-on-button/)



## Liscense

[MIT](LICENSE.md)