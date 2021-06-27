/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { SceneViewer } from "../SceneViewer";

/**
 * A process that can be running in a DDDViewer instance.
 * Processes are updated every frame before drawing the scene.
 */
abstract class ViewerProcess {

    sceneViewer: SceneViewer;
    finished: boolean = false;
    time: number = 0;

    constructor( sceneViewer: SceneViewer ) {
        this.sceneViewer = sceneViewer;
        this.finished = false;
    }
    
    update( deltaTime: number ): void {
        // TODO: Consider providing an (optional) initialize() lifecycle method for processes (to be run before the first frame)
        //if (this.time == 0) initialize();
        this.time += deltaTime;
    }

}

export { ViewerProcess }; 



