/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


import { CameraMovementAnimationProcess } from "../anim/CameraMoveAnimationProcess";
import { DateTimeAnimationProcess } from "../anim/DateTimeAnimationProcess";
import { TextAnimationProcess } from "../anim/TextAnimationProcess";

import { SceneViewer } from "../../SceneViewer";
// import ScenePosition from "../ScenePosition";
/* eslint-disable no-console,  */

type Step = (string | number)[];
type Sequence = Step[];

class ViewerSequencer {

    sceneViewer: SceneViewer;
    seq: Sequence | null;
    time: number;
    index: number;
    playing: boolean;

    waitTime: number;

    constructor( sceneViewer: SceneViewer ) {

        this.sceneViewer = sceneViewer;

        this.seq = null;
        this.playing = false;
        this.time = 0.0;
        this.index = 0;
        this.waitTime = 0.0;
    }

    update( deltaTime: number ): void {

        if ( !( this.playing )) { return; }

        this.time += deltaTime;

        if ( this.waitTime > 0.0 ) {
            this.waitTime -= deltaTime;
            return;
        }

        // Run all possible steps
        while ( this.index < this.seq!.length && this.waitTime <= 0.0 ) {
            const step = this.seq![this.index];
            this.index++;
            this.runStep( step );
        }

    }

    runStep( step: Step ): void {

        console.debug( "Running step: ", step );

        const command: string | number = step[0];
        //if ( ! ((command instanceof String )) throw new Error( "No command specified." );

        if ( command === "m" ) {
            const posString: string | null = this.sceneViewer.positionString();

            if ( posString ) {
                const move_start = this.sceneViewer.parsePositionString( posString );
                const move_end = this.sceneViewer.parsePositionString( posString );
                const animTime = <number> step[2];
                const moveAnimationProcess = new CameraMovementAnimationProcess( this.sceneViewer, move_start, move_end, animTime );
                this.sceneViewer.processes.add( moveAnimationProcess );
            }

        } else if ( command === "dt" ) {
            const dtStart = this.sceneViewer.viewerState.positionDate;
            console.debug( dtStart );
            const dtEnd = new Date( dtStart );
            console.debug( dtEnd );
            dtEnd.setHours( parseInt( (<string> step[1]).split( ":" )[0]));
            dtEnd.setMinutes( parseInt( (<string> step[1]).split( ":" )[1]));
            console.debug( dtEnd );
            const animTime = <number> step[2];
            const process = new DateTimeAnimationProcess( this.sceneViewer, dtStart, dtEnd, animTime );
            this.sceneViewer.processes.add( process );

        } else if ( command === "t" ) {
            const text = <string> step[1];
            const animTime = <number> step[2];
            const process = new TextAnimationProcess( this.sceneViewer, text, animTime );
            this.sceneViewer.processes.add( process );

        } else if ( command === "s" ) {
            this.waitTime = <number> step[1];


            /*} else if ( command === "u" ) {
            const url = step[1];
            // Do not change URL if in settings
            if ( this.sceneViewer.app.$route.name !== "sceneTools" ) {
                this.sceneViewer.app.$router.push( url );
            }*/



        } else if ( command === "goto" ) {
            this.index = <number> step[1];

        } else if ( (<string>command).startsWith( "#" )) {
            // Command is a comment. Ignore.
        } else {
            // Unknown step type
            console.debug( "Invalid sequence step: ", step );
        }
    }

    play( seq: Sequence ): void {
        console.debug( "Playing sequence: ", seq );

        this.sceneViewer.camera!.detachControl();
        this.sceneViewer.viewerState.sceneViewModeShow = false;
        this.seq = seq;
        this.playing = true;
        this.time = 0.0;
        this.index = 0;
    }
}

export { ViewerSequencer };
