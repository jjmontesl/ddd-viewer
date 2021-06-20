/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { DDDViewerConfig } from "./DDDViewerConfig";

/**
 * Holds DDDViewer global state like viewer position, date/time, configuration...
 * Some internal values are also stored here for convenience (FPS, drawcalls, mobile detection...).
 * This object must be JSON-serializable.
 */
class ViewerState {

    mapVisible = true;
    sceneVisible = false;
    dddConfig: DDDViewerConfig;
    isMobile = false;
    positionTileZoomLevel = 9;
    positionWGS84 = [ -8.726, 42.233 ]; // [0.0, 0.0];

    // Position in scene, in engine coordinates (elevation is Y)
    positionScene = [ 0, 0, 0 ];
    positionGroundHeight: number = 150.0;
    positionTerrainElevation = 0;
    positionHeading = 0.0;
    positionTilt = 0.0;
    positionName: string | null = null;
    positionDate: Date = new Date();
    positionDateSeconds: number = this.positionDate.getTime() / 1000;
    geolocationEnabled = false;
    serverInfoShow = true;

    // TODO: These nodes are instrumented: remove selectedMesh from here and use ids.
    // TODO: Try removing this and this.sceneViewer id still used
    sceneSelectedMesh = null;
    sceneSelectedMeshId: string | null = null;

    sceneFPS: number = 0;
    sceneDrawCalls: number = 0;
    sceneTriangles: number = 0;
    sceneShadowsEnabled = false;
    sceneTextsEnabled = false;
    scenePostprocessingEnabled = false;
    scenePickingEnabled = true;
    sceneViewModeShow = true;
    sceneTileDrawDistance = 1;
    sceneMoveSpeed = 5;
    sceneCameraWalkHeight = 2.0;
    sceneViewportRescale = 1;
    sceneEnvironmentProbe = 16; // null to use a static environment (should be associated to the skybox, but it's currently fixed)
    sceneSkybox = "/textures/TropicalSunnyDay"; // "@dynamic"; // ""/textures/TropicalSunnyDay";
    sceneTextureSet: string | null = "defaultsplat256";
    sceneGroundTextureOverride: string | null = null;
    sceneTitleText:string | null = null;
    

    constructor( dddConfig: DDDViewerConfig, initialCoords: number[], isMobile: boolean = false ) {

        this.dddConfig = dddConfig;

        this.isMobile = isMobile;
        if ( this.isMobile ) {
            this.sceneViewportRescale = 2;
            this.sceneTextureSet = null;  // "default256";
        }

        this.positionWGS84 = initialCoords;

        const shadowsEnabled = localStorage.getItem( "dddSceneShadowsEnabled" );
        this.sceneShadowsEnabled = shadowsEnabled ? JSON.parse( shadowsEnabled ) : this.sceneShadowsEnabled;

        const textsEnabled = localStorage.getItem( "dddSceneTextsEnabled" );
        this.sceneTextsEnabled = textsEnabled ? JSON.parse( textsEnabled ) : this.sceneTextsEnabled;

        const textureSet = localStorage.getItem( "dddSceneTextureSet" );
        this.sceneTextureSet = textureSet ? JSON.parse( textureSet ) : this.sceneTextureSet;

        // Start time
        this.positionDate.setHours( 11 );
        this.positionDate.setMinutes( 0 );

    }
}

export { ViewerState };
