/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


import { SceneViewer } from "../../SceneViewer";
import { AnimationProcess } from "./AnimationProcess";

class DateTimeAnimationProcess extends AnimationProcess {

    dtStart: Date;
    dtEnd: Date;

    constructor( sceneViewer: SceneViewer, dtStart: Date, dtEnd: Date, animTime: number ) {
        
        super(sceneViewer, animTime);

        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        
        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
        console.debug("TODO: Restore missing call sceneViewer.lightSetupFromDatePos();"); 
    }

    update( deltaTime: number ): void {

        super.update(deltaTime);
        
        const interpTime = ( this.dtEnd.getTime() / 1000 - this.dtStart.getTime() / 1000 ) * this.interpFactor;
        this.sceneViewer.viewerState.positionDate = new Date( this.dtStart.getTime() + interpTime * 1000 );
        
        //console.debug("Datetime set by animation to: " + this.sceneViewer.viewerState.positionDate);

        this.sceneViewer.lightSetupFromDatePos();
    }

}

export { DateTimeAnimationProcess };
