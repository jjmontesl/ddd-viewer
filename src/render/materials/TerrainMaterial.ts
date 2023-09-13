/* eslint-disable object-curly-spacing */
/* eslint-disable array-bracket-spacing */
/* eslint-disable indent */

//import * as BABYLON from "babylonjs";
//import * as BABYLONMAT from "babylonjs-materials";

//import "babylonjs-loaders";
import { PBRCustomMaterial } from "@babylonjs/materials";
import { AbstractMesh, Color3, Effect, Mesh, Scene, Texture, Vector2 } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

/**
 * From: https://forum.babylonjs.com/t/pbr-texture-splatting-up-to-64-textures/1994/28
 *  and: https://www.babylonjs-playground.com/#LIVRIY#58
 */
class TerrainMaterialWrapper {

    sceneViewer: SceneViewer;
    material: PBRCustomMaterial;
    dedupDouble: boolean;

    options: any;

    tileIndexes = [];
    shaderinjectpoint1 = "";
    shaderinjectpoint2 = "";
    shaderinjectpoint3 = "";
    shaderinjectpoint4 = "";

    numTilesHorizontal: number = 0;
    numTilesVertical: number = 0;
    totalTiles: number = 0;
    tileScale: Vector2 = new Vector2(1, 1);

    numSplatTilesHorizontal: number = 0;
    numSplatTilesVertical: number = 0;
    totalSplatTiles: number = 0;
    splatScale: Vector2 = new Vector2(1, 1);

    splatMap: Texture | null = null;
    atlasBumpTexture: Texture | null = null;

    static terrainMaterialShared: PBRCustomMaterial | null = null;
    static terrainEffectShared: Effect | null = null;
    static matIdx = 1;
    initialized = false;

    constructor(sceneViewer: SceneViewer, splatmapTexture: Texture, atlasTexture: Texture, atlasNormalTexture: Texture, options: any = null) {

        // TODO: Options should be merged with defaults!

        this.sceneViewer = sceneViewer;
        this.dedupDouble = false;

        // Compile shader only first time
        if (true || TerrainMaterialWrapper.terrainMaterialShared == null) {
            this.material = this.initSplatMaterial( <Scene> this.sceneViewer.scene, splatmapTexture, atlasTexture, atlasNormalTexture, options );
            TerrainMaterialWrapper.terrainMaterialShared = this.material;
        } else {
            //this.material = TerrainMaterialWrapper.terrainMaterialShared;

            this.splatMap = splatmapTexture;
            if (atlasTexture !== null) {
                this.atlasBumpTexture = atlasNormalTexture;
            }
            this.material = new PBRCustomMaterial("splatMaterial" + (TerrainMaterialWrapper.matIdx++).toString(), this.sceneViewer.scene);  // + (TerrainMaterialWrapper.matIdx++)
            this.material.metallic = 0.0; // 0.0;
            this.material.roughness = 0.0; // 0.43 (asphalt); // 0.95;
            //this.material.environmentIntensity = 1.0;  // This one is needed to avoid saturation due to env
            this.material.albedoTexture = atlasTexture;
            this.material.AddUniform("splatmap","sampler2D", {});
            this.material.AddUniform("atlasNormalsSampler","sampler2D",  {});
            // Reuse shader
            this.material['_prepareEffect'] = () => {
                if (TerrainMaterialWrapper.terrainMaterialShared!['_activeEffect']) {
                    TerrainMaterialWrapper.terrainEffectShared = TerrainMaterialWrapper.terrainMaterialShared!['_activeEffect'];
                }

                if (TerrainMaterialWrapper.terrainEffectShared) {
                    return TerrainMaterialWrapper.terrainEffectShared;
                }
                return null;
            }

        }

        // TODO: Check how much this impacts performance, it has a subtle impact on terrain and roads but it's nice to have it.
        // TODO: At least make it optional / linked to quality settings.
        this.material.reflectionTexture = this.sceneViewer.scene.environmentTexture;
        
        // This one is needed to control saturation due to env, should be aligned with PBRMaterials, StandarMaterials and light intensity
        this.material.environmentIntensity = this.sceneViewer.baseEnvironmentIntensity;


        this.material.onBindObservable.add((mesh) => {

            this.bind(mesh);
            //this.material.getEffect().setTexture("splatmap", this.splatMap);

            const ubo = this.material['_uniformBuffer'];
            ubo.update();

        });

    }

