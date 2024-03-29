[![ddd-viewer build](https://github.com/blackyale/ddd-viewer/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/blackyale/ddd-viewer/actions/workflows/build.yml)

# DDD-Viewer

<p align="center">
  <!--
  <a href="#" target="_blank">
   <img alt="Version" src="https://img.shields.io/badge/version-0.5.0-blue.svg?cacheSeconds=2592000" />
    </a>
    -->
 </p>

> DDD-Viewer library for viewing DDD and OpenStreetMap data in 3D.


## Overview

DDD-Viewer is an HTML5 library for 3D visualization of scenes generated by the [DDD tool](https://github.com/jjmontesl/ddd).

In particular, DDD-Viewer allows to render and interact with 3D maps generated from [OpenStreetMap](https://www.openstreetmap.org/) and other datasouces.

DDD-Viewer is a TypeScript library based on [BabylonJS](https://www.babylonjs.com/).

You can embed DDD-Viewer scenes in your website or use it to build a custom application.

*NOTE that this project is currently experimental and the data formats and library are expected to change.*


## Examples

- DDD-Viewer-App at [3dsmaps.com](https://3dsmaps.com).
- The [examples](examples/) directory contains simple usage examples.

*TODO: Add 1-2 screenshots*


## Using the library

DDD-Viewer is meant to be easily used as a standalone viewer for websites or
as a library from 3rd party projects.

Note that if serving your own copy of DDD-Viewer, you may wish to point your users to your own
assets. See the [Configuration] and the [Assets] sections below for further information.


### From vanilla Javascript, with no bundler (\<script\> tag)

*TODO*

You can find an example in the [simple UMD example](examples/simple) directory.

### From a node project (TypeScript / Webpack)

*TODO*

### Configuration

*TODO*


## Building the library

You only need to build the library if you wish to make changes to it
(otherwise you can use the bundled libraries or include *ddd-viewer* through *npm*).

**Download / install**

Clone the `ddd-viewer` repository and install JS/TS dependencies through `npm`:

    git clone -c core.autocrlf=false https://github.com/jjmontesl/ddd-viewer.git

Enter the `ddd-viewer` directory (`cd ddd-viewer`) and install dependencies:

    npm install

**Npm scripts**

 - `npm run dev`: Development mode (watches source files and compiles when changes are made)
 - `npm run build`: Builds the library
<!--
 - `npm run test`: Runs a test.
 - `npm run lint`: Runs eslint to check sintax.
 - `npm run prepare`: Prepare module for production.
 -->

*TODO*


## Data / Assets

### Textures and object library

Currently, in order to render the primary DDD OSM 3D data you need to make some 3D and graphics assets available.

### 3D Map Tiles


### Downloading tiles locally for development or publishing

There is an [assets download tool](https://github.com/jjmontesl/ddd-viewer-app/tree/master/tools/downloader)
which you can find in the related repository for ddd-viewer-app.

Please download assets and 3D tiles locally during development and for publishing, as 3dsmaps.com server
has very limited resources.

## Questions / Support / Contributing

Please use the [Issue Tracker]() to report issues or if you have any questions
about DDD-Viewer usage.

Please get in touch if you wish to contribute to the library. Have a look at the
issue tracker to know about the tasks in the roadmap if you are interested.

You can follow [@3dsmaps](https://twitter.com/3dsmaps) on Twitter to stay up to date.

(Leave a ⭐️ if you like this project!)


## License

This project is licensed under the MIT License.

Copyright (c) 2021 Jose Juan Montes and contributors

See LICENSE file for further information.

