/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { SceneViewer } from "SceneViewer";
import { LayerManager } from "./LayerManager";

/**
 * DDD Viewer base layer class.
 */
abstract class Base3DLayer {

    key: string;
    visible: boolean = true;

    protected dddViewer: SceneViewer | null;
    protected layerManager: LayerManager | null;  // TODO: added for backwards compat (for convenience), should be removed

    constructor(key: string) {
        this.key = key;
        this.visible = true;

        this.dddViewer = null;
        this.layerManager = null;
    }

    abstract update(deltaTime: number): void;

    abstract clearScene(): void;

    setVisible(visible: boolean): void {
        this.visible = visible;
    }

    setViewer(dddViewer: SceneViewer | null): void {
        this.dddViewer = dddViewer;
        this.layerManager = dddViewer ? dddViewer.layerManager : null;

        if (!dddViewer) {
            this.clearScene();
        }
    }

}

export { Base3DLayer };