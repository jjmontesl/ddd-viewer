

export default class {

    constructor(sceneViewer) {
        this.sceneViewer = sceneViewer;
        this.layers = {};
    }

    update() {
        for (let key in this.layers) {
            // Load tiles dynamically as needed
            this.layers[key].update();
        }
    }

    addLayer(key, layer) {
        layer.layerManager = this;
        this.layers[key] = layer;
    }


}

