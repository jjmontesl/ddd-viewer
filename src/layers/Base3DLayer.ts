import LayerManager from "./LayerManager";

abstract class Base3DLayer {
    layerManager: LayerManager | null;

    constructor() {
        this.layerManager = null;
    }

    abstract update(): void;
}

export default Base3DLayer;