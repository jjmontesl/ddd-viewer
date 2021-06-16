/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


// import * as BABYLON from "babylonjs";
import SceneViewer from "SceneViewer";
import AnimationProcess from "./AnimationProcess";

/**
 * 
 */
class TextAnimation extends AnimationProcess {

    text: string;

    /**
     * 
     * @param text Text to animate.
     * @param animTime Animation duration in seconds.
     */
    constructor( sceneViewer: SceneViewer, text: string, animTime: number ) {
        super( sceneViewer, animTime );
        this.text = text;
    }

    update( deltaTime: number ): void {
        
        super.update( deltaTime );

        const sceneViewer = this.sceneViewer;
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
        if ( this.finished ) {
            sceneViewer.viewerState.sceneTitleText = null;
        }
    }
}

export default TextAnimation;
