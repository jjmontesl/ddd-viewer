
// import * as BABYLON from "babylonjs";
import CameraMoveAnimationProcess from "./CameraMoveAnimationProcess";
import DateTimeAnimationProcess from "./DateTimeAnimationProcess";
import TextAnimationProcess from "./TextAnimationProcess";

import SceneViewer from "../SceneViewer";
// import ScenePosition from "../ScenePosition";
/* eslint-disable no-console,  */

type Step = [string | number];
type Sequence = [ Step ];

export default class {

    sceneViewer: SceneViewer;
    seq: Sequence[] | null;
    time: number;
    index: number;
    playing: boolean;
    currentTasks: any[];

    waitTime: number;

    constructor( sceneViewer: SceneViewer ) {

        this.sceneViewer = sceneViewer;

        this.seq = null;
        this.playing = false;
        this.time = 0.0;
        this.index = 0;
        this.waitTime = 0.0;

        this.currentTasks = [];
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
        if ( command instanceof string | number ) throw new Error( "No command specified." );

        if ( command === "m" ) {
            const posString: string | null = this.sceneViewer.positionString();

            if ( posString ) {
                const move_start = this.sceneViewer.parsePositionString( posString );
                const move_end = this.sceneViewer.parsePositionString( posString );
                const animTime = step[ 2 ];
                const moveAnimationProcess = new CameraMoveAnimationProcess( move_start, move_end, animTime );
                this.sceneViewer.processes.add( moveAnimationProcess );
            }

        } else if ( command === "dt" ) {
            const dtStart = this.sceneViewer.viewerState.positionDate;
            console.debug( dtStart );
            const dtEnd = new Date( dtStart );
            console.debug( dtEnd );
            dtEnd.setHours( parseInt( step[1].split( ":" )[0]));
            dtEnd.setMinutes( parseInt( step[1].split( ":" )[1]));
            console.debug( dtEnd );
            const animTime = step[2];
            const process = new DateTimeAnimationProcess( dtStart, dtEnd, animTime );
            this.sceneViewer.processes.add( process );

        } else if ( command === "t" ) {
            const text = step[1];
            const animTime = step[2];
            const process = new TextAnimationProcess( text, animTime );
            this.sceneViewer.processes.add( process );

        } else if ( command === "s" ) {
            this.waitTime = step[1];


            /*} else if ( command === "u" ) {
            const url = step[1];
            // Do not change URL if in settings
            if ( this.sceneViewer.app.$route.name !== "sceneTools" ) {
                this.sceneViewer.app.$router.push( url );
            }*/



        } else if ( command === "goto" ) {
            this.index = step[1];

        } else if ( command.startsWith( "#" )) {
            // Command is a comment. Ignore.
        } else {
            // Unknown step type
            console.debug( "Invalid sequence step: ", step );
        }
    }

    play( seq ) {
        console.debug( "Playing sequence: ", seq );
        this.sceneViewer.camera!.detachControl();
        this.sceneViewer.viewerState.sceneViewModeShow = false;
        this.seq = seq;
        this.playing = true;
        this.time = 0.0;
        this.index = 0;
    }
}