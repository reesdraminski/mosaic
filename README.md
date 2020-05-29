# mosaic
A fork of my work at TeCanal in order to make the features a little more advanced and ready for "real" game development, as opposed to the scaffolded learning library purposes it serves at TeCanal.

## Code
* [js/api.js](js/api.js): Classes that constitute the Mosaic API for the user to create their art/games.
* [js/app.js](js/app.js): UI controls and functionality (CodeMirror setup, docs generation, code execution, etc).
* [js/sw.js](js/sw.js): The ServiceWorker that implements a cache-first approach to speed up load times.

## Content
* [data/docs.json](data/docs.json): Documentation for the various APIs that can be used by the user.
* [data/lessons.json](data/lessons.json): Basic JavaScript instruction to get the user started with the basics of JavaScript and the Mosaic APIs.
* [data/tutorials.json](data/tutorials.json): Mosaic-specific tutorials for animation and game development.

## Dependencies
* [LZMA-JS](https://github.com/LZMA-JS/LZMA-JS): This is used to use LZMA compression on code content for the Share Code link feature.
* [Esprima](http://esprima.org/): This is used to parse the AST of user code to do code instrumentation in order to detect and protect against infinite loops.
* jQuery: This is only for jQuery-resizable, hopefully I can find a vanilla implementation or write my own in the future.
* [jQuery-resizable](https://github.com/RickStrahl/jquery-resizable): This is used to make the resizable split panel view in the application.
