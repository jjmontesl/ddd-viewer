

import * as BABYLON from 'babylonjs';

export default class {

    constructor(moveStart, moveEnd, animTime) {
        this.processes = null;
        this.finished = false;

        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
        this.animTime = animTime;

        this.time = 0.0;
    }

    update(deltaTime) {
        // Update camera interpolating between last pos and current
        let move_start = this.moveStart;
        let move_end = this.moveEnd;

        this.time += deltaTime;

        let sceneViewer = this.processes.sceneViewer;

        let interp_factor = (this.animTime > 0) ? ((this.time) / this.animTime) : 1.0;
        if (interp_factor > 1.0) {
            interp_factor = 1.0;
        }

        sceneViewer.viewerState.positionWGS84 = [BABYLON.Scalar.Lerp(move_start.positionWGS84[0], move_end.positionWGS84[0], interp_factor),
                                                        BABYLON.Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], interp_factor)];
        sceneViewer.viewerState.positionGroundHeight = BABYLON.Scalar.Lerp(move_start.positionGroundHeight, move_end.positionGroundHeight, interp_factor);
        sceneViewer.viewerState.positionTilt = BABYLON.Scalar.Lerp(move_start.positionTilt, move_end.positionTilt, interp_factor);

        let startHeading = move_start.positionHeading;
        let targetHeading = move_end.positionHeading;
        if (Math.abs(move_end.positionHeading - move_start.positionHeading) > 180.0) {
            if (move_end.positionHeading - move_start.positionHeading > 0) {
                startHeading += 360;
            } else{
                startHeading -= 360;
            }
        }
        let newPositionHeading = BABYLON.Scalar.Lerp(startHeading, targetHeading, interp_factor);
        sceneViewer.viewerState.positionHeading = ((newPositionHeading % 360) + 360) % 360;
        //sceneViewer.viewerState.positionHeading = 180 / Math.PI * BABYLON.Scalar.LerpAngle(move_start.positionHeading * Math.PI / 180.0, move_end.positionHeading * Math.PI / 180.0, interp_factor);

        let positionScene = sceneViewer.wgs84ToScene(sceneViewer.viewerState.positionWGS84);
        let position = new BABYLON.Vector3(positionScene[0], sceneViewer.viewerState.positionGroundHeight + sceneViewer.viewerState.positionTerrainElevation + 1, positionScene[2]);
        let rotation = new BABYLON.Vector3((90.0 - sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);

        sceneViewer.camera.position = position;
        sceneViewer.camera.rotation = rotation;

        if (interp_factor >= 1.0) {
            this.processes.remove(this);
        }
    }

}
