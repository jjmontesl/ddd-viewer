
// import * as BABYLON from "babylonjs";

import SceneViewer from "../SceneViewer";


class ViewerProcesses {

    sceneViewer: SceneViewer;
    currentProcesses: any[];

    playing = true;
    currentTasks = [];
    time = 0.0;

    constructor( sceneViewer: SceneViewer ) {

        this.sceneViewer = sceneViewer;
        this.currentProcesses = [];
    }

    update( deltaTime: number ): void {

        if ( !( this.playing )) { return; }

        this.time += deltaTime;

        // Update all current tasks
        for ( const proc of this.currentProcesses ) {
            proc.update( deltaTime );
        }

        // Remove finished steps
        // TODO: Use a task class and mark itself as finished
        //this.currentProcesses = this.currentProcesses.filter((item) => { return (item.finished); } );

    }

    add( process: any ): void {
        //console.debug("Adding process: ", process);
        process.processes = this;
        this.currentProcesses.push( process );
    }

    remove( process: any ): void {
        //console.debug("Removing process: ", process);
        this.currentProcesses = this.currentProcesses.filter(( item ) => { return ( item !== process ); });
    }


}

export default ViewerProcesses;


