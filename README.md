# gulpfile

I found myself re-writing the same basic gulpfile. For access anywhere and getting new projects up
and running faster.

#### Commonly used front-end automation tasks:
* Sass to CSS
* Writing Node JS modules that get built into client side JS
* Transpiling ES6 JS
* Transpiling React JS(X)
* Linting
* Minifying
* Watching
* Testing

#### Dev Folder Structure:
.
+-- css/
+-- sass/
+-- js/
+-- js_public/
+-- node_modules/
+-- react/
+-- .sass-lint.yml
+-- gulpfile.js
+-- package.json

#### Basic Cycle:
1. Either running `gulp watch` or not, write sass styles in `sass/`, react code in `react/` or
whatever flavor or JS in `js/`.
2. If the `watch` command was running, simply save the file you're working on and linting, testing,
and building all take place automatically and output the code to the correct folder. For sass that's
`css/`. JS and React code both get dumped into `js_public/`.
3. If `watch` is not running, you're free to do a complete build by simply running `gulp` or run any
of the tasks independently. See below for tasks.
4. If you want to minify code, pass the flag `--minify` to any task command.

#### Tasks:
##### gulp
Default. Runs all tasks: linting, testing, and building.
##### gulp watch
Waits for changes in source code. Runs all tasks.
##### gulp lint
Lints code. No built output. Define Sass lint rules in `.sass-lint.yml`
##### gulp test
Runs tests. No built output.
