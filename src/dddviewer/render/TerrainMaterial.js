
import * as BABYLON from 'babylonjs';
import * as BABYLONMAT from 'babylonjs-materials';
import 'babylonjs-loaders';

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

class TerrainMaterialWrapper {

    // From: https://forum.babylonjs.com/t/pbr-texture-splatting-up-to-64-textures/1994/28
    //  and: https://www.babylonjs-playground.com/#LIVRIY#58

    constructor(scene, splatmapTexture, atlasTexture, atlasNormalTexture, options) {
        this.material = null;
        //this.testSplatMaterial(scene);
        this.initSplatMaterial(scene, splatmapTexture, atlasTexture, atlasNormalTexture, options);
    }

    testSplatMaterial(scene) {
        //var splatmap = new BABYLON.Texture("https://raw.githubusercontent.com/RaggarDK/Baby/baby/mix6.png", scene);
        var splatmap = new BABYLON.Texture("http://localhost:8000/cache/ddd_godot_osm/17/62358/48541.splatmap-4chan-0_3-256.png", scene);
        //var atlas = new BABYLON.Texture("/assets/splatmap-textures-atlas.png", scene);
        var atlas = new BABYLON.Texture("https://raw.githubusercontent.com/RaggarDK/Baby/baby/atlas3.jpg", scene);
        var atlasnormals = null; // new BABYLON.Texture("/assets/splatmap-textures-atlas-normals.png", scene);
        /*
        var options = {
            numTilesHorizontal:4.0,
            numTilesVertical:4,
            numSplatTilesHorizontal:2,
            numSplatTilesVertical:2,
            splatInfos: {  // Positions is X / Y, Y grows upwards
                positions:[
                           [0.0, 3.0], [1.0, 3.0], [2.0, 3.0], [3.0, 3.0], // encoded by first splat (top left), first row (index 3 from bottom)
                           [0.0, 2.0], [1.0, 2.0], [2.0, 2.0], [3.0, 2.0], // encoded by splat (top right), second row (index 2 from bottom)
                           [0.0, 1.0], [1.0, 1.0], [2.0, 1.0], [3.0, 1.0], // encoded by third splat (down left), third row (index 1 starting from bottom)
                           [0.0, 0.0], [1.0, 0.0], [2.0, 0.0], [3.0, 0.0], // encoded by splat (down right), last row (index 0 from bottom)
                          ],
                scales:[[defScale,defScale], [defScale,defScale], [defScale,defScale], [defScale,defScale],
                         [defScale,defScale], [defScale * 0.5, defScale * 0.5], [defScale,defScale], [defScale,defScale],
                         [defScale * 1.5, defScale * 1.5], [defScale * 1.6, defScale * 1.6], [defScale,defScale], [defScale,defScale],  // Grass
                         [defScale,defScale], [defScale * 0.25, defScale * 0.25], [defScale,defScale], [defScale,defScale]]
            }
        };
        */
        this.initSplatMaterial(scene, splatmap, atlas, atlasnormals);
    }


    initSplatMaterial(scene, splatMap, atlas, atlasnormals, options) {

        var that = this;
        var defScale = 100.0;
        if (!options){
            options = {
                numTilesHorizontal: 4,
                numTilesVertical: 4,
                numSplatTilesHorizontal:2,
                numSplatTilesVertical:2,
                //tileScale:[[20.0,20.0],[20.0,20.0],[20.0,20.0]],
                splatInfos: {  // Positions is X / Y, Y grows upwards
                    layers: [
                        {'name': 'Ground', 'position': [0, 3], 'scale': [defScale, defScale], 'displScales': 1.0 },
                        // ...
                    ],
                    positions:[
                               [0.0, 3.0], [1.0, 3.0], [2.0, 3.0], [3.0, 3.0], // encoded by first splat (top left), first row (index 3 from bottom)
                               [0.0, 2.0], [1.0, 2.0], [2.0, 2.0], [3.0, 2.0], // encoded by splat (top right), second row (index 2 from bottom)
                               [0.0, 1.0], [1.0, 1.0], [2.0, 1.0], [3.0, 1.0], // encoded by third splat (down left), third row (index 1 starting from bottom)
                               [0.0, 0.0], [1.0, 0.0], [2.0, 0.0], [3.0, 0.0], // encoded by splat (down right), last row (index 0 from bottom)
                              ],
                    scales:[[defScale,defScale], [defScale,defScale], [defScale,defScale], [defScale,defScale],
                             [defScale,defScale], [defScale * 0.5, defScale * 0.5], [defScale,defScale], [defScale,defScale],
                             [defScale * 1.5, defScale * 1.5], [defScale * 1.6, defScale * 1.6], [defScale,defScale], [defScale,defScale],  // Grass
                             [defScale,defScale], [defScale * 0.25, defScale * 0.25], [defScale,defScale], [defScale,defScale]],
                    displScales: [-0.5, 0, 0, 0,
                                  0, 0, 0, 0,
                                  0, 0, 0, 0,
                                  0.2, -0.2, 0, 0,]
                }
            };
        }

        this.options = options;
        this.tileIndexes = [];
        this.shaderinjectpoint1 = '';
        this.shaderinjectpoint2 = '';
        this.shaderinjectpoint3 = '';

        // 4x4 = 16
        this.numTilesHorizontal = options.numTilesHorizontal;
        this.numTilesVertical = options.numTilesVertical;
        this.totalTiles = this.numTilesVertical*this.numTilesHorizontal;
        this.tileScale = new BABYLON.Vector2(1.0/this.numTilesHorizontal,1.0/this.numTilesVertical);

        // 2x2 = 4
        this.numSplatTilesHorizontal = options.numSplatTilesHorizontal;
        this.numSplatTilesVertical = options.numSplatTilesVertical;
        this.totalSplatTiles = this.numSplatTilesVertical * this.numSplatTilesHorizontal;
        this.splatScale = new BABYLON.Vector2(1.0/this.numSplatTilesHorizontal,1.0/this.numSplatTilesVertical);

        this.shaderinjectpoint1 += 'vec2 splatScale = vec2('+this.splatScale.x+','+this.splatScale.y+');\r\n';
        this.shaderinjectpoint1 += 'vec2 scale = vec2('+this.tileScale.x+','+this.tileScale.y+');\r\n';

        //this.shaderinjectpoint3 += 'normalW = vec3(0.0, 1.0, 0.0);\r\n';

        this.shaderinjectpoint3 += 'vec4 finalColor1 = baseColor1;\r\n';
        this.shaderinjectpoint3 += 'vec3 finalNormal1 = baseNormal1;\r\n';
        //this.shaderinjectpoint3 += 'finalColor1.a = 0.01;\r\n';

        var v = 0.0, h = 0.0;
        for (let i=0; i < this.totalTiles; i++){

            var tpos = Math.floor(i / 4);
            h = tpos % this.numSplatTilesHorizontal;
            v = (this.numSplatTilesHorizontal - 1) - Math.floor(tpos / this.numSplatTilesHorizontal);

            if (i < this.totalTiles-1) {
                 this.shaderinjectpoint3 += (`
                     `+ '//vec4 finalColor' + (i + 2) + ' = finalColor' + (i + 1) + '.a >= baseColor' + (i + 2) + '.a ? finalColor' + (i + 1) + ' : baseColor' + (i + 2) + `;
                     `+ '//vec4 finalColor' + (i + 2) + ' = finalColor' + (i + 1) + ' * (1.0 - baseColor' + (i + 2) + '.a) + baseColor' + (i + 2) + ' * baseColor' + (i + 2) + `.a;

                     `+ 'vec4 finalColor' + (i + 2) + ' = blend(finalColor' + (i + 1) + ', ' + this.options.splatInfos.displScales[i].toFixed(5) + ', baseColor' + (i + 2) + ', ' + this.options.splatInfos.displScales[i + 1].toFixed(5) + '); ' + `

                     //finalColor` + (i + 2) + `.a *= 0.95;



                     vec3 finalNormal` + (i + 2) + ' = finalColor' + (i + 1) + '.a >= baseColor' + (i + 2) + '.a ? finalNormal' + (i + 1) + ' : baseNormal' + (i + 2) + `;
                 `);
            }

            // Get basecolors from tiles
            this.shaderinjectpoint2 += 'vec2 uv' + (i + 1) + ' = vec2((vAlbedoUV.x + '+h+'.0) * splatScale.x, (vAlbedoUV.y + '+v+'.0) * splatScale.y);\r\n';
            this.shaderinjectpoint2 += 'mat4 chanInfo' + (i + 1) +' = colInfo(vAlbedoUV, uv' + (i + 1) + ', vec2('+this.options.splatInfos.scales[i][0]+','+this.options.splatInfos.scales[i][1]+'), vec2('+this.options.splatInfos.positions[i][0] + ','+this.options.splatInfos.positions[i][1]+'), ' + (i % 4) + ', scale, splatmap, albedoSampler, atlasNormalsSampler);\r\n';
            //this.shaderinjectpoint2 += 'vec4 baseColor' + (i + 1) +' = col(vAlbedoUV, uv' + (i + 1) + ', vec2('+this.options.splatInfos.scales[i][0]+','+this.options.splatInfos.scales[i][1]+'), vec2('+this.options.splatInfos.positions[i][0] + ','+this.options.splatInfos.positions[i][1]+'), ' + (i % 4) + ', scale, splatmap, albedoSampler, bumpSampler);\r\n';
            this.shaderinjectpoint2 += 'vec4 baseColor' + (i + 1) +' = chanInfo' + (i + 1) + '[0];\r\n';
            this.shaderinjectpoint2 += 'vec3 baseNormal' + (i + 1) +' = vec3(chanInfo' + (i + 1) + '[1].x, chanInfo' + (i + 1) + '[1].y, chanInfo' + (i + 1) + '[1].z);\r\n';

        }

        //this.shaderinjectpoint3 += 'finalColor16 = col(vAlbedoUV, uv16, vec2(20.0, 20.0), vec2(1.0, 2.0), 0, scale, splatmap, albedoSampler);';

        //this.shaderinjectpoint3 += 'normalW = perturbNormal(cotangentFrame, finalNormal' + (this.totalTiles) + ', 1.0);';
        this.shaderinjectpoint3 += 'normalW = normalW + finalNormal' + (this.totalTiles) + ';';  // TODO: adding these vectors is incorrect
        //this.shaderinjectpoint3 += 'normalW.y *= -1.0;';

        //this.shaderinjectpoint3 += 'result = finalNormal' + (this.totalTiles) + ';';
        this.shaderinjectpoint3 += 'result = finalColor' + (this.totalTiles) + '.rgb;';

        this.splatMap = splatMap;

        this.needsUpdating = true;

        this.material = new BABYLONMAT.PBRCustomMaterial("splatMaterial", scene);
        this.material.metallic = 0.1;
        this.material.roughness = 0.95;
        //this.material.twoSidedLighting = true;
        //this.material.disableLighting = false;
        //this.material.ambientColor = new BABYLON.Color3(1.0, 0.0, 0.0); // BABYLON.Color3.Black();
        //this.material.disableBumpMap = true;
        //this.material.specularColor = new BABYLON.Color3(0.15, 0.15, 0.15); // BABYLON.Color3.Black();
        //this.material.emissiveColor = new BABYLON.Color3(0.0, 0.0, 0.0); // BABYLON.Color3.Black();
        //this.material.emissiveIntensity = 0.0;
        //this.material.usePhysicalLightFalloff = false;
        this.material.environmentIntensity = 0.1;  // This one is needed to avoid saturation due to env


        this.material.albedoTexture = atlas;
        if (atlasnormals !== null) {
            //this.material.bumpTexture = atlasnormals;
            this.atlasBumpTexture = atlasnormals;
        }
        this.material.AddUniform('splatmap','sampler2D');
        this.material.AddUniform('atlasNormalsSampler','sampler2D');


        this.material.Fragment_Begin(
             "precision highp float;\r\n"
            +"precision highp int;\r\n"

            +this.shaderinjectpoint1

            +`
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
                float a1 = texture1.a + displScale1;
                float a2 = texture2.a + displScale2;
                float depth = 0.2;
                float ma = max(texture1.a + a1, texture2.a + a2) - depth;

                float b1 = max(texture1.a + a1 - ma, 0.0);
                float b2 = max(texture2.a + a2 - ma, 0.0);

                vec4 result = (texture1 * b1 + texture2 * b2) / (b1 + b2);
                //result.a = (a1 + a2) / (2.0 * (b1 + b2));
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
                int OCTAVES = 5;
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
            +"mat4 colInfo(vec2 vAlbedoUV, vec2 uvT, vec2 tile1Scale, vec2 tile1Position, int chanIdx, vec2 scale, sampler2D splatmap, sampler2D atlas, sampler2D atlasNormals) {"

                + `
                vec2 offset = vec2(perlinNoise2D(uvT.x + 0.1 * tile1Position.x, uvT.y + 0.1 * tile1Position.y),
                                   perlinNoise2D(uvT.x + 0.12 * tile1Position.y + 0.1231412, -uvT.y + 0.1 * tile1Position.x + 0.231783));

                //vAlbedoUV = vAlbedoUV + offset * 0.2;  // Careful, used in UV, not only in Splat uvT
                `

                +'vec2 scaledUv1 = fract((vAlbedoUV + offset * 0.3) * tile1Scale);'  // Curvy antitiling factor
                +'scaledUv1 = scaledUv1 * (254.0/256.0) + vec2(1.0 / 256.0, 1.0 / 256.0);'
                +'vec2 uv1 = vec2((scaledUv1.x + tile1Position.x) * scale.x, (scaledUv1.y + tile1Position.y) * scale.y);'

                +'vec4 splatColor1 = texture2D(splatmap, uvT);\r\n'

                /*

                + offset * (1.0 / 225.0)

                +'vec2 scaledUv2 = fract((vAlbedoUV - offset * 0.15) * tile2Scale);'
                +'vec2 uv2 = vec2((scaledUv2.x + tile2Position.x) * scale.x, (scaledUv2.y * scale.y) + tile2Position.y * scale.y);'

                +'vec2 scaledUv3 = fract((vAlbedoUV - offset * 0.25) * tile3Scale);'
                +'vec2 uv3 = vec2((scaledUv3.x + tile3Position.x) * scale.x, (scaledUv3.y * scale.y) + tile3Position.y * scale.y);'
                */

                +'vec4 diffuse1Color = texture2D(atlas, uv1);\r\n'
                //+'vec4 diffuse1Color = texture2DLodEXT(atlas, uv1, -1.0);\r\n'
                +'vec4 diffuse1Normal = texture2D(atlasNormals, uv1) * 2.0 - 1.0;\r\n'


                //+'vec4 diffuse2Color = texture2D(atlas, uv2);\r\n'
                //+'vec4 diffuse3Color = texture2D(atlas, uv3);\r\n'
                //+'diffuse1Color.rgb *= (splatColor1.r + splatColor1.g);\r\n'

                //+'diffuse2Color.rgb = mix(diffuse1Color.rgb * 0.5, diffuse2Color.rgb * 0.5, baseColor1.b);\r\n'
                //+'baseColor1.rgb = mix(diffuse2Color.rgb * 0.5, diffuse3Color.rgb * 0.5, baseColor1.a);'

                + (`
                //diffuse2Color.rgb = ((diffuse1Color.r + diffuse1Color.g + diffuse1Color.b) / 3.) * baseColor1.b > ((diffuse1Color.r + diffuse1Color.g + diffuse1Color.b) / 3.) ?  diffuse2Color.rgb : diffuse1Color.rgb;
                //baseColor1.rgb = ((diffuse3Color.r + diffuse3Color.g + diffuse3Color.b) / 3.) * baseColor1.a > ((diffuse2Color.r + diffuse2Color.g + diffuse2Color.b) / 3.) ?  mix(diffuse2Color.rgb * 0.5, diffuse3Color.rgb * 0.5, baseColor1.a) : diffuse2Color.rgb;

                float blend = (chanIdx == 0 ? splatColor1.r : (chanIdx == 1 ? splatColor1.g : (chanIdx == 2 ? splatColor1.b : splatColor1.a)));
                //blend = 1.0;

                //diffuse1Color.rgb = splatColor1.rgb;
                //diffuse1Color.a = blend;

                 diffuse1Color.a = ((blend > 0.0) ? (heightval(diffuse1Color) + blend) : 0.0);

                 mat4 chanInfo = mat4(diffuse1Color, vec4(diffuse1Normal.x, diffuse1Normal.y, diffuse1Normal.z, 0.0), vec4(0.0), vec4(0.0));

                `)

                //+"return diffuse1Color;"
                +"return chanInfo;"
            +"}"
        );

        this.material.Fragment_MainBegin(
            this.shaderinjectpoint2
        );

        this.material.Fragment_Custom_Albedo(
            this.shaderinjectpoint3
        );

        this.material.onBindObservable.add(function () {
            that.update();
        });

        return this.material;
    }

    update = function(){
        this.material.getEffect().setTexture('splatmap', this.splatMap);
        this.material.getEffect().setTexture('atlasNormalsSampler', this.atlasBumpTexture);
    }

}

export default TerrainMaterialWrapper;
