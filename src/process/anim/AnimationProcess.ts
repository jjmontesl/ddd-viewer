/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { EasingFunction, QuadraticEase } from "@babylonjs/core";
import { SceneViewer } from "../../SceneViewer";
import { ViewerProcess } from "../ViewerProcess";

abstract class AnimationProcess extends ViewerProcess {

    sceneViewer: SceneViewer;

    animTime: number;
    time: number;
    interpFactor: number;

    easing: EasingFunction;

    /**
     * 
     * @param sceneViewer 
     * @param animTime if set to null, the Process must manually mark itself as finished
     */
    constructor(sceneViewer: SceneViewer, animTime: number | null = null) {
        
        super(sceneViewer);
        
        this.sceneViewer = sceneViewer;

        this.time = 0.0;
        this.interpFactor = 0.0;  // Stored as a class property for convenience of derived classes

        this.animTime = animTime || 0;

        this.easing = new QuadraticEase();
        this.easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    }

    update( deltaTime: number): void {
        
        // Avoid calling parent just to update deltaTime, do it here for performance
        this.time += deltaTime;

        this.interpFactor = ( this.animTime > 0 ) ? (( this.time ) / ( this.animTime)) : 1.0;
        if (this.interpFactor > 1.0) this.interpFactor = 1.0;
        
        // Ease interpolation
        this.interpFactor = this.easing.ease(this.interpFactor);

        if (this.animTime != null && this.time >= this.animTime) {
            this.finished = true;
        }
    }

}

export { AnimationProcess };