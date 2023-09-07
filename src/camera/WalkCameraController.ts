/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera, Vector3 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";
import { FreeCameraController } from "./FreeCameraController";

/**
 * DDD Viewer base layer class.
 */
class WalkCameraController extends FreeCameraController {

    sceneCameraWalkHeight = 1.75; // 2.0;

    //falling = false;

    update(deltaTime: number): void {
        // Fix viewer to floor
        const terrainElevation = this.dddViewer.viewerState.positionTerrainElevation;
        if ( terrainElevation !== null && this.dddViewer.camera ) {
            this.getCamera().position.y = terrainElevation + this.sceneCameraWalkHeight; // 3.0;
        }
    }

    activate(): void {
        super.activate();
        //this.walkMode = true;
        this.dddViewer.camera!.inertia = 0.2; // 0.0;
        this.dddViewer.setMoveSpeed( this.dddViewer.viewerState.sceneMoveSpeed );
    }

}

export { WalkCameraController };