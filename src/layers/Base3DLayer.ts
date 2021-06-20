/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { LayerManager } from "./LayerManager";

/**
 * DDD Viewer base layer class.
 */
abstract class Base3DLayer {

    layerManager: LayerManager | null;

    constructor() {
        this.layerManager = null;
    }

    abstract update( deltaTime: number ): void;
}

export { Base3DLayer };