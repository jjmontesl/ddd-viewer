/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera, Color3, ColorCurves, DefaultRenderingPipeline, ImageProcessingPostProcess, LensRenderingPipeline, Scene } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { ViewerState } from "ViewerState";

/**
 * Rendering and pipeline configuration
 * (effects, shadows...)
 */
class DefaultRenderPipeline  {

    protected dddViewer: SceneViewer;

    protected scene: Scene;

    protected viewerState: ViewerState;

    constructor(dddViewer: SceneViewer) {

        // Reference to DDDViewer
        this.dddViewer = dddViewer;
        this.viewerState = dddViewer.viewerState;
        this.scene = dddViewer.scene;

        // Babylon camera which we are controlling
        //this.camera = dddViewer.camera;
    }

    update(deltaTime: number): void {

    }

    initialize(): void {

    }

    dispose(): void {

    }

    scenePostprocessingSetEnabled( value: boolean ): void {
        this.viewerState.scenePostprocessingEnabled = value;
        //localStorage.setItem('dddScenePostprocessingSetEnabled', value);
        //alert('Reload the viewer for changes to take effect.');
        this.updateRenderPipeline();
    }

    updateRenderPipeline(): void {

        this.scene.postProcessesEnabled = this.viewerState.scenePostprocessingEnabled;

        if ( !this.viewerState.scenePostprocessingEnabled ) {
            return;
        }
    }

    initRenderPipeline(): void {
        // Postprocess
        // The default pipeline applies other settings, we'd better off using Bloom independently if possible
        // Also note this is tied to the camera, and thus if used, this should be updated when the camera changes
        const defaultPipeline = new DefaultRenderingPipeline( "default", true, this.scene, [ <Camera> this.dddViewer.camera ]);
        defaultPipeline.fxaaEnabled = true;
        defaultPipeline.bloomEnabled = true;
        defaultPipeline.bloomWeight = 1.0;  // 1.5 is exagerated but maybe usable for pics
        //defaultPipeline.cameraFov = this.camera.fov;
        defaultPipeline.imageProcessing.toneMappingEnabled = true;


        //var postProcessHighlights = new HighlightsPostProcess("highlights", 0.1, camera);
        //var postProcessTonemap = new TonemapPostProcess("tonemap", TonemappingOperator.Hable, 1.2, camera);

        // See: https://doc.babylonjs.com/divingDeeper/postProcesses/postProcessRenderPipeline
        /*
        var standardPipeline = new PostProcessRenderPipeline(this.engine, "standardPipeline");
        var effectBloom = new BloomEffect(this.scene, 4, 5.0, 2.0);
        //var effectDepthOfField = new DepthOfFieldEffect(this.scene);
        var postProcessChain = new PostProcessRenderEffect(this.engine, "postProcessChain", function() { return [effectBloom, effectDepthOfField] });
        standardPipeline.addEffect(effectBloom);
        this.scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
        */

        // Screen space reflections
        /*
        const ssr = new ScreenSpaceReflectionPostProcess(
            "ssr", // The name of the post-process
            this.scene, // The scene where to add the post-process
            1.0, // The ratio of the post-process
            this.camera // To camera to attach the post-process
        );
        ssr.reflectionSamples = 32; // Low quality.
        ssr.strength = 2; // Set default strength of reflections.
        ssr.reflectionSpecularFalloffExponent = 3; // Attenuate the reflections a little bit. (typically in interval [1, 3])
        */

        const lensRenderingPipeline = new LensRenderingPipeline( "lens", {
            edge_blur: 0.25,                // 1.0 is too distorted in the borders for walk/view mode (maybe for pictures)
            chromatic_aberration: 1.0,
            distortion: 0.7,                // (dilate effect) 0.5 -> subtle
            dof_focus_distance: 60,
            dof_aperture: 1.0,            // 1.2 is already too blurry for OSM, 6.0 is very high
            grain_amount: 0.0, // 0.5,
            dof_pentagon: false, // true,
            dof_gain: 1.0,
            dof_threshold: 1.0,
            dof_darken: 0.25
        }, this.scene, 1.0, [ <Camera> this.dddViewer.camera ]);
        //this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline('lensEffects', camera);

        /*
        const ssao = new SSAO2RenderingPipeline('ssao', this.scene, {
          ssaoRatio: .5,
          blurRatio: 1
        }, [ this.camera ], true)
        */

        var curve = new ColorCurves();
        curve.globalHue = 0;
        curve.globalDensity = 80;
        curve.globalSaturation = 5;
        curve.highlightsHue = 0;
        curve.highlightsDensity = 80;
        curve.highlightsSaturation = 40;
        curve.shadowsHue = 0;
        curve.shadowsDensity = 80;
        curve.shadowsSaturation = 40;
        this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
        this.scene.imageProcessingConfiguration.colorCurves = curve;
        var postProcess = new ImageProcessingPostProcess("processing", 1.0, this.dddViewer.camera);

        // Fog
        //this.scene.fogMode = Scene.FOGMODE_EXP;
        //this.scene.fogDensity = 0.005;  // default is 0.1
        this.scene.fogMode = Scene.FOGMODE_LINEAR;
        this.scene.fogStart = 350.0;
        this.scene.fogEnd = 700.0;
        this.scene.fogColor = new Color3(0.75, 0.75, 0.85);

        /*
        pixels = rp.cubeTexture.readPixels(0,0)
        // i take the first pixel of the reflection probe texture for fog color.
        // since pixels are stored as buffer array, first pixel are first 4 values of array [r,g,b,a....]
        scene.fogColor = new Color3(pixels[0]/255, pixels[1]/255, pixels[2]/255)
        */
    }

}

export { DefaultRenderPipeline };