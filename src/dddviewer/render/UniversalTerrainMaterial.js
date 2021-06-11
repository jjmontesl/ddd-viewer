/**
 * Babylon universal terrain material pro class
 * @class UniversalTerrainMaterial
 * From: https://forum.babylonjs.com/t/pbrcustommaterial-or-pbrmaterial-with-custom-albedo-and-normal/20027/7
 */

import * as BABYLON from 'babylonjs';
import {UniversalAlbedoMaterial} from 'babylonjs';
import 'babylonjs-loaders';


class UniversalTerrainMaterial extends UniversalAlbedoMaterial {

    constructor(name, scene) {
        UniversalAlbedoMaterial.super(name, scene);
        this.enableShaderChunks = true;
    }

    getClassName() {
        return "UniversalTerrainMaterial";
    }

    getShaderName() {
        return "pbr";
    }

    getShaderChunk() {
        return null;
    }

    updateShaderChunks() {
        const colorName = "surfaceAlbedo";
        const splatmapSampler = "splatmapSampler";
        const detailsSampler = "detailsSampler";
        const normalsSampler = "normalsSampler";
        const colorCorrection = BABYLON.System.ToLinearSpace;
        // ..
        // Vertex Shader Chunks
        // ..
        if (this.materialShaderChunks.Vertex_Definitions !== null && this.materialShaderChunks.Vertex_Definitions !== "") {
            this.materialShaderChunks.Vertex_Definitions = this.formatTerrainVertexDefintions() + this.materialShaderChunks.Vertex_Definitions;
        } else {
            this.materialShaderChunks.Vertex_Definitions = this.formatTerrainVertexDefintions();
        }
        if (this.materialShaderChunks.Vertex_MainEnd !== null && this.materialShaderChunks.Vertex_MainEnd !== "") {
            this.materialShaderChunks.Vertex_MainEnd = this.formatTerrainVertexMainEnd() + this.materialShaderChunks.Vertex_MainEnd;
        } else {
            this.materialShaderChunks.Vertex_MainEnd = this.formatTerrainVertexMainEnd();
        }
        // ..
        // Fragment Shader Chunks
        // ..
        if (this.materialShaderChunks.Fragment_Definitions !== null && this.materialShaderChunks.Fragment_Definitions !== "") {
            this.materialShaderChunks.Fragment_Definitions = this.formatTerrainFragmentDefintions(splatmapSampler, detailsSampler, normalsSampler) + this.materialShaderChunks.Fragment_Definitions;
        } else {
            this.materialShaderChunks.Fragment_Definitions = this.formatTerrainFragmentDefintions(splatmapSampler, detailsSampler, normalsSampler);
        }
        if (this.materialShaderChunks.Fragment_Custom_Albedo !== null && this.materialShaderChunks.Fragment_Custom_Albedo !== "") {
            this.materialShaderChunks.Fragment_Custom_Albedo = this.formatTerrainFragmentUpdateColor(this.terrainInfo, colorName, splatmapSampler, detailsSampler, normalsSampler, colorCorrection) + this.materialShaderChunks.Fragment_Custom_Albedo;
        } else {
            this.materialShaderChunks.Fragment_Custom_Albedo = this.formatTerrainFragmentUpdateColor(this.terrainInfo, colorName, splatmapSampler, detailsSampler, normalsSampler, colorCorrection);
        }
    }
    formatTerrainVertexDefintions() {
        return ("\r\n#define TERRAIN_VERTEX_DEFINITIONS\r\n\r\n"
        + "varying vec2 vSplatmapUV;\r\n"
        + "\r\n");
    }
    formatTerrainVertexMainEnd() {
        return ("\r\n#define TERRAIN_VERTEX_MAIN_END\r\n\r\n"
        + "#ifdef UV1\r\n"
        + "vSplatmapUV = uv;\r\n"
        + "#endif\r\n"
        + "\r\n");
    }
    formatTerrainFragmentDefintions(splatmapSampler, detailsSampler, normalsSampler) {
        return ("\r\n#define TERRAIN_FRAGMENT_DEFNITIONS\r\n\r\n"
        + "varying vec2 vSplatmapUV;\r\n"
        + "uniform sampler2D " + splatmapSampler + ";\r\n"
        + "uniform sampler2D " + detailsSampler + ";\r\n"
        + "uniform sampler2D " + normalsSampler + ";\r\n"
        + "\r\n"
        + "float calculateMipmapLevel(const in vec2 uvs, const in vec2 size)\r\n"
        + "{\r\n"
        + "    vec2 dx = dFdx(uvs * size.x);\r\n"
        + "    vec2 dy = dFdy(uvs * size.y);\r\n"
        + "    float d = max(dot(dx, dx), dot(dy, dy));\r\n"
        + "    return 0.4 * log2(d);\r\n"
        + "}\r\n"
        + "\r\n"
        + "vec4 sampleTextureAtlas2D(const in sampler2D atlas, const in float gamma, const in vec2 tile, const in vec4 rect, in vec2 uvs, in float lod)\r\n"
        + "{\r\n"
        + "    if (lod < 0.0) lod = clamp(calculateMipmapLevel(uvs, vec2(tile.x, tile.x)), 0.0, tile.y);   // Tile Info (tile.xy)\r\n"
        + "    float size = pow(2.0, tile.y - lod);                                                        // Tile Bits (tile.y)\r\n"
        + "    float sizex = size / rect.z;                                                                // Tile Width (rect.z)\r\n"
        + "    float sizey = size / rect.w;                                                                // Tile Height (rect.w)\r\n"
        + "    uvs = fract(uvs);                                                                           // Perfrom Tiling (fract)\r\n"
        + "    uvs.x = uvs.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;           // Tile Position X (rect.x)\r\n"
        + "    uvs.y = uvs.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;           // Tile Position Y (rect.y)\r\n"
        + "    vec4 color = texture2DLodEXT(atlas, uvs, lod);\r\n"
        + "    if (gamma !== 1.0) {\r\n"
        + "        color.r = pow(color.r, gamma);\r\n"
        + "        color.g = pow(color.g, gamma);\r\n"
        + "        color.b = pow(color.b, gamma);\r\n"
        + "    }\r\n"
        + "    return color;\r\n"
        + "}\r\n"
        + "\r\n"
        + "vec4 sampleSplatmapAtlas2D(const in sampler2D atlas, const in vec2 tile, const in vec4 rect, in vec2 uvs)\r\n"
        + "{\r\n"
        + "    float size = pow(2.0, tile.y);                                                              // Tile Bits (tile.y)\r\n"
        + "	   float sizex = size / rect.z;                                                                // Tile Width (rect.z)\r\n"
        + "	   float sizey = size / rect.w;                                                                // Tile Height (rect.w)\r\n"
        + "	   uvs.x = uvs.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;           // Tile Position X (rect.x)\r\n"
        + "	   uvs.y = uvs.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;           // Tile Position Y (rect.y)\r\n"
        + "    return texture2D(atlas, uvs);\r\n"
        + "}\r\n"
        + "\r\n"
        + "vec3 blendSplatmapAtlasColors(const in vec4 splatmap, in vec4 color1, in vec4 color2, in vec4 color3, in vec4 color4, in vec3 mixbuffer)\r\n"
        + "{\r\n"
        + "    vec3 buffer1 = mix(mixbuffer, color1.rgb, splatmap.r);\r\n"
        + "    vec3 buffer2 = mix(buffer1, color2.rgb, splatmap.g);\r\n"
        + "    vec3 buffer3 = mix(buffer2, color3.rgb, splatmap.b);\r\n"
        + "    return mix(buffer3, color4.rgb, splatmap.a);\r\n"
        + "}\r\n"
        + "\r\n"
        + "vec3 perturbNormalSamplerColor(mat3 cotangentFrame, vec3 samplerColor, float scale)\r\n"
        + "{\r\n"
        + "    vec3 map = samplerColor.xyz;\r\n"
        + "    map = map * 2.00787402 - 1.00787402;\r\n"
        + "    #ifdef NORMALXYSCALE\r\n"
        + "        map = normalize(map * vec3(scale, scale, 1.0));\r\n"
        + "    #endif\r\n"
        + "    return normalize(cotangentFrame * map);\r\n"
        + "}\r\n"
        + "\r\n"
        + "\r\n");
    }
    formatTerrainFragmentUpdateColor(terrainInfo, colorName, splatmapSampler, detailsSampler, normalsSampler, colorCorrection = 1.0) {
        let result = "";
        if (terrainInfo !== null && terrainInfo.textureAtlas !== null && terrainInfo.splatmapAtlas !== null && terrainInfo.splatmapCount > 0) {
            result = ("\r\n#define TERRAIN_FRAGMENT_UPDATE_COLOR\r\n\r\n"
            + "vec3 normalsColor = vec3(0.5, 0.5, 1.0);\r\n"
            + "vec3 normalsBuffer = normalW.rgb;\r\n"
            + "vec3 splatmapBuffer = " + colorName + ".rgb;\r\n"
            + "float autoMipMapLevel = -1.0;\r\n"
            + "float normalCorrection = 1.0;\r\n"
            + "float detailCorrection = " + colorCorrection.toFixed(4) + ";\r\n"
            + "\r\n"
            + "#if defined(ALBEDO) && defined(" + splatmapSampler.toUpperCase() + ") && defined(" + detailsSampler.toUpperCase() + ")\r\n"
            + "\r\n"
            + "// Reset Normal Values\r\n"
            + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
            + "    uvOffset = vec2(0.0, 0.0);\r\n"
            + "    #ifdef NORMAL\r\n"
            + "        normalW = normalize(vNormalW);\r\n"
            + "    #else\r\n"
            + "        normalW = normalize(cross(dFdx(vPositionW), dFdy(vPositionW))) * vEyePosition.w;\r\n"
            + "    #endif\r\n"
            + "    #ifdef CLEARCOAT\r\n"
            + "        clearCoatNormalW = normalW;\r\n"
            + "    #endif\r\n"
            + "    #if defined(BUMP) || defined(PARALLAX)\r\n"
            + "        #if defined(TANGENT) && defined(NORMAL)\r\n"
            + "            TBN = vTBN;\r\n"
            + "        #else\r\n"
            + "            TBN = cotangent_frame(normalW, vPositionW, vSplatmapUV);\r\n"
            + "        #endif\r\n"
            + "    #elif defined(ANISOTROPIC)\r\n"
            + "        #if defined(TANGENT) && defined(NORMAL)\r\n"
            + "            TBN = vTBN;\r\n"
            + "        #else\r\n"
            + "            TBN = cotangent_frame(normalW, vPositionW, vSplatmapUV, vec2(1.0, 1.0));\r\n"
            + "        #endif\r\n"
            + "    #endif\r\n"
            + "    #ifdef PARALLAX\r\n"
            + "        invTBN = transposeMat3(TBN);\r\n"
            + "    #endif\r\n"
            + "    normalW = perturbNormalSamplerColor(TBN, normalsColor, 1.0);\r\n"
            + "#endif\r\n"
            + "\r\n"
            + "// Global Atlas Values\r\n"
            + "float splatTileSize = " + terrainInfo.splatmapAtlas[2].toFixed(4) + ";\r\n"
            + "float splatTileBits = " + terrainInfo.splatmapAtlas[3].toFixed(4) + ";\r\n"
            + "float detailTileSize = " + terrainInfo.textureAtlas[2].toFixed(4) + ";\r\n"
            + "float detailTileBits = " + terrainInfo.textureAtlas[3].toFixed(4) + ";\r\n"
            + "\r\n"
            + "// Sample splatmap textures\r\n");
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Sample Each Splatmap Textures
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            let counter = 0;
            for (let index = 0; index < terrainInfo.splatmapCount; index++) {
                counter = (index * 4);
                const splatmapRect = terrainInfo["splatmapRect" + index];
                result += "vec4 splatmapRect" + index + " = vec4(" + splatmapRect[0].toFixed(4) + ", " + splatmapRect[1].toFixed(4) + ", " + splatmapRect[2].toFixed(4) + ", " + splatmapRect[3].toFixed(4) + ");\r\n";
                result += "vec4 splatmapAlbedo" + index + " = sampleSplatmapAtlas2D(" + splatmapSampler + ", vec2(splatTileSize, splatTileBits), splatmapRect" + index + ", (vSplatmapUV + uvOffset));\r\n";
                result += "vec4 textureAlbedo" + (counter + 0) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "vec4 textureAlbedo" + (counter + 1) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "vec4 textureAlbedo" + (counter + 2) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "vec4 textureAlbedo" + (counter + 3) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                if (terrainInfo["textureRect" + (counter + 0)])
                {
                    const textureRect = terrainInfo["textureRect" + (counter + 0)];
                    const textureInfo = terrainInfo["textureInfo" + (counter + 0)];
                    result += "vec4 textureRect" + (counter + 0) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureScale" + (counter + 0) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
                    result += "vec2 textureOffset" + (counter + 0) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureTileUV" + (counter + 0) + " = ((vSplatmapUV + textureOffset" + (counter + 0) + ") * textureScale" + (counter + 0) + ");\r\n";
                    result += "textureAlbedo" + (counter + 0) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 1)])
                {
                    const textureRect = terrainInfo["textureRect" + (counter + 1)];
                    const textureInfo = terrainInfo["textureInfo" + (counter + 1)];
                    result += "vec4 textureRect" + (counter + 1) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureScale" + (counter + 1) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
                    result += "vec2 textureOffset" + (counter + 1) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureTileUV" + (counter + 1) + " = ((vSplatmapUV + textureOffset" + (counter + 1) + ") * textureScale" + (counter + 1) + ");\r\n";
                    result += "textureAlbedo" + (counter + 1) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 2)])
                {
                    const textureRect = terrainInfo["textureRect" + (counter + 2)];
                    const textureInfo = terrainInfo["textureInfo" + (counter + 2)];
                    result += "vec4 textureRect" + (counter + 2) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureScale" + (counter + 2) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
                    result += "vec2 textureOffset" + (counter + 2) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureTileUV" + (counter + 2) + " = ((vSplatmapUV + textureOffset" + (counter + 2) + ") * textureScale" + (counter + 2) + ");\r\n";
                    result += "textureAlbedo" + (counter + 2) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 3)])
                {
                    const textureRect = terrainInfo["textureRect" + (counter + 3)];
                    const textureInfo = terrainInfo["textureInfo" + (counter + 3)];
                    result += "vec4 textureRect" + (counter + 3) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureScale" + (counter + 3) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
                    result += "vec2 textureOffset" + (counter + 3) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
                    result += "vec2 textureTileUV" + (counter + 3) + " = ((vSplatmapUV + textureOffset" + (counter + 3) + ") * textureScale" + (counter + 3) + ");\r\n";
                    result += "textureAlbedo" + (counter + 3) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
                }
                result += "splatmapBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", textureAlbedo" + (counter + 0) + ", textureAlbedo" + (counter + 1) + ", textureAlbedo" + (counter + 2) + ", textureAlbedo" + (counter + 3) + ", splatmapBuffer);\r\n";
                result += "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n";
                result += "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n";
                result += "        vec4 normalColor" + (counter + 0) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "        vec4 normalColor" + (counter + 1) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "        vec4 normalColor" + (counter + 2) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                result += "        vec4 normalColor" + (counter + 3) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
                if (terrainInfo["textureRect" + (counter + 0)])
                {
                    const normalScale = terrainInfo["normalsScale" + (counter + 0)];
                    result += "        float normalScale" + (counter + 0) + " = " + normalScale.toFixed(4) + ";\r\n";
                    result += "        normalColor" + (counter + 0) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
                    result += "        normalColor" + (counter + 0) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 0) + ".rgb, normalScale" + (counter + 0) + ");\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 1)])
                {
                    const normalScale = terrainInfo["normalsScale" + (counter + 1)];
                    result += "        float normalScale" + (counter + 1) + " = " + normalScale.toFixed(4) + ";\r\n";
                    result += "        normalColor" + (counter + 1) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
                    result += "        normalColor" + (counter + 1) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 1) + ".rgb, normalScale" + (counter + 1) + ");\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 2)])
                {
                    const normalScale = terrainInfo["normalsScale" + (counter + 2)];
                    result += "        float normalScale" + (counter + 2) + " = " + normalScale.toFixed(4) + ";\r\n";
                    result += "        normalColor" + (counter + 2) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
                    result += "        normalColor" + (counter + 2) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 2) + ".rgb, normalScale" + (counter + 2) + ");\r\n";
                }
                if (terrainInfo["textureRect" + (counter + 3)])
                {
                    const normalScale = terrainInfo["normalsScale" + (counter + 3)];
                    result += "        float normalScale" + (counter + 3) + " = " + normalScale.toFixed(4) + ";\r\n";
                    result += "        normalColor" + (counter + 3) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
                    result += "        normalColor" + (counter + 3) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 3) + ".rgb, normalScale" + (counter + 3) + ");\r\n";
                }
                result += "        normalsBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", normalColor" + (counter + 0) + ", normalColor" + (counter + 1) + ", normalColor" + (counter + 2) + ", normalColor" + (counter + 3) + ", normalsBuffer);\r\n";
                result += "    #endif\r\n";
                result += "#endif\r\n";
                result += "\r\n";
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            result += ("// Update Color Values\r\n"
            + colorName + ".rgb = splatmapBuffer.rgb;\r\n"
            + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
            + "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n"
            + "        normalW.rgb = normalsBuffer.rgb;\r\n"
            + "    #endif\r\n"
            + "    #if defined(FORCENORMALFORWARD) && defined(NORMAL)\r\n"
            + "        vec3 faceNormal = normalize(cross(dFdx(vPositionW), dFdy(vPositionW))) * vEyePosition.w;\r\n"
            + "        #if defined(TWOSIDEDLIGHTING)\r\n"
            + "            faceNormal = gl_FrontFacing ? faceNormal : -faceNormal;\r\n"
            + "        #endif\r\n"
            + "        normalW *= sign(dot(normalW, faceNormal));\r\n"
            + "    #endif\r\n"
            + "    #if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\r\n"
            + "        normalW = gl_FrontFacing ? normalW : -normalW;\r\n"
            + "    #endif\r\n"
            + "#endif\r\n"
            + "\r\n"
            + "#endif\r\n"
            + "\r\n");
        }
        return result;
    }
}

export default UniversalTerrainMaterial;
