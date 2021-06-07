

import * as BABYLON from 'babylonjs';

export default class {

    playing = true;
    currentTasks = [];
    time = 0.0;

    constructor(sceneViewer) {

        this.sceneViewer = sceneViewer;
        this.currentProcesses = [];
    }

    update(deltaTime) {

        if (!(this.playing)) { return; }

        this.time += deltaTime;

        // Update all current tasks
        for (let proc of this.currentProcesses) {
           proc.update(deltaTime);
        }

        // Remove finished steps
        // TODO: Use a task class and mark itself as finished
        //this.currentProcesses = this.currentProcesses.filter((item) => { return (item.finished); } );

    }

    add(process) {
        //console.debug("Adding process: ", process);
        process.processes = this;
        this.currentProcesses.push(process);
    }

    remove(process) {
        //console.debug("Removing process: ", process);
        this.currentProcesses = this.currentProcesses.filter((item) => { return (item !== process); } );
    }


}


