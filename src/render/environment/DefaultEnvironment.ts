/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 * Manages environment rendering, using time, date or other information
 * to set up the skybox and lighting.
 */
class DefaultEnvironment  {

    protected dddViewer: SceneViewer;

    constructor(dddViewer: SceneViewer) {

        // Reference to DDDViewer
        this.dddViewer = dddViewer;

        // Babylon camera which we are controlling
        //this.camera = dddViewer.camera;
    }

    update(deltaTime: number): void {

    }

    activate(): void {

    }

}

export { DefaultEnvironment };