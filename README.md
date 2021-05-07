# DDD Viewer

[![Author](http://img.shields.io/badge/author-@davellanedam-blue.svg?style=flat-square)](https://twitter.com/davellanedam)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/blob/master/LICENSE)
[![Tag](https://img.shields.io/github/tag/davellanedam/vue-skeleton-mvp.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/tags)


## Features

-

## DDD Viewer Online


## Sequences

Sequences require a starting point in the URL. The sequence JSON itself can be encoded using:

    cat trip-xxxx.json  | jq -c -M . | base64 -w0

## Running in development

	npm run serve

or

	npm run serve-pub-https





## Installing

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/davellanedam/vue-skeleton-mvp.git ./myproject
```

## VERY IMPORTANT

This project uses Vue Router HTML5 History Mode, this means when you are in development mode you can hit Cmd+R (mac) or F5 (Windows) to reload the page and it will work, but when the project is built you will have problems, so will need to do a small change in your web server to make that work. Please read the official Vue Router documentation here: <https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations>

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Formatting markdown files

```bash
npm run remark
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Run your unit tests

```bash
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## License




