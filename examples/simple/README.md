## Overview

This an easy example of how to embed ddd-viewer into a simple html.


## Building the example

**Using**

For using this example you need to build `ddd-viewer.umd.production.min.js` and place it to the `lib/` folder.

Open `index.html` in your favourite browser.

Check the [project's README](../../README.md) for more information.


## How do we use the library?

Import the UMD build into your `<head>` element with a script tag:
```html
<head>
    <scrip src="lib/ddd-viewer.umd.production.min.js"></script>
</head>
```

We used Tailwind CSS library for presentation, but it`s not necessary for the viewer.

We have to setup our html with a canvas element that is going to be our container for the 3D scene rendering.

```html
    <div class="flex justify-center items-center w-full h-screen flex-wrap">
        <h1 class="w-full">Simple Example DDD-Viewer</h1>
        <canvas id="ddd-scene" style="width: 500px; height: 400px;"></canvas>
    </div>
```

We have to initialize the viewer passing it the configuration and the layers we want to show up:

```js
function initViewer() {

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
    const sceneViewer = new dddviewer.SceneViewer(canvas, dddConfig);

    const layerDddOsm3d = new dddviewer.GeoTile3DLayer();
    sceneViewer.layerManager.addLayer(layerDddOsm3d);

    // Events
    //window.addEventListener('resize', this.resize);

}
```

Finally you have to call the library when the page loads:

```js
window.addEventListener("load", () => {
    initViewer();
});
```