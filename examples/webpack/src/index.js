import dddviewer from "../../../dist/ddd-viewer.esm";

import "../styles/main.css";


function initViewer() {

    const dddConfig = {

        "productionTip": false,
        "tileUrlBase": "https://3dsmaps.com/cache/ddd_http/",
        "showDevelLinks": true,
        "analyticsTag": null,
        "sceneGroundLayers": {},
        "sceneMaterials": [
            { "value": "defaultsplat256", "text": "Default Set and Splatmaps (256x256)", "textures": "default256", "splatmap": 256 },
            { "value": "defaultsplat512", "text": "Default Set and Splatmaps (512x512)", "textures": "default512", "splatmap": 512 },
            { "value": "default256", "text": "Default Set (256x256)", "textures": "default256", "splatmap": null },
            { "value": "default512", "text": "Default Set (512x512)", "textures": "default512", "splatmap": null },
            { "value": "minimal", "text": "Minimal Set", "textures": "minimal", "splatmap": null },
            { "value": null, "text": "None", "textures": null, "splatmap": null }
        ],

        "defaultCoords": [ -8.723, 42.238 ],

        "dddHttpApiUrlBase": "https://{{hostname}}:8000/api/",

        "geolocation": false

    };

    const canvas = document.getElementById("ddd-scene");

    const viewerState = new dddviewer.ViewerState(); // this.getViewerState();
    viewerState.positionWGS84 = [ -8.723, 42.238, 0 ];
    viewerState.dddConfig = dddConfig;

    const sceneViewer = new dddviewer.SceneViewer(canvas, viewerState);

    const layerDddOsm3d = new dddviewer.GeoTile3DLayer();
    sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);
}

window.addEventListener("load", () => {
    initViewer();
});