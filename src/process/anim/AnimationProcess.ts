/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { SceneViewer } from "../../SceneViewer";
import { ViewerProcess } from "../ViewerProcess";

abstract class AnimationProcess extends ViewerProcess {

    sceneViewer: SceneViewer;

    animTime: number;
    time: number;
    interpFactor: number;

    constructor( sceneViewer: SceneViewer, animTime?: number ) {
        
        super(sceneViewer);
        
        this.sceneViewer = sceneViewer;

        this.time = 0.0;

        this.animTime = animTime || 0;
        this.interpFactor = 0.0;
    }

    update( deltaTime: number, factor: number = 0 ): void {
        
        // Avoid calling parent just to update deltaTime, do it here for performance
        this.time += deltaTime;

        this.interpFactor = ( this.animTime > 0 ) ? (( this.time ) / ( this.animTime - factor )) : 1.0;
        if ( this.interpFactor > 1.0 ) this.interpFactor = 1.0;

        if ( this.time >= this.animTime ) {
            this.finished = true;
        }
    }

}

export { AnimationProcess };