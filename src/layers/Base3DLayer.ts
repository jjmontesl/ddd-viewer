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

    visible: boolean = true;
    layerManager: LayerManager | null;

    constructor() {
        this.visible = true;
        this.layerManager = null;
    }

    abstract update( deltaTime: number ): void;

    setVisible(visible: boolean): void {
        this.visible = visible;
    }

}

export { Base3DLayer };