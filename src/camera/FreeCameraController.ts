/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera, UniversalCamera, Vector3 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";

/**
 * DDD Viewer base layer class.
 */
class FreeCameraController extends BaseCameraController {

    fixMinHeight = false;

    update(deltaTime: number): void {
        // Fix viewer to floor
        if (this.fixMinHeight) {
            const terrainElevation = this.dddViewer.viewerState.positionTerrainElevation;
            if (terrainElevation && this.dddViewer.camera.position.y < ( terrainElevation + 1.0 )) {
                this.getCamera().position.y = terrainElevation + 1.0;
            }
        }
    }

    activate(): void {
        if (this.dddViewer.camera) {
            this.dddViewer.camera.customRenderTargets.length = 0; //4 = [];
            this.dddViewer.camera.detachControl();
            this.dddViewer.camera.dispose();
        }

        //console.debug("Creating free camera.");
        const camera = new UniversalCamera( "Camera", Vector3.Zero(), this.dddViewer.scene );
        camera.minZ = 1.0; // 0.1;
        camera.maxZ = 4500;
        camera.angularSensibility = 500.0;
        camera.touchAngularSensibility = 1000.0;
        //camera.touchMoveSensibility = 1.0;
        camera.inertia = 0.0;
        camera.keysUp.push( 87 );
        camera.keysDown.push( 83 );
        camera.keysLeft.push( 65 );
        camera.keysRight.push( 68 );
        camera.keysUpward.push( 69 );
        camera.keysDownward.push( 81 );
        camera.attachControl( this.dddViewer.engine.getRenderingCanvas(), true );
        camera.fov = 40.0 * ( Math.PI / 180.0 );  // 35.0 might be GM, 45.8... is default  // 35
        const positionScene = this.dddViewer.wgs84ToScene( this.dddViewer.viewerState.positionWGS84 );
        camera.position = new Vector3( positionScene[0], this.dddViewer.viewerState.positionGroundHeight + this.dddViewer.viewerState.positionTerrainElevation + 1, positionScene[2]);
        camera.rotation = new Vector3(( 90.0 - this.dddViewer.viewerState.positionTilt ) * ( Math.PI / 180.0 ), this.dddViewer.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );
        //camera.cameraRotation = new Vector2(/* (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0) */ 0, this.viewerState.positionHeading * (Math.PI / 180.0));
        this.dddViewer.camera = camera;
        this.dddViewer.setMoveSpeed( this.dddViewer.viewerState.sceneMoveSpeed );

        this.dddViewer.updateRenderTargets();
        if (this.dddViewer.shadowGenerator) {
            this.dddViewer.shadowGenerator.splitFrustum();
        }
    }

}

export { FreeCameraController };