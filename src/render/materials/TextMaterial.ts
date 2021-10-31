/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { PBRCustomMaterial } from "@babylonjs/materials";
import { BaseTexture, Color3, Scene, Texture, Vector2 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/**
 */
class TextMaterialWrapper {

    sceneViewer: SceneViewer;
    material: PBRCustomMaterial;

    options: any;

    constructor(sceneViewer: SceneViewer, atlasTexture: BaseTexture, atlasNormalTexture: BaseTexture | null, options: any = null) {
        this.sceneViewer = sceneViewer;
        this.options = options;
        this.material = this.initMaterial( <Scene> this.sceneViewer.scene, atlasTexture, atlasNormalTexture);
    }

    initMaterial(scene: Scene, atlas: BaseTexture, atlasnormals: BaseTexture | null): PBRCustomMaterial {

        this.material = new PBRCustomMaterial("TextMaterial", scene);
        this.material.metallic = 0.3; // 0.0;
        this.material.roughness = 0.0; // 0.43 (asphalt); // 0.95;
        //this.material.indexOfRefraction = 1.4;

        //this.material.twoSidedLighting = true;
        //this.material.disableLighting = false;
        //this.material.ambientColor = new Color3(1.0, 1.0, 1.0); // Color3.Black();
        //this.material.disableBumpMap = true;
        //this.material.metallicspecularColor = new Color3(0.15, 0.15, 0.15); // Color3.Black();
        //this.material.specularIntensity = 1.0;
        //this.material.emissiveColor = new Color3(0.0, 0.0, 0.0); // Color3.Black();
        //this.material.emissiveIntensity = 0.0;
        //this.material.usePhysicalLightFalloff= false;
        this.material.environmentIntensity = 1.0;  // This one is needed to avoid saturation due to env

        this.material.albedoTexture = atlas;
        if (atlasnormals !== null) {
            //this.material.bumpTexture = atlasnormals;
            this.material.bumpTexture = atlasnormals;
        }

        this.material.Fragment_Custom_Albedo(`
            if (result.r < 0.5) {
                discard;
            }
            vec3 col = vec3(0.2, 0., 0.);
            //vec3 col = vec3(1.0, 0.8, 0.8);
            surfaceAlbedo = col;
        `);

        /*
        this.material.onBindObservable.add(() => {
            this.update();
        });
        */

        return this.material;
    }

    update(): void {
        //this.material.getEffect().setTexture( "splatmap", this.splatMap );
        //this.material.getEffect().setTexture( "atlasNormalsSampler", this.atlasBumpTexture );

        //this.material.reflectionTexture = this.envReflectionProbe.cubeTexture;
        //this.material.reflectionTexture = this.scene.environmentTexture;
        //this.sceneViewer.scene.environmentTexture = this.sceneViewer.envReflectionProbe.cubeTexture;
        //this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;
    }

}

export { TextMaterialWrapper };
