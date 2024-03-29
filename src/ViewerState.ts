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
    positionTileZoomLevel = 11;
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
    timeScale = 24 * 2;  // 24 * 2 = 48x faster (1 day = 30 min)

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
    sceneSelectedShowNormals = true;
    sceneTileDrawDistance = 1;
    sceneMoveSpeed = 5;
    sceneEnvironmentProbe = 16; // 16; // null to use a static environment (should be associated to the skybox, but it's currently fixed)
    sceneSkybox = "/textures/TropicalSunnyDay";  // /textures/skybox/clouds1/clouds1 // "@dynamic"; // ""/textures/TropicalSunnyDay";

    // TODO: This shall be a per-layer setting
    sceneGroundTextureOverrideUrl: string | null = null;

    sceneTitleText:string | null = null;

    /**
     * 3dsmaps DDD tile server supports on-demand generation. When a tile that's not available is enqueued, it responds
     * with information about the job status. This array contains enqueued tiles status.
     */
    remoteQueueJobsStatus: any[] = [];


    constructor(dddConfig: DDDViewerConfig, initialCoords: number[] | null = null) {

        this.dddConfig = dddConfig;

        if (dddConfig.defaultCoords) {
            this.positionWGS84 = dddConfig.defaultCoords;
        }

        if (initialCoords) {
            this.positionWGS84 = initialCoords;
        }

        const shadowsEnabled = localStorage.getItem( "dddSceneShadowsEnabled" );
        this.sceneShadowsEnabled = shadowsEnabled ? JSON.parse( shadowsEnabled ) : this.sceneShadowsEnabled;

        const textsEnabled = localStorage.getItem( "dddSceneTextsEnabled" );
        this.sceneTextsEnabled = textsEnabled ? JSON.parse( textsEnabled ) : this.sceneTextsEnabled;

        this.sceneTileDrawDistance = dddConfig.sceneTileDrawDistanceDefault;

        // Start time
        this.positionDate.setHours( 11 );
        this.positionDate.setMinutes( 0 );

    }
}

export { ViewerState };
