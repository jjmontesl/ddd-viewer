


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

    sceneSelectedMeshId = null;


    sceneFPS = 0;
    sceneDrawCalls = null;

    scenePickingEnabled = true;

    sceneViewModeShow = true;

    sceneTileDrawDistance = 1;

    sceneMoveSpeed = 5;

    sceneSkybox = "/textures/TropicalSunnyDay";

    sceneGroundTextureOverride = null;

    constructor(initialCoords) {
        this.positionWGS84 = initialCoords;
    }

}

export default ViewerState;
