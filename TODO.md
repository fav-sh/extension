## TODO
Items I haven't gotten to yet

---

* (General) Create a build process to build the app to Chrome targets


* (Chrome) The extension uses browser.* actions which cause chrome to crap out (on add bookmark specifically). Helpers in the `browser` folder should re retrofitted to support chrome's `chrome.*` and firefox's `browser.*`
  * Update storage adapter to support chrome: Right now the storage adapter is declared with `browser.*`, this should be updated to support chrome as well



## DONE 
Move any done tasks here

---

* (General) Create a build process to build the app to Firefox targets

* (Firefox) The manual build process is broken and does not let you install the extension. This needs to be fixed.

* (General) For some reason `redux-persist-webextension-storage` causes both Chrome and Firefox to crash in production. There has to be something wrong with the package. Either fork/patch the package or find another way.

* (JS) Regenerator Runtime errors are preventing use of async functions and thus blocking the local backup feature. This is widely documented on Github so look for clues and fixes there.