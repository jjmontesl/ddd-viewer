/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 * Manages reading of files in DDD format. DDD files are glTF files
 * with custom metadata. This class processes nodes and metadata.
 */
class DDDFormat  {

    protected dddViewer: SceneViewer;

    constructor(dddViewer: SceneViewer) {
        // Reference to DDDViewer
        this.dddViewer = dddViewer;
    }



}

export { DDDFormat };