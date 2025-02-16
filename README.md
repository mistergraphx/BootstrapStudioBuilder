# Bootstrap Studio Builder

Optimize your Bootstrap Studio exports, before serving them to the real world.

Mainly a simple gulp task, witch can be extended to your own workflow.

## Features

- Images optimization with image-resize, imagemin
- Minified html
- css auto-prefixing, support for --var, calc(), imports, url with postcss or your custom processing

## Install:

```shell
cd my_directory
git clone https://github.com/mistergraphx/BootstrapStudioBuilder.git
npm install
# if you havent install it yet or if you have already installed a previous version (<5)
npm install -g gulp-cli
# rename default postcss.config.default.js
cp postcss.config.default.js postcss.config.js

```
