import { SceneViewer } from "../SceneViewer";
import { Base3DLayer } from "./Base3DLayer";
import { GeoTile3DLayer } from "./GeoTile3DLayer";


class LayerManager {
    sceneViewer: SceneViewer;
    layers: { [ key: string ]: Base3DLayer };

    constructor( sceneViewer: SceneViewer ) {
        this.sceneViewer = sceneViewer;
        this.layers = {};
    }

    update( deltaTime: number ): void {
        for ( const key in this.layers ) {
            // Load tiles dynamically as needed
            this.layers[key].update( deltaTime );
        }
    }

    addLayer( key: string, layer: GeoTile3DLayer ): void {
        layer.layerManager = this;
        this.layers[key] = layer;
    }
}

export { LayerManager };
