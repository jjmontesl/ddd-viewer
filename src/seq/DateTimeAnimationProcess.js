

import * as BABYLON from 'babylonjs';

export default class {

    constructor(dtStart, dtEnd, animTime) {
        this.processes = null;
        this.finished = false;

        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.animTime = animTime;

        this.time = 0.0;

        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
    }

    update(deltaTime) {

        this.time += deltaTime;
        let sceneViewer = this.processes.sceneViewer;

        let interp_factor = (this.animTime > 0) ? ((this.time) / this.animTime) : 1.0;
        if (interp_factor > 1.0) {
            interp_factor = 1.0;
        }

        let interpTime = (this.dtEnd / 1000 - this.dtStart / 1000) * interp_factor;

        sceneViewer.viewerState.positionDate = new Date(this.dtStart.getTime() + interpTime * 1000);
        sceneViewer.lightSetupFromDatePos();

        if (interp_factor >= 1.0) {
            this.processes.remove(this);
        }
    }

}
