/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";

/**
 * DDD Viewer base layer class.
 */
class PanningCameraController extends BaseCameraController {

    update(deltaTime: number): void {

    }

    activate(): void {

    }

}

export { PanningCameraController };