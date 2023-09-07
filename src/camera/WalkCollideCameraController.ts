/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera, Vector3 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";
import { WalkCameraController } from "./WalkCameraController";

/**
 * DDD Viewer base layer class.
 */
class WalkCollideCameraController extends WalkCameraController {

    velocity = new Vector3();

    gravity = -9.8;

    falling = false;

    fallStartDistance = 0.5;

    update(deltaTime: number): void {
        // Fix viewer to floor
        const terrainElevation = this.dddViewer.viewerState.positionTerrainElevation;
        if ( terrainElevation !== null && this.dddViewer.camera ) {
            const currentHeight = this.getCamera().position.y;
            const baseHeight = terrainElevation + this.sceneCameraWalkHeight;
            if (currentHeight > baseHeight + this.fallStartDistance) {
                this.falling = true;
            }
            if (this.falling) {
                this.velocity.y += (this.gravity * deltaTime);
                this.getCamera().position.addInPlace(this.velocity.scale(deltaTime));
            }

            if (!this.falling || this.getCamera().position.y < baseHeight) {
                this.falling = false;
                this.velocity.set(0, 0, 0);
                this.getCamera().position.y = terrainElevation + this.sceneCameraWalkHeight;
            }

        }
    }

}

export { WalkCollideCameraController };