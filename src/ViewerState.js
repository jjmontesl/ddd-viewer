


class ViewerState {

    mapVisible = true;
    sceneVisible = false;

    dddConfig = null;

    isMobile = null;

    positionTileZoomLevel = 9;

    positionWGS84 = [-8.726, 42.233]; // [0.0, 0.0];

    // Position in scene, in engine coordinates (elevation is Y)
    positionScene = [0, 0, 0];

    positionGroundHeight = 150.0;

    positionTerrainElevation = 0;

    positionHeading = 0.0;

    positionTilt = 0.0;

    positionName = "";

    positionDate = new Date();
    positionDateSeconds = this.positionDate / 1000;

    geolocationEnabled = false;

    serverInfoShow = true;



    // TODO: These nodes are instrumented: remove selectedMesh from here and use ids.
    // TODO: Try removing this and this.sceneViewer
    sceneSelectedMesh = null;

    // sceneSelectedMeshId = null;


    sceneFPS = 0;
    sceneDrawCalls = null;
    sceneTriangles = null;

    sceneShadowsEnabled = false;

    sceneTextsEnabled = false;

    scenePostprocessingEnabled = false;

    scenePickingEnabled = true;

    sceneViewModeShow = true;

    sceneTileDrawDistance = 1;

    sceneMoveSpeed = 5;

    sceneCameraWalkHeight = 2.0;

    sceneViewportRescale = 1;

    sceneEnvironmentProbe = 16;  // null to use a static environment (should be associated to the skybox, but it's currently fixed)
    sceneSkybox = "/textures/TropicalSunnyDay"; // "@dynamic"; // ""/textures/TropicalSunnyDay";

    sceneTextureSet = "defaultsplat256";

    sceneGroundTextureOverride = null;

    sceneTitleText = null;

    constructor(initialCoords, isMobile) {

        this.isMobile = isMobile || false;
        if (this.isMobile) {
            this.sceneViewportRescale = 2;
            this.sceneTextureSet = null;  // "default256";
        }

        this.positionWGS84 = initialCoords;

        const shadowsEnabled = localStorage.getItem('dddSceneShadowsEnabled');
        this.sceneShadowsEnabled = shadowsEnabled ? JSON.parse(shadowsEnabled) : this.sceneShadowsEnabled;

        const textsEnabled = localStorage.getItem('dddSceneTextsEnabled');
        this.sceneTextsEnabled = textsEnabled ? JSON.parse(textsEnabled) : this.sceneTextsEnabled;

        const textureSet = localStorage.getItem('dddSceneTextureSet');
        this.sceneTextureSet = textureSet ? JSON.parse(textureSet) : this.sceneTextureSet;

        // Start time
        this.positionDate.setHours(11);
        this.positionDate.setMinutes(0);


    }

}

export default ViewerState;
