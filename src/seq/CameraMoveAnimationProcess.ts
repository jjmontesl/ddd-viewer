

import * as BABYLON from "babylonjs";
import { SceneViewer, ViewerState } from "..";
import DDDViewerConfig from "../DDDViewerConfig";
import AnimationProcess from "./AnimationProcess";
import ViewerProcesses from "./ViewerProcesses";

class CameraMovementAnimationProcess extends AnimationProcess {

    moveStart: any;
    moveEnd: any;

    constructor( moveStart: any, moveEnd: any, animTime: number ) {
        
        super(( new ViewerProcesses(
            new SceneViewer(
                new HTMLCanvasElement(),
                new ViewerState(
                    new DDDViewerConfig(),
                    [ 0, 0, 0 ]
                )
            )
        )
        ), animTime );

        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
    }

    update( deltaTime: number ): void {
        // Update camera interpolating between last pos and current
        const move_start = this.moveStart;
        const move_end = this.moveEnd;

        const sceneViewer = this.processes!.sceneViewer;

        AnimationProcess.prototype.update.call( this, deltaTime );
        
        // let interp_factor = ( this.animTime > 0 ) ? (( this.time ) / this.animTime ) : 1.0;
        // if ( interp_factor > 1.0 ) {
        //     interp_factor = 1.0;
        // }

        sceneViewer.viewerState.positionWGS84 = [ BABYLON.Scalar.Lerp( move_start.positionWGS84[0], move_end.positionWGS84[0], this.interpFactor ),
            BABYLON.Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], this.interpFactor)];
        
        
        sceneViewer.viewerState.positionGroundHeight = BABYLON.Scalar.Lerp( move_start.positionGroundHeight, move_end.positionGroundHeight, this.interpFactor );
        sceneViewer.viewerState.positionTilt = BABYLON.Scalar.Lerp( move_start.positionTilt, move_end.positionTilt, this.interpFactor );

        let startHeading = move_start.positionHeading;
        const targetHeading = move_end.positionHeading;
        if ( Math.abs( move_end.positionHeading - move_start.positionHeading ) > 180.0 ) {
            if ( move_end.positionHeading - move_start.positionHeading > 0 ) {
                startHeading += 360;
            } else{
                startHeading -= 360;
            }
        }
        const newPositionHeading = BABYLON.Scalar.Lerp( startHeading, targetHeading, this.interpFactor );
        sceneViewer.viewerState.positionHeading = (( newPositionHeading % 360 ) + 360 ) % 360;
        //sceneViewer.viewerState.positionHeading = 180 / Math.PI * BABYLON.Scalar.LerpAngle(move_start.positionHeading * Math.PI / 180.0, move_end.positionHeading * Math.PI / 180.0, interp_factor);

        const positionScene = sceneViewer.wgs84ToScene( sceneViewer.viewerState.positionWGS84 );
        const position = new BABYLON.Vector3( positionScene[0], sceneViewer.viewerState.positionGroundHeight + sceneViewer.viewerState.positionTerrainElevation + 1, positionScene[2]);
        const rotation = new BABYLON.Vector3(( 90.0 - sceneViewer.viewerState.positionTilt ) * ( Math.PI / 180.0 ), sceneViewer.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );

        sceneViewer.camera!.position = position;
        sceneViewer.camera.rotation = rotation;

        if ( this.interpFactor >= 1.0 ) {
            this.processes!.remove( this );
        }
    }

}

export default CameraMovementAnimationProcess;
