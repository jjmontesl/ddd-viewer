/* 
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


class DDDViewerConfig {

    defaultCoords: number[] | null = [ -8.726, 42.233 ]; // [0.0, 0.0];

    tileUrlBase: string = "/data/tiles/";

    assetsUrlbase: string = "/assets/";

    materialsTextureSet: string | null = "default256";
    materialsSplatmap: number | null = null; // 256
    
    //sceneGroundTextureOverrideUrl: string | null = null;

    timeScale: number = 0.0;
}

/*
class DDDMaterialsConfig {
    
    value!: string;

    textures!: string;
    
    splatmap!: string;
}
export { DDDMaterialsConfig };
*/

export { DDDViewerConfig };
