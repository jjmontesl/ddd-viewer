/* eslint-disable @typescript-eslint/no-explicit-any */

import { SceneLoader } from "@babylonjs/core";
import { SceneViewer } from "../SceneViewer";
//import "babylonjs-loaders";


class QueueLoaderTask {
    url?: string; 
    onSuccess?: any;
    onFailure?: any;
}

class QueueLoader {

    sceneViewer: SceneViewer;
    
    queue: any[];

    current: any[];

    concurrentTasks: number = 2;  // 1 on mobile? 2 on PC?


    constructor( sceneViewer: SceneViewer ) {
        this.sceneViewer = sceneViewer;
        this.queue = [];
        this.current = [];
    }

    update(): void {
        //loadNext();
    }

    processNext(): void {
        if ( this.queue.length < 1 ) {
            return;
        }

        const task: any = this.queue.pop();
        this.processTask( task );
    }

    enqueueLoadModel( url: string, onSuccess: any, onFailure: any ): void {
        const task = <QueueLoaderTask> { "url": url, "onSuccess": onSuccess, "onFailure": onFailure };
        this.queue.push(task);
        if ( this.current.length < this.concurrentTasks ) {
            this.processNext();
        }
    }

    processTask( task: {[key: string]: any} ): void {
        const url: string = <string> task["url"];
        SceneLoader.ImportMesh( null, "", url, this.sceneViewer.scene,
            ( newMeshes, particleSystems, skeletons ) => {
                this.processNext();
                task.onSuccess( newMeshes, particleSystems, skeletons );
            },
            () => {
            },
            ( scene, msg, ex ) => {
                task.onFailure( scene, msg, ex );
                this.processNext();
            }
        );
    }

    //loadResource() {
    //}

}

export { QueueLoader };