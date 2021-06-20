/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


/**
 * ScenePosition represents
 */
class ScenePosition {

    positionWGS84: number[] = [ 0, 0, 0 ];

    positionTileZoomLevel: number = 0;

    positionGroundHeight: number = 0;

    positionHeading: number = 0;

    positionTilt: number = 0;

}

export { ScenePosition };