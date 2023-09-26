/*
 * DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
 * Copyright 2021 Jose Juan Montes and contributors
 * MIT License (see LICENSE file)
 */

/**
 * This object represents ddd-viewer configuration, and is used to pass
 * options to the main object (DDDViewer) constructor.
 */
class DDDViewerConfig {
    defaultCoords: number[] | null = [ -8.726, 42.233 ]; // [0.0, 0.0];

    // TODO: Move this to layer configuration (?)
    tileUrlBase: string = "/cache/ddd_http/";
    tileUrlSuffix: string = "";

    assetsUrlbase: string = "/assets/";

    materialsTextureSet: string | null = "default256";
    materialsSplatmap: number | null = null; // 256

    //sceneGroundTextureOverrideUrl: string | null = null;

    timeScale: number = 0.0;

    moveSpeeds: number[] = [ 2.0, 5.0, 10.0 ];

    sceneTileDrawDistanceDefault: number = 1;
}

export { DDDViewerConfig };
