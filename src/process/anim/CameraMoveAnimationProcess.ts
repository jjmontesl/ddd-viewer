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
    
    // Move camera adding a vertical arc which height is a factor of movement distance
    moveArcHeightFactor: number = 0.0; // 0.05;

    _mslHeightStart: number | null = null;
    _mslHeightEnd: number | null = null;

    constructor( sceneViewer: SceneViewer, moveStart: ScenePosition, moveEnd: ScenePosition, animTime: number ) {

        super(sceneViewer, animTime);

        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
    }

    calculateMslHeights() { 
        if (!this._mslHeightStart) { 
            let startPositionScene = this.sceneViewer.wgs84ToScene(this.moveStart.positionWGS84);
            let startPositionSceneVec = new Vector3(startPositionScene[0], startPositionScene[1], startPositionScene[2]);
            let [terrainElevation, terrainMesh] = this.sceneViewer.elevationMSLFromSceneCoords(startPositionSceneVec);
            if (terrainElevation !== null) this._mslHeightStart = terrainElevation + this.moveStart.positionGroundHeight;
        }
        if (!this._mslHeightEnd) { 
            let endPositionScene = this.sceneViewer.wgs84ToScene(this.moveEnd.positionWGS84);
            let endPositionSceneVec = new Vector3(endPositionScene[0], endPositionScene[1], endPositionScene[2]);
            let [terrainElevation, terrainMesh] = this.sceneViewer.elevationMSLFromSceneCoords(endPositionSceneVec);
            if (terrainElevation !== null) this._mslHeightEnd = terrainElevation + this.moveEnd.positionGroundHeight;
        }

    }

    update( deltaTime: number ): void {
        
        super.update(deltaTime);

        // Update camera interpolating between start and end
        const move_start = this.moveStart;
        const move_end = this.moveEnd;

        const sceneViewer = this.sceneViewer;
        
        sceneViewer.viewerState.positionWGS84 = [ 
            Scalar.Lerp(move_start.positionWGS84[0], move_end.positionWGS84[0], this.interpFactor),
            Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], this.interpFactor) ];

        this.calculateMslHeights();

        let heightStart = this._mslHeightStart !== null ? this._mslHeightStart : move_start.positionGroundHeight;
        let heightEnd = this._mslHeightEnd !== null ? this._mslHeightEnd : move_end.positionGroundHeight;
        
        // Add arc height offset if set
        let moveDistance = [(move_end.positionWGS84[0] - move_start.positionWGS84[0]) * 111000 , 
                            (move_end.positionWGS84[1] - move_start.positionWGS84[1]) * 111000 ];
        let moveDistanceMag = Math.sqrt(moveDistance[0] ** 2 + moveDistance[1] ** 2);
        let moveArcHeight = moveDistanceMag * this.moveArcHeightFactor;
        let moveArcOffset = Math.sin(this.interpFactor * Math.PI) * moveArcHeight;

        const mslHeight = Scalar.Lerp(heightStart, heightEnd, this.interpFactor) + moveArcOffset;
                          

        sceneViewer.viewerState.positionGroundHeight = mslHeight - sceneViewer.viewerState.positionTerrainElevation;
        sceneViewer.viewerState.positionTilt = Scalar.Lerp(move_start.positionTilt, move_end.positionTilt, this.interpFactor);

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
        const position = new Vector3( positionScene[0], mslHeight, positionScene[2]);
        const rotation = new Vector3(( 90.0 - sceneViewer.viewerState.positionTilt ) * ( Math.PI / 180.0 ), sceneViewer.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );

        sceneViewer.camera!.position = position;
        if (sceneViewer.camera instanceof TargetCamera) {
            (<TargetCamera> sceneViewer.camera!).rotation = rotation;
        }

    }

}

export { CameraMovementAnimationProcess };
