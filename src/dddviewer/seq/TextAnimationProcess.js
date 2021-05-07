

import * as BABYLON from 'babylonjs';

export default class {

    constructor(text, animTime) {

        this.processes = null;
        this.finished = false;

        this.text = text;
        this.animTime = animTime;

        this.time = 0.0;

    }

    update(deltaTime) {

        this.time += deltaTime;
        let sceneViewer = this.processes.sceneViewer;
        let textCompleteTime = 2.0;

        let interp_factor = (this.animTime > 0) ? ((this.time) / (this.animTime - textCompleteTime)) : 1.0;
        if (interp_factor > 1.0) {
            interp_factor = 1.0;
        }

        let interpChars = Math.ceil((this.text.length) * interp_factor);
        let interpText = this.text.substr(0, interpChars);

        sceneViewer.viewerState.sceneTitleText = interpText;
        if (this.time >= this.animTime) {
            sceneViewer.viewerState.sceneTitleText = null;
            this.processes.remove(this);
        }
    }

}
