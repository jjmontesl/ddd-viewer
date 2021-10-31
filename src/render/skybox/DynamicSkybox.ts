/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { Skybox } from "./Skybox";

/**
 * A skybox based on a shader.
 */
class DynamicSkybox extends Skybox {

    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }

}

export { DynamicSkybox };