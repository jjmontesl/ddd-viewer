# DDD-Viewer

<p align="center">
  <!--
  <a href="#" target="_blank">
   <img alt="Version" src="https://img.shields.io/badge/version-0.5.0-blue.svg?cacheSeconds=2592000" /> 
    </a>
    -->
 </p>

> DDD-Viewer library for viewing OpenStreetMaps data in 3D.


##

Source distribution:

Which packages + files to distribute and folders, which dependencies are embedded:




## Build

In case of `FATAL ERROR: [...] JavaScript heap out of memory`, use:

https://stackoverflow.com/questions/65124312/how-to-solve-fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-f
  (or .npmrc)
  alias npm='node --max_old_space_size=8000 /usr/bin/npm'
  node --max_old_space_size=128000 /usr/local/bin/npm run build

- https://stackoverflow.com/questions/55613789/how-to-fix-fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-fa
  Put in .env file:
  GENERATE_SOURCEMAP=false

## Todo

- Packaging overview: https://www.intricatecloud.io/2020/02/creating-a-simple-npm-library-to-use-in-and-out-of-the-browser/
- Webpack multiple modules: https://stackoverflow.com/questions/59900538/shared-component-library-best-practices
- Duplicate output due to mixed import styles: https://stackoverflow.com/questions/34816496/consuming-a-umd-created-by-webpack-results-in-duplicate-libs-in-output
- ? TSDX create for later bundling: https://www.reddit.com/r/typescript/comments/din96p/how_do_i_transpilebuild_my_typescript_class/

- Exporting multiple symbols (classes): https://stackoverflow.com/questions/38340500/export-multiple-classes-in-es6-modules
  (export and import deconstructed (?))

- Wait for scripts loading before running code: https://stackoverflow.com/questions/11258068/is-it-possible-to-wait-until-all-javascript-files-are-loaded-before-executing-ja
- Script tag async and defer: https://flaviocopes.com/javascript-async-defer/
- Script loading info: https://www.html5rocks.com/en/tutorials/speed/script-loading/

- rollup-plugin-node-resolve to include dependencies :?


- https://github.com/oktinaut/babylonjs-typescript-starter
    src/ source code folder
      index.ts application entry point
      glsl.d.ts typescript definition file to resolve .glsl files
      Materials/ folder for custom materials/shaders
        SampleMaterial.ts sample custom material
        Shaders/ folder containing GLSL shader code
          Sample/ folder containing sample shader
            sample.fragment.glsl sample fragment shader
            sample.vertex.glsl sample vertex shader
      public folder containing static assets
        index.html HTML entry point
      dist folder containing output of build process


## Installation

- npm install

## Where to start.

 - npm run start: Watch development mode.
 - npm run build: Development build.
 - npm run test: Runs a test.
 - npm run lint: Runs eslint to check sintax.
 - npm run prepare: Prepare module for production.

## Show your support

Give a ⭐️ if this project helped you!



