import { SceneViewer } from "../SceneViewer";
import { Base3DLayer } from "./Base3DLayer";
import { GeoTile3DLayer } from "./GeoTile3DLayer";


/**
 * Manages the list of layers known to DDD Viewer.
 */
class LayerManager {

    sceneViewer: SceneViewer;
    layers: { [ key: string ]: Base3DLayer };

    constructor( sceneViewer: SceneViewer ) {
        this.sceneViewer = sceneViewer;
        this.layers = {};
    }

    update( deltaTime: number ): void {
        for (const key in this.layers) {
            // Load tiles dynamically as needed
            this.layers[key].update(deltaTime);
        }
    }

    /**
     * Adds a layer to DDD viewer.
     * @param key
     * @param layer
     */
    addLayer(layer: Base3DLayer): void {
        layer.setViewer(this.sceneViewer);
        this.layers[layer.key] = layer;
    }

    removeLayer(layer: Base3DLayer) {
        layer.setViewer(null);  // have the layer cleanup itself from the scene
        delete this.layers[layer.key];
    }

    /**
     * Retrieves a layer from DDD viewer managed layers.
     * Returns null if the layer does not exist.
     */
    getLayer(key: string) {
        if (key in this.layers) {
            return this.layers[key];
        }
        return null;
    }

}

export { LayerManager };