    initSplatMaterial(scene: Scene, splatMap: Texture, atlas: Texture, atlasnormals: Texture, options: any = null): PBRCustomMaterial {
        // TODO: Options should be merged with defaults!

        var defScale = 100.0;
        if (!options) {
            options = {
                numTilesHorizontal: 4,
                numTilesVertical: 4,
                numSplatTilesHorizontal:2,
                numSplatTilesVertical:2,
                //tileScale:[[20.0,20.0],[20.0,20.0],[20.0,20.0]],
                splatInfos: {  // Positions is X / Y, Y grows upwards
                    layers: [
                        {"name": "Ground", "position": [0, 3], "scale": [defScale, defScale], "displScales": 1.0 },
                        // ...
                    ],
                    positions:[
                               [0.0, 3.0], [1.0, 3.0], [2.0, 3.0], [3.0, 3.0], // encoded by first splat (top left), first row (index 3 from bottom)
                               [0.0, 2.0], [1.0, 2.0], [2.0, 2.0], [3.0, 2.0], // encoded by splat (top right), second row (index 2 from bottom)
                               [0.0, 1.0], [1.0, 1.0], [2.0, 1.0], [3.0, 1.0], // encoded by third splat (down left), third row (index 1 starting from bottom)
                               [0.0, 0.0], [1.0, 0.0], [2.0, 0.0], [3.0, 0.0], // encoded by splat (down right), last row (index 0 from bottom)
                              ],
                    scales:[[defScale * 0.75, defScale * 0.75], [defScale,defScale], [defScale,defScale], [defScale * 0.5, defScale * 0.5],
                             [defScale * 0.5, defScale * 0.5], [defScale * 0.5, defScale * 0.5], [defScale,defScale], [defScale,defScale],
                             [defScale * 1.0, defScale * 1.0], [defScale * 1.6, defScale * 1.6], [defScale,defScale], [defScale,defScale],  // Grass
                             [defScale,defScale], [defScale * 0.5, defScale * 0.5], [defScale * 0.25, defScale * 0.25], [defScale,defScale]], // Sand, rock, rock orange
                    displScales: [0.0, 0, 0.0, 0,
                                  0, 0, 0, 0,
                                  0, 0, 0, 0,
                                  0.0, 0.0, 0.0, 0.0,],
                    dedupScales: [1.0, 1.0, 1.0, 0.0,
                                  0.0, 0.0, 1.0, 1.0,
                                  1.1, 1.1, 1.1, 1.2,
                                  1.2, 1.2, 0.5, 1.1],
                    roughness: [
                        1.2, 1.3, 2.5, 0.8,
                        0.8, 0.9, 1.0, 1.0,
                        1.85, 1.85, 1.15, 1.25,
                        1.45, 0.8, 1.0, 1.0],
                    metallic: [
                        0.2, 0.1, 0.1, 0.3,
                        0.3, 0.1, 0.0, 0.0,
                        0.0, 0.0, 0.0, 0.0,
                        0.0, 0.4, 0.0, 0.0]
                }
            };
        }

        this.options = options;
        this.tileIndexes = [];
        this.shaderinjectpoint1 = "";
        this.shaderinjectpoint2 = "";
        this.shaderinjectpoint3 = "";
        this.shaderinjectpoint4 = "";

        // 4x4 = 16
        this.numTilesHorizontal = options.numTilesHorizontal;
        this.numTilesVertical = options.numTilesVertical;
        this.totalTiles = this.numTilesVertical*this.numTilesHorizontal;
        this.tileScale = new Vector2(1.0/this.numTilesHorizontal,1.0/this.numTilesVertical);

        // 2x2 = 4
        this.numSplatTilesHorizontal = options.numSplatTilesHorizontal;
        this.numSplatTilesVertical = options.numSplatTilesVertical;
        this.totalSplatTiles = this.numSplatTilesVertical * this.numSplatTilesHorizontal;
        this.splatScale = new Vector2(1.0/this.numSplatTilesHorizontal,1.0/this.numSplatTilesVertical);

        this.shaderinjectpoint1 += "vec2 splatScale = vec2("+this.splatScale.x+","+this.splatScale.y+");\r\n";
        this.shaderinjectpoint1 += "vec2 scale = vec2("+this.tileScale.x+","+this.tileScale.y+");\r\n";

        //this.shaderinjectpoint3 += 'normalW = vec3(0.0, 1.0, 0.0);\r\n';

        this.shaderinjectpoint3 += "vec4 finalColor1 = baseColor1;\r\n";
        this.shaderinjectpoint3 += "vec3 finalNormal1 = baseNormal1;\r\n";
        //this.shaderinjectpoint3 += 'finalColor1.a = 0.05;\r\n';

        this.shaderinjectpoint4 += "vec4 finalColor1 = baseColor1;\r\n";
        this.shaderinjectpoint4 += "float finalRough1 = baseRough1;\r\n";
        this.shaderinjectpoint4 += "float finalMetallic1 = baseMetallic1;\r\n";
        //this.shaderinjectpoint4 += 'finalColor1.a = 0.05;\r\n';

        var v = 0.0, h = 0.0;
        for (let i=0; i < this.totalTiles; i++){

            var tpos = Math.floor(i / 4);
            h = tpos % this.numSplatTilesHorizontal;
            v = (this.numSplatTilesHorizontal - 1) - Math.floor(tpos / this.numSplatTilesHorizontal);

            if (i < this.totalTiles-1) {
                 this.shaderinjectpoint3 += (`
                     `+ "//vec4 finalColor" + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalColor" + (i + 1) + " : baseColor" + (i + 2) + `;
                     `+ "//vec4 finalColor" + (i + 2) + " = finalColor" + (i + 1) + " * (1.0 - baseColor" + (i + 2) + ".a) + baseColor" + (i + 2) + " * baseColor" + (i + 2) + `.a;
                     `+ "vec4 finalColor" + (i + 2) + " = blend(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + "); " + `
                     //finalColor` + (i + 2) + `.a *= 0.95;

                     //vec3 finalNormal` + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalNormal" + (i + 1) + " : baseNormal" + (i + 2) + `;
                     vec3 finalNormal` + (i + 2) + " = blendNormal(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + ", finalNormal" + (i + 1) + ", baseNormal" + (i + 2) + "); " + `
                 `);

                 this.shaderinjectpoint4 += (`
                     `+ "vec4 finalColor" + (i + 2) + " = blend(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + "); " + `
                     float finalRough` + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalRough" + (i + 1) + " : baseRough" + (i + 2) + `;
                     float finalMetallic` + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalMetallic" + (i + 1) + " : baseMetallic" + (i + 2) + `;
                 `);

            }

            // Get basecolors from tiles
            this.shaderinjectpoint2 += "vec2 uv" + (i + 1) + " = vec2((vAlbedoUV.x + "+h+".0) * splatScale.x, (vAlbedoUV.y + "+v+".0) * splatScale.y);\r\n";
            this.shaderinjectpoint2 += "mat4 chanInfo" + (i + 1) +" = colInfo(vAlbedoUV, uv" + (i + 1) + ", " + this.options.splatInfos.dedupScales[i].toFixed(5) + ", vec2("+this.options.splatInfos.scales[i][0]+","+this.options.splatInfos.scales[i][1]+"), vec2("+this.options.splatInfos.positions[i][0] + ","+this.options.splatInfos.positions[i][1]+"), " + (i % 4) + ", scale, splatmap, albedoSampler, atlasNormalsSampler);\r\n";
            //this.shaderinjectpoint2 += 'vec4 baseColor' + (i + 1) +' = col(vAlbedoUV, uv' + (i + 1) + ', vec2('+this.options.splatInfos.scales[i][0]+','+this.options.splatInfos.scales[i][1]+'), vec2('+this.options.splatInfos.positions[i][0] + ','+this.options.splatInfos.positions[i][1]+'), ' + (i % 4) + ', scale, splatmap, albedoSampler, bumpSampler);\r\n';
            this.shaderinjectpoint2 += "vec4 baseColor" + (i + 1) +" = chanInfo" + (i + 1) + "[0];\r\n";
            this.shaderinjectpoint2 += "vec3 baseNormal" + (i + 1) +" = vec3(chanInfo" + (i + 1) + "[1].x, chanInfo" + (i + 1) + "[1].y, chanInfo" + (i + 1) + "[1].z);\r\n";

            this.shaderinjectpoint2 += "float baseRough" + (i + 1) +" = chanInfo" + (i + 1) + "[1].a * " + this.options.splatInfos.roughness[i].toFixed(5) + ";\r\n";
            //this.shaderinjectpoint2 += "float baseRough" + (i + 1) +" = /*chanInfo" + (i + 1) + "[1].a * */ " + this.options.splatInfos.roughness[i].toFixed(5) + ";\r\n";
            //this.shaderinjectpoint2 += "float baseRough" + (i + 1) +" = chanInfo" + (i + 1) + "[1].a; /* " + this.options.splatInfos.roughness[i].toFixed(5) + "; */\r\n";

            this.shaderinjectpoint2 += "float baseMetallic" + (i + 1) +" = " + this.options.splatInfos.metallic[i].toFixed(5) + ";\r\n";

        }

        //this.shaderinjectpoint3 += 'finalColor16 = col(vAlbedoUV, uv16, vec2(20.0, 20.0), vec2(1.0, 2.0), 0, scale, splatmap, albedoSampler);';

        this.shaderinjectpoint3 += `
            mat3 TBN = cotangent_frame(normalW, vPositionW, vAlbedoUV, vec2(-1.0, 1.0));
        `;

        this.shaderinjectpoint3 += "normalW = TBN * finalNormal" + (this.totalTiles) + ";";  // TODO: adding these vectors is incorrect
        //this.shaderinjectpoint3 += "normalW = normalize(normalW * 0.75 + 0.25 * finalNormal" + (this.totalTiles) + ");";  // TODO: adding these vectors is incorrect
        //this.shaderinjectpoint3 += 'normalW = perturbNormal(cotangentFrame, finalNormal' + (this.totalTiles) + ', 1.0);';
        //this.shaderinjectpoint3 += 'normalW = normalW;';
        //this.shaderinjectpoint3 += 'normalW.y *= -1.0;';
        //this.shaderinjectpoint3 += 'result = finalNormal' + (this.totalTiles) + ';';
        this.shaderinjectpoint3 += "result = finalColor" + (this.totalTiles) + ".rgb;";

        //this.shaderinjectpoint4 += 'normalW = normalW + finalNormal' + (this.totalTiles) + ';';  // TODO: adding these vectors is incorrect

        // MetallicRoughness.r is the computed metallicness
        // MetallicRoughness.g is the computed roughness
        this.shaderinjectpoint4 += "metallicRoughness.g = finalRough" + (this.totalTiles) + ";";
        this.shaderinjectpoint4 += "metallicRoughness.r = finalMetallic" + (this.totalTiles) + ";";
        //this.shaderinjectpoint4 += "metallicRoughness.r = 0.;";
        //this.shaderinjectpoint4 += "metallicRoughness.r = 0.;";
        //this.shaderinjectpoint4 += "metallicRoughness.g = 0.43;";
        //this.shaderinjectpoint4 += "reflectivityOut.microSurface = 0.0;";


        this.splatMap = splatMap;
        //this.needsUpdating = true;


        this.material = new PBRCustomMaterial("splatMaterial", scene);
        this.material.metallic = 0.0; // 0.0;
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
        //this.material.environmentIntensity = 1.0;  // This one is needed to avoid saturation due to env


        this.material.albedoTexture = atlas;
        if (atlasnormals !== null) {
            //this.material.bumpTexture = atlasnormals;
            this.atlasBumpTexture = atlasnormals;
        }
        this.material.AddUniform("splatmap","sampler2D", {});
        this.material.AddUniform("atlasNormalsSampler","sampler2D",  {});

        this.material.Vertex_Before_PositionUpdated(`
            uvUpdated = vec2(positionUpdated.x, -positionUpdated.z);
        `);

        this.material.Vertex_MainEnd(`
            //uvUpdated = uvUpdated + 0.5;
        `);

        this.material.Fragment_Definitions(`
        //#define REFLECTION
        #define TANGENT
        //#define METALLICWORKFLOW
        `);

        this.material.Fragment_Begin(
             "precision highp float;\r\n"
            +"precision highp int;\r\n"

            +this.shaderinjectpoint1

            +`

            // From: https://github.com/BabylonJS/Babylon.js/blob/master/src/Shaders/ShadersInclude/bumpFragmentMainFunctions.fx

            vec3 perturbNormalBase(mat3 cotangentFrame, vec3 normal, float scale)
            {
                #ifdef NORMALXYSCALE
                    normal = normalize(normal * vec3(scale, scale, 1.0));
                #endif

                return normalize(cotangentFrame * normal);
            }

            vec3 perturbNormal(mat3 cotangentFrame, vec3 textureSample, float scale)
            {
                return perturbNormalBase(cotangentFrame, textureSample * 2.0 - 1.0, scale);
            }

            mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv, vec2 tangentSpaceParams)
            {
                // get edge vectors of the pixel triangle
                vec3 dp1 = dFdx(p);
                vec3 dp2 = dFdy(p);
                vec2 duv1 = dFdx(uv);
                vec2 duv2 = dFdy(uv);

                // solve the linear system
                vec3 dp2perp = cross(dp2, normal);
                vec3 dp1perp = cross(normal, dp1);
                vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
                vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;

                // invert the tangent/bitangent if requested
                tangent *= tangentSpaceParams.x;
                bitangent *= tangentSpaceParams.y;

                // construct a scale-invariant frame
                float invmax = inversesqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
                return mat3(tangent * invmax, bitangent * invmax, normal);
            }

            // Functions

            float heightval(vec4 col) {
                //return ((col.r + col.g + col.b) / 3.0);
                return col.a;
            }

            /*
            vec4 blend(vec4 texture1, float displScale1, vec4 texture2, float displScale2) {
                return ((texture1.a * displScale1) > (texture2.a * displScale2) ? texture1 : texture2);
            }
            */

            vec4 blend(vec4 texture1, float displScale1, vec4 texture2, float displScale2) {
                if (texture2.a == 0.) return texture1;
                if (texture1.a == 0.) return texture2;
                float a1 = texture1.a + displScale1;
                float a2 = texture2.a + displScale2;
                float depth = 0.2;
                float ma = max(texture1.a + a1, texture2.a + a2) - depth;

                float b1 = max(texture1.a + a1 - ma, 0.0);
                float b2 = max(texture2.a + a2 - ma, 0.0);

                vec4 result = (texture1 * b1 + texture2 * b2) / (b1 + b2);
                result.a = (texture1.a > 0. && texture2.a > 0.) ? (a1 + a2) / (2.0 * (b1 + b2)) : result.a;
                return result;
            }

            vec3 blendNormal(vec4 texture1, float displScale1, vec4 texture2, float displScale2, vec3 normal1,  vec3 normal2) {
                float a1 = texture1.a + displScale1;
                float a2 = texture2.a + displScale2;
                float depth = 0.2;
                float ma = max(texture1.a + a1, texture2.a + a2) - depth;

                float b1 = max(texture1.a + a1 - ma, 0.0);
                float b2 = max(texture2.a + a2 - ma, 0.0);

                vec3 result = (normal1 * b1 + normal2 * b2) / (b1 + b2);
                result = normalize(result);

                return result;
            }


            vec2 hash22(vec2 p)
            {
                p = p * mat2(127.1, 311.7, 269.5, 183.3);
                p = -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
                return sin(p * 6.283);  // + timeScale
            }

            float interpolationNoise(vec2 p)
            {
                vec2 pi = floor(p);
                vec2 pf = p-pi;

                vec2 w = pf * pf * (3.-2. * pf);

                float f00 = dot(hash22(pi + vec2(.0,.0)), pf-vec2(.0,.0));
                float f01 = dot(hash22(pi + vec2(.0,1.)), pf-vec2(.0,1.));
                float f10 = dot(hash22(pi + vec2(1.0,0.)), pf-vec2(1.0,0.));
                float f11 = dot(hash22(pi + vec2(1.0,1.)), pf-vec2(1.0,1.));

                float xm1 = mix(f00,f10,w.x);
                float xm2 = mix(f01,f11,w.x);

                float ym = mix(xm1,xm2,w.y);
                return ym;

            }

            float perlinNoise2D(float x,float y)
            {
                int OCTAVES = 3;
                float persistence = 0.5;
                float sum = 0.0;
                float frequency = 0.0;
                float amplitude = 0.0;
                for(int i = 0; i < OCTAVES; i++)
                {
                    frequency = pow(2.0, float(i));
                    amplitude = pow(persistence, float(i));
                    sum = sum + interpolationNoise(vec2(x * frequency, y * frequency)) * amplitude;
                }

                return sum;
            }
            `

            //+"vec4 col(vec2 vAlbedoUV, vec2 uvT, vec2 tile1Scale, vec2 tile1Position, int chanIdx, vec2 scale, sampler2D splatmap, sampler2D atlas, sampler2D atlasNormals) {"
            +"mat4 colInfo(vec2 vAlbedoUV, vec2 uvT, float dedupScale, vec2 tile1Scale, vec2 tile1Position, int chanIdx, vec2 scale, sampler2D splatmap, sampler2D atlas, sampler2D atlasNormals) {"

                + `
                float offsetInputScale = 2.0;
                float offsetBaseScale = 0.25;
                vec2 offset = vec2(perlinNoise2D(offsetInputScale * (uvT.x + 0.01 * tile1Position.x), offsetInputScale * (uvT.y + 0.1 * tile1Position.y)),
                                   perlinNoise2D(offsetInputScale * (uvT.x + 0.07 * tile1Position.y), offsetInputScale * (-uvT.y + 0.13 * tile1Position.x)));
                offset = offset * offsetBaseScale * dedupScale;
                `

                // if this.dedupDouble...
                /*
                + `
                vec2 offset2 = vec2(perlinNoise2D(uvT.y - 0.08 * tile1Position.x, uvT.x + 0.04 * tile1Position.y),
                                    perlinNoise2D(uvT.y + 0.05 * tile1Position.y, -uvT.x + 0.19 * tile1Position.x));
                offset2 = offset * offsetBaseScale * dedupScale;
                `
                */

                +"vec2 scaledUv1 = fract((vAlbedoUV + offset) * tile1Scale);"  // Curvy antitiling factor
                +"scaledUv1 = scaledUv1 * (254.0/256.0) + vec2(1.0 / 256.0, 1.0 / 256.0);"
                +"vec2 uv1 = vec2((scaledUv1.x + tile1Position.x) * scale.x, (scaledUv1.y + tile1Position.y) * scale.y);"

                /*
                +'vec2 scaledUv2 = fract((vAlbedoUV + offset2) * tile1Scale).yx;'  // Curvy antitiling factor
                +'scaledUv2 = scaledUv2 * (254.0/256.0) + vec2(1.0 / 256.0, 1.0 / 256.0);'
                +'vec2 uv2 = vec2((scaledUv2.x + tile1Position.x) * scale.x, (scaledUv2.y + tile1Position.y) * scale.y);'
                */

                + `
                vec4 splatColor1 = texture2D(splatmap, uvT);
                `

                + `
                float dedupMix = perlinNoise2D(100.0 * uvT.x, 100.0 * uvT.y);
                dedupMix = dedupScale > 0.0 ? smoothstep(-0.02, 0.02, dedupMix) : 0.0;

                //vec4 diffuse1Color = texture2DLodEXT(atlas, uv1, -1.0);
                vec4 diffuseColorA = texture2D(atlas, uv1);

                //vec4 diffuseColorB = texture2D(atlas, uv2);

                //vec4 diffuse1Color = vec4(dedupMix, 0.0, 0.0, 1.0);  // Debug dedup mix factor
                //vec4 diffuse1Color = diffuseColorA * dedupMix + diffuseColorB * (1.0 - dedupMix);
                vec4 diffuse1Color = diffuseColorA;

                vec4 diffuseNormalA = texture2D(atlasNormals, uv1);
                diffuseNormalA.rgb = (diffuseNormalA.rgb * 2.0 - 1.0);
                //vec4 diffuseNormalB = texture2D(atlasNormals, uv2);
                //diffuseNormalB.rgb = (diffuseNormalB.rgb * 2.0 - 1.0);

                /*
                vec3 diffuse1NormalVec = normalize(diffuseNormalA.xyz * dedupMix + diffuseNormalB.xyz * (1.0 - dedupMix));
                float diffuse1NormalAlpha = diffuseNormalA.a * dedupMix + diffuseNormalB.a * (1.0 - dedupMix);
                vec4 diffuse1Normal = vec4(diffuse1NormalVec.x, diffuse1NormalVec.y, diffuse1NormalVec.z, diffuse1NormalAlpha);
                */

                vec4 diffuse1Normal = diffuseNormalA;
                `

                + (`
                float blend = (chanIdx == 0 ? splatColor1.r : (chanIdx == 1 ? splatColor1.g : (chanIdx == 2 ? splatColor1.b : splatColor1.a)));
                //blend = 1.0;

                //diffuse1Color.rgb = splatColor1.rgb;
                //diffuse1Color.a = blend;

                 //diffuse1Color.a = ((blend > 0.0) ? (heightval(diffuse1Color) * blend) : 0.0);
                 diffuse1Color.a = ((blend > 0.0) ? (diffuse1Color.a * blend) : 0.0);

                 mat4 chanInfo = mat4(diffuse1Color, vec4(diffuse1Normal.x, diffuse1Normal.y, diffuse1Normal.z, diffuse1Normal.a), vec4(0.0), vec4(0.0));

                `)

                //+"return diffuse1Color;"
                +"return chanInfo;"
            +"} "
        );

        this.material.Fragment_MainBegin(
            this.shaderinjectpoint2
        );

        this.material.Fragment_Custom_Albedo(
            this.shaderinjectpoint3
        );

        this.material.Fragment_Custom_MetallicRoughness(
            this.shaderinjectpoint4
        );

        return this.material;
    }

    bind(mesh: AbstractMesh): void {
        //console.debug("Binding mesh for TerrainMaterial.");
        if (!this.material.getEffect()) return;
        this.material.getEffect().setTexture( "splatmap", this.splatMap );
        this.material.getEffect().setTexture( "atlasNormalsSampler", this.atlasBumpTexture );

        /*

        //this.material.freeze();

        //this.material.reflectionTexture = this.envReflectionProbe.cubeTexture;
        //this.sceneViewer.scene.environmentTexture = this.sceneViewer.envReflectionProbe.cubeTexture;
        //this.sceneViewer.scene.environmentTexture = this.sceneViewer.envReflectionProbe!.cubeTexture;

        //this.material.detailMap.texture = this.sceneViewer.textureDetailSurfaceImp;
        this.material.useHorizonOcclusion = true;
        if (this.sceneViewer.envReflectionProbe) {
            const reflectionTexture = this.sceneViewer.envReflectionProbe.cubeTexture;
            //this.material.reflectionTexture = reflectionTexture;
            //this.material.getEffect().setTexture( "reflectionSampler", reflectionTexture);
            this.material.getEffect().setTexture("reflectionSampler", reflectionTexture._lodTextureMid || reflectionTexture);
            this.material.getEffect().setTexture("reflectionSamplerLow", reflectionTexture._lodTextureLow || reflectionTexture);
            this.material.getEffect().setTexture("reflectionSamplerHigh", reflectionTexture._lodTextureHigh || reflectionTexture);
            //this.material.getEffect().setTexture("environmentBrdfSampler", TerrainMaterialWrapper.terrainMaterialShared!._environmentBRDFTexture);
        }
        */

        /*
        const ubo = this.material['_uniformBuffer'];
        ubo.update();
        console.debug("Done");
        */
    }

}

export { TerrainMaterialWrapper };
