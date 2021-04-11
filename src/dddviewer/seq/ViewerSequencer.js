

import * as BABYLON from 'babylonjs';

export default class {

    seq = [];
    time = 0.0;
    index = 0;
    playing = false;
    currentTasks = [];

    constructor(sceneViewer) {

        this.sceneViewer = sceneViewer;

        this.seq = null;
        this.playing = false;
        this.time = 0.0;
        this.index = 0;

        this.currentTasks = [];
    }

    update(deltaTime) {

        if (!(this.playing)) { return; }

        this.time += deltaTime;

        // Start all steps up to current time
        while (this.index < this.seq.length && this.seq[this.index][0] < this.time) {
            this.startTask(this.seq[this.index]);
            this.index++;
        }

        // Update all current steps
        for (let task of this.currentTasks) {
            this.updateTask(task);
        }

        // Remove finished steps
        // TODO: Use a task class and mark itself as finished
        this.currentTasks = this.currentTasks.filter((item) => { return (item[0] + item[2] > this.time); } );

        if (this.index >= this.seq.length && this.currentTasks.length === 0) {
            //this.playing = false;
            //this.playing = true;
            this.time = 0.0;
            this.index = 0;
        }

    }

    startTask(step) {

        console.debug("Starting Task: ", step);

        if (step[1] === "move") {
            this._move_start = this.sceneViewer.parsePositionString(this.sceneViewer.positionString());
            this.currentTasks.push(step);
        } else {
            // Unknown step type
        }
    }

    updateTask(task) {
        if (task[1] === "move") {
            this.updateTaskMove(task);
        } else {
            // Unknown step type
        }

    }

    updateTaskMove(task) {
        // Update camera interpolating between last pos and current
        let move_start = this._move_start;
        let move_end = this.sceneViewer.parsePositionString(task[3]);

        let interp_factor = (this.time - task[0]) / task[2];
        if (interp_factor > 1.0) {
            interp_factor = 1.0;
        }

        this.sceneViewer.viewerState.positionWGS84 = [BABYLON.Scalar.Lerp(move_start.positionWGS84[0], move_end.positionWGS84[0], interp_factor),
                                                        BABYLON.Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], interp_factor)];
        this.sceneViewer.viewerState.positionGroundHeight = BABYLON.Scalar.Lerp(move_start.positionGroundHeight, move_end.positionGroundHeight, interp_factor);
        this.sceneViewer.viewerState.positionTilt = BABYLON.Scalar.Lerp(move_start.positionTilt, move_end.positionTilt, interp_factor);
        this.sceneViewer.viewerState.positionHeading = BABYLON.Scalar.Lerp(move_start.positionHeading, move_end.positionHeading, interp_factor);

        let positionScene = this.sceneViewer.wgs84ToScene(this.sceneViewer.viewerState.positionWGS84);
        let position = new BABYLON.Vector3(positionScene[0], this.sceneViewer.viewerState.positionGroundHeight + this.sceneViewer.viewerState.positionTerrainElevation + 1, positionScene[2]);
        let rotation = new BABYLON.Vector3((90.0 - this.sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), this.sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);

        this.sceneViewer.camera.position = position;
        this.sceneViewer.camera.rotation = rotation;

    }

    play(seq) {
        console.debug("Playing sequence: ", seq);
        this.sceneViewer.camera.detachControl();
        this.sceneViewer.viewerState.sceneViewModeShow = false;
        this.seq = seq;
        this.playing = true;
        this.time = 0.0;
        this.index = 0;
    }

}

