

// import * as BABYLON from "babylonjs";
import DDDViewerConfig from "../DDDViewerConfig";
import SceneViewer from "../SceneViewer";
import ViewerState from "../ViewerState";
import AnimationProcess from "./AnimationProcess";
import ViewerProcesses from "./ViewerProcesses";

class TextAnimation extends AnimationProcess {

    text: string;

    constructor( text: string, animTime: number ) {
        
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
        
        this.text = text;
    }

    update( deltaTime: number ): void {
        
        const sceneViewer = this.processes!.sceneViewer;
        const textCompleteTime = 2.0;

        AnimationProcess.prototype.update.call( this, deltaTime, textCompleteTime );

        // let interp_factor = ( this.animTime > 0 )
        //     ? (( this.time ) / ( this.animTime - textCompleteTime ))
        //     : 1.0;

        // if ( interp_factor > 1.0 ) {
        //     interp_factor = 1.0;
        // }

        const interpChars = Math.ceil(( this.text.length ) * this.interpFactor );
        const interpText = this.text.substr( 0, interpChars );
        
        sceneViewer.viewerState.sceneTitleText = interpText;
        if ( this.time >= this.animTime ) {
            sceneViewer.viewerState.sceneTitleText = null;
            this.processes!.remove( this );
        }
    }
}

export default TextAnimation;
