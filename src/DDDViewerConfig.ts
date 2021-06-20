/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


class DDDViewerConfig {

    tileUrlBase: string = "/data/tiles/";

    sceneGroundLayers: any;

    sceneMaterials: DDDMaterialsConfig[] = [];

}

class DDDMaterialsConfig {
    
    value!: string;

    textures!: string;
    
    splatmap!: string;
}


export { DDDViewerConfig };
export { DDDMaterialsConfig };
