/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


import { SceneViewer } from "../../SceneViewer";
import { AnimationProcess } from "./AnimationProcess";

/**
 * 
 */
class TextAnimationProcess extends AnimationProcess {

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

        const interpChars = Math.ceil(( this.text.length ) * this.interpFactor );
        const interpText = this.text.substr( 0, interpChars );
        
        this.sceneViewer.viewerState.sceneTitleText = interpText;

        if ( this.finished ) {
            this.sceneViewer.viewerState.sceneTitleText = null;
        }
    }
}

export { TextAnimationProcess };
