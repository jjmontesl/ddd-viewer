/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 * A Camera and Input controller.
 *
 * This allows controlling the main camera, which is the main interface for viewing.
 * Controllers process input devices if they wish to respond to user input.
 *
 * Client code may use custom controllers or disable these controllers
 * and position the camera manually.
 */
abstract class BaseCameraController {

    protected dddViewer: SceneViewer;

    constructor(dddViewer: SceneViewer) {

        // Reference to DDDViewer
        this.dddViewer = dddViewer;

        // Babylon camera which we are controlling
        //this.camera = dddViewer.camera;
    }

    protected getCamera(): Camera {
        return this.dddViewer.camera;
    }

    abstract update(deltaTime: number): void;

    abstract activate(): void;

}

export { BaseCameraController };