/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 * DDD Viewer base skybox class.
 */
abstract class Skybox  {

    protected dddViewer: SceneViewer;

    constructor(dddViewer: SceneViewer) {

        // Reference to DDDViewer
        this.dddViewer = dddViewer;

        // Babylon camera which we are controlling
        //this.camera = dddViewer.camera;
    }

    abstract update(deltaTime: number): void;

}

export { Skybox };