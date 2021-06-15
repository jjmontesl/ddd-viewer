

// import * as BABYLON from "babylonjs";

import { SceneViewer, ViewerState } from "..";
import DDDViewerConfig from "../DDDViewerConfig";
import AnimationProcess from "./AnimationProcess";
import ViewerProcesses from "./ViewerProcesses";

class DateTimeAnimationProcess extends AnimationProcess {

    dtStart: Date;
    dtEnd: Date;

    constructor( dtStart: Date, dtEnd: Date, animTime: number ) {
        
        super(( new ViewerProcesses(
            new SceneViewer(
                new HTMLCanvasElement(),
                new ViewerState(
                    new DDDViewerConfig(),
                    [ 0, 0, 0 ]
                )
            )
        )
        ), animTime );

        this.dtStart = dtStart;
        this.dtEnd = dtEnd;


        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
    }

    update( deltaTime: number ): void {

        const sceneViewer = this.processes!.sceneViewer;

        AnimationProcess.prototype.update.call( this, deltaTime );

        // let interp_factor = ( this.animTime > 0 )
        //     ? (( this.time ) / this.animTime ) :
        //     1.0;
        
        // if ( interp_factor > 1.0 ) {
        //     interp_factor = 1.0;
        // }

        const interpTime = ( this.dtEnd.getTime() / 1000 - this.dtStart.getTime() / 1000 ) * this.interpFactor;

        sceneViewer.viewerState.positionDate = new Date( this.dtStart.getTime() + interpTime * 1000 );
        // sceneViewer.lightSetupFromDatePos();

        if ( this.interpFactor >= 1.0 ) {
            this.processes!.remove( this );
        }
    }

}

export default DateTimeAnimationProcess;
