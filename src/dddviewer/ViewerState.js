


class ViewerState {

    mapVisible = true;
    sceneVisible = false;

    dddConfig = null;

    positionTileZoomLevel = 9;

    positionWGS84 = [-8.726, 42.233]; // [0.0, 0.0];

    positionScene = [0, 0, 0];

    positionGroundHeight = 150.0;

    positionTerrainElevation = 0;

    positionHeading = 0.0;

    positionTilt = 0.0;

    positionName = "";

    positionDate = new Date();



    // TODO: These nodes are instrumented: remove selectedMesh from here and use ids.
    // TODO: Try removing this and this.sceneViewer
    sceneSelectedMesh = null;

    // sceneSelectedMeshId = null;


    sceneFPS = 0;
    sceneDrawCalls = null;

    sceneShadowsEnabled = false;

    scenePickingEnabled = true;

    sceneViewModeShow = true;

    sceneTileDrawDistance = 1;

    sceneMoveSpeed = 5;

    sceneCameraWalkHeight = 2.0;

    sceneEnvironmentProbe = 16;  // null to use a static environment (should be associated to the skybox, but it's currently fixed)
    sceneSkybox = "/textures/TropicalSunnyDay"; // "@dynamic"; // ""/textures/TropicalSunnyDay";

    sceneTextureSet = "default256";

    sceneGroundTextureOverride = null;

    constructor(initialCoords) {
        this.positionWGS84 = initialCoords;

        const shadowsEnabled = localStorage.getItem('dddSceneShadowsEnabled');
        this.sceneShadowsEnabled = shadowsEnabled ? JSON.parse(shadowsEnabled) : this.sceneShadowsEnabled;

        const textureSet = localStorage.getItem('dddSceneTextureSet');
        this.sceneTextureSet = textureSet ? JSON.parse(textureSet) : this.sceneTextureSet;

        // Start at 10:00 AM always
        this.positionDate.setHours(11);
        this.positionDate.setMinutes(0);

    }

}

export default ViewerState;
