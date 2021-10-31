/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { ArcRotateCamera, BoundingInfo, Camera, Mesh, Vector3 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";

/**
 * DDD Viewer base layer class.
 */
class OrbitCameraController extends BaseCameraController {

    update(deltaTime: number): void {
        // Fix viewer to floor
        const terrainElevation = this.dddViewer.viewerState.positionTerrainElevation;
        if (terrainElevation && this.dddViewer.camera.position.y < ( terrainElevation + 1.0 )) {
            this.getCamera().position.y = terrainElevation + 1.0;
        }
    }

    activate(): void {

        let targetCoords = Vector3.Zero();
        if ( this.dddViewer.selectedObject ) {
            const boundingBox: BoundingInfo = this.dddViewer.getBoundsRecursively( <Mesh> this.dddViewer.selectedObject!.mesh );
            //targetCoords = this.selectedMesh.absolutePosition;
            const minWorld = boundingBox.minimum;
            const maxWorld = boundingBox.maximum;
            targetCoords = new Vector3(( minWorld.x + maxWorld.x ) / 2, ( minWorld.y + maxWorld.y ) / 2, ( minWorld.z + maxWorld.z ) / 2 );
        }

        let distance = 75.0;
        if ( this.dddViewer.camera ) {
            distance = Vector3.Distance( this.dddViewer.camera.position, targetCoords );

            this.dddViewer.camera.customRenderTargets.length = 0; //  = [];

            this.dddViewer.camera.detachControl();
            this.dddViewer.camera.dispose();
        }

        console.debug( "Creating orbit camera pointing to: " + targetCoords );

        const camera = new ArcRotateCamera( "Camera", -( 90 + this.dddViewer.viewerState.positionHeading ) * Math.PI / 180.0, this.dddViewer.viewerState.positionTilt * Math.PI / 180.0, distance, targetCoords, this.dddViewer.scene );
        camera.attachControl( this.dddViewer.engine.getRenderingCanvas(), true );
        camera.minZ = 0.5; // 1.0; // 0.1;
        //camera.maxZ = 2500;  // Automatic? see focusOn()
        camera.lowerRadiusLimit = 15;
        camera.upperRadiusLimit = 1000;
        camera.upperBetaLimit = Math.PI; // /2; // Math.PI / 2 = limit to flat view
        camera.panningSensibility = 50.0; // 0.5;
        //camera.angularSensibility = 50.0;
        //camera.inertia = 0.10;

        //camera.multiTouchPanning = false;
        //camera.multiTouchPanAndZoom = false;
        //camera.pinchZoom = true;

        camera.useNaturalPinchZoom = true;
        camera.fov = 35.0 * ( Math.PI / 180.0 );
        this.dddViewer.camera = camera;

        this.dddViewer.updateRenderTargets();
        if (this.dddViewer.shadowGenerator) {
            this.dddViewer.shadowGenerator.splitFrustum();
        }
    }

}

export { OrbitCameraController };