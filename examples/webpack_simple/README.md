> Webpack Simple is a incorporated ddd-viewer in one page with webpack

## Overview

The example of Webpack Simple is perfect if you are thinking of incorporating the library into a project with webpack

## Building the example

**Installation**

1. Go to webpack simple with the terminal

2. First you can init the draft with:

    `npm init`

3. After you you have to install the dependencies with:

    `npm install`

***NOTE:***

*The library is now experimental, so it is not uploaded to npm, as seen in the package.json:*

`"ddd-viewer": "file:../../ddd-viewer",`

You have to make a local npm to be able to use the library then run this line from npm:

`npm link ddd-viewer`

4. You will have the project ready now to run the server:

    `npm run serve`

## How do we use the library?

You import the scene and the tiles

```js
import { SceneViewer } from 'ddd-viewer';

`import { GeoTile3DLayer } from 'ddd-viewer';
```

And after you init the viewer

```js
export function initViewer() {

    var dddviewer = window['ddd-viewer'];

    const dddConfig = {
        "defaultCoords": [-8.723, 42.238],
        //"defaultCoords": [-8.4069793, 43.3861094],
        "tileUrlBase": "https://3dsmaps.com/cache/ddd_http/",
        "assetsUrlbase": "https://3dsmaps.com/assets/",
        "materialsTextureSet": "default256",
        "geolocation": false
    }

    const canvas = document.getElementById('ddd-scene');
    const sceneViewer = new SceneViewer(canvas, dddConfig);

    const layerDddOsm3d = new GeoTile3DLayer();
    sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);

}
```

Finally you have to call the library when the page loads

```js
window.addEventListener("load", () => {
    initViewer();
});
```