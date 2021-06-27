/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


import { Scalar, TargetCamera, Vector3 } from "@babylonjs/core";
import { ScenePosition } from "../../ScenePosition";
import { SceneViewer } from "../../SceneViewer";
import { AnimationProcess } from "./AnimationProcess";

class CameraMovementAnimationProcess extends AnimationProcess {

    moveStart: ScenePosition;
    moveEnd: ScenePosition;

    constructor( sceneViewer: SceneViewer, moveStart: ScenePosition, moveEnd: ScenePosition, animTime: number ) {

        super(sceneViewer, animTime);

        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
    }

    update( deltaTime: number ): void {
        
        super.update(deltaTime);

        // Update camera interpolating between last pos and current
        const move_start = this.moveStart;
        const move_end = this.moveEnd;

        const sceneViewer = this.sceneViewer;
        
        sceneViewer.viewerState.positionWGS84 = [ 
            Scalar.Lerp(move_start.positionWGS84[0], move_end.positionWGS84[0], this.interpFactor),
            Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], this.interpFactor) ];
        
        
        sceneViewer.viewerState.positionGroundHeight = Scalar.Lerp( move_start.positionGroundHeight, move_end.positionGroundHeight, this.interpFactor );
        sceneViewer.viewerState.positionTilt = Scalar.Lerp( move_start.positionTilt, move_end.positionTilt, this.interpFactor );

        let startHeading = move_start.positionHeading;
        const targetHeading = move_end.positionHeading;
        if ( Math.abs( move_end.positionHeading - move_start.positionHeading ) > 180.0 ) {
            if ( move_end.positionHeading - move_start.positionHeading > 0 ) {
                startHeading += 360;
            } else{
                startHeading -= 360;
            }
        }
        const newPositionHeading = Scalar.LerpAngle( startHeading, targetHeading, this.interpFactor );
        sceneViewer.viewerState.positionHeading = (( newPositionHeading % 360 ) + 360 ) % 360;
        //sceneViewer.viewerState.positionHeading = 180 / Math.PI * Scalar.LerpAngle(move_start.positionHeading * Math.PI / 180.0, move_end.positionHeading * Math.PI / 180.0, interp_factor);

        const positionScene = sceneViewer.wgs84ToScene( sceneViewer.viewerState.positionWGS84 );
        const position = new Vector3( positionScene[0], sceneViewer.viewerState.positionGroundHeight + sceneViewer.viewerState.positionTerrainElevation, positionScene[2]);
        const rotation = new Vector3(( 90.0 - sceneViewer.viewerState.positionTilt ) * ( Math.PI / 180.0 ), sceneViewer.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );

        sceneViewer.camera!.position = position;
        if (sceneViewer.camera instanceof TargetCamera) {
            (<TargetCamera> sceneViewer.camera!).rotation = rotation;
        }

    }

}

export { CameraMovementAnimationProcess };
