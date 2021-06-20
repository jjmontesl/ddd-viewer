/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { SceneViewer } from "../SceneViewer";
import { ViewerProcess } from "./ViewerProcess";


class ViewerProcessManager {

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
        this.currentProcesses = this.currentProcesses.filter( ( item ) => { return ( item.finished ); } );

    }

    add( process: ViewerProcess ): void {
        //console.debug("Adding process: ", process);

        // Sanity check
        if (process.sceneViewer != this.sceneViewer) {
            throw new Error("");
        }

        this.currentProcesses.push( process );
    }

    remove( process: ViewerProcess ): void {
        //console.debug("Removing process: ", process);
        this.currentProcesses = this.currentProcesses.filter(( item ) => { return ( item !== process ); });
    }


}

export { ViewerProcessManager };

