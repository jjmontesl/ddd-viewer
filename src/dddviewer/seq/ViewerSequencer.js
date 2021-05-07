
import * as BABYLON from 'babylonjs';
import CameraMoveAnimationProcess from '@/dddviewer/seq/CameraMoveAnimationProcess.js';
import DateTimeAnimationProcess from '@/dddviewer/seq/DateTimeAnimationProcess.js';
import TextAnimationProcess from '@/dddviewer/seq/TextAnimationProcess.js';

/* eslint-disable no-console,  */

export default class {

    seq = [];
    time = 0.0;
    index = 0;
    playing = false;
    currentTasks = [];

    waitTime = 0.0;

    constructor(sceneViewer) {

        this.sceneViewer = sceneViewer;

        this.seq = null;
        this.playing = false;
        this.time = 0.0;
        this.index = 0;
        this.waitTime = 0.0;

        this.currentTasks = [];
    }

    update(deltaTime) {

        if (!(this.playing)) { return; }

        this.time += deltaTime;

        if (this.waitTime > 0.0) {
            this.waitTime -= deltaTime;
            return;
        }

        // Run all possible steps
        while (this.index < this.seq.length && this.waitTime <= 0.0) {
            let step = this.seq[this.index];
            this.index++;
            this.runStep(step);
        }

    }

    runStep(step) {

        console.debug("Running step: ", step);

        let command = step[0];

        if (command === "m") {
            let move_start = this.sceneViewer.parsePositionString(this.sceneViewer.positionString());
            let move_end = this.sceneViewer.parsePositionString(step[1]);
            let animTime = step[2];
            let moveAnimationProcess = new CameraMoveAnimationProcess(move_start, move_end, animTime);
            this.sceneViewer.processes.add(moveAnimationProcess);

        } else if (command === "dt") {
            let dtStart = this.sceneViewer.viewerState.positionDate;
            console.debug(dtStart);
            let dtEnd = new Date(dtStart);
            console.debug(dtEnd);
            dtEnd.setHours(parseInt(step[1].split(":")[0]))
            dtEnd.setMinutes(parseInt(step[1].split(":")[1]))
            console.debug(dtEnd);
            let animTime = step[2];
            let process = new DateTimeAnimationProcess(dtStart, dtEnd, animTime);
            this.sceneViewer.processes.add(process);

        } else if (command === "t") {
            let text = step[1];
            let animTime = step[2];
            let process = new TextAnimationProcess(text, animTime);
            this.sceneViewer.processes.add(process);

        } else if (command === "s") {
            this.waitTime = step[1];

        } else if (command === "u") {
            let url = step[1];
            // Do not change URL if in settings
            if (this.sceneViewer.app.$route.name !== 'sceneTools') {
                this.sceneViewer.app.$router.push(url);
            }
        } else if (command === "goto") {
            this.index = step[1];

        } else if (command.startsWith("#")) {
            // Command is a comment. Ignore.
        } else {
            // Unknown step type
            console.debug("Invalid sequence step: ", step);
        }
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

