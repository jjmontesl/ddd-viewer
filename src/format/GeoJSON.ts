/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 */
class GeoJSONFormat  {

    protected dddViewer: SceneViewer;

    constructor(dddViewer: SceneViewer) {
        // Reference to DDDViewer
        this.dddViewer = dddViewer;
    }

}

export { GeoJSONFormat };