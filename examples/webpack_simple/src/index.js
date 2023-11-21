import { SceneViewer } from 'ddd-viewer';
import { GeoTile3DLayer } from 'ddd-viewer';

export function initViewer() {

    var dddviewer = window['ddd-viewer'];

    const dddConfig = {
        "defaultCoords": [-8.723, 42.238],
        //"defaultCoords": [-8.4069793, 43.3861094],
        "tileUrlBase": "https://3dsmaps.com/cache/ddd_http/",
        "tileUrlSuffix": "",
        "assetsUrlbase": "https://3dsmaps.com/assets/",
        "materialsTextureSet": "default256",
        "geolocation": false
    }

    const canvas = document.getElementById('ddd-scene');
    const sceneViewer = new SceneViewer(canvas, dddConfig);

    const layerDddOsm3d = new GeoTile3DLayer();
    sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);

    // Events
    //window.addEventListener('resize', this.resize);

}

window.addEventListener("load", () => {
    initViewer();
});