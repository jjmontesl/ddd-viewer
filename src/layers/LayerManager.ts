import SceneViewer from "../SceneViewer";
import Base3DLayer from "./Base3DLayer";
import GeoTile3DLayer from "./ModelGeoTileLayer3D";


export default class LayerManager {
    sceneViewer: SceneViewer;
    layers: { [ key: string ]: Base3DLayer };

    constructor( sceneViewer: SceneViewer ) {
        this.sceneViewer = sceneViewer;
        this.layers = {};
    }

    update(): void {
        for ( const key in this.layers ) {
            // Load tiles dynamically as needed
            this.layers[key].update();
        }
    }

    addLayer( key: string, layer: GeoTile3DLayer ): void {
        layer.layerManager = this;
        this.layers[key] = layer;
    }
}

