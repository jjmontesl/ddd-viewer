/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../dist/ddd-viewer.esm.js":
/*!************************************!*\
  !*** ../../dist/ddd-viewer.esm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationProcess": () => (/* binding */ AnimationProcess),
/* harmony export */   "Base3DLayer": () => (/* binding */ Base3DLayer),
/* harmony export */   "CameraMovementAnimationProcess": () => (/* binding */ CameraMovementAnimationProcess),
/* harmony export */   "DDDMaterialsConfig": () => (/* binding */ DDDMaterialsConfig),
/* harmony export */   "DDDViewerConfig": () => (/* binding */ DDDViewerConfig),
/* harmony export */   "DateTimeAnimationProcess": () => (/* binding */ DateTimeAnimationProcess),
/* harmony export */   "GeoTile3DLayer": () => (/* binding */ GeoTile3DLayer),
/* harmony export */   "LayerManager": () => (/* binding */ LayerManager),
/* harmony export */   "QueueLoader": () => (/* binding */ QueueLoader),
/* harmony export */   "ScenePosition": () => (/* binding */ ScenePosition),
/* harmony export */   "SceneViewer": () => (/* binding */ SceneViewer),
/* harmony export */   "SkyMaterialWrapper": () => (/* binding */ SkyMaterialWrapper),
/* harmony export */   "TerrainMaterialWrapper": () => (/* binding */ TerrainMaterialWrapper),
/* harmony export */   "TextAnimationProcess": () => (/* binding */ TextAnimationProcess),
/* harmony export */   "ViewerProcess": () => (/* binding */ ViewerProcess),
/* harmony export */   "ViewerProcessManager": () => (/* binding */ ViewerProcessManager),
/* harmony export */   "ViewerSequencer": () => (/* binding */ ViewerSequencer),
/* harmony export */   "ViewerState": () => (/* binding */ ViewerState)
/* harmony export */ });
/* harmony import */ var _babylonjs_loaders_glTF__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/loaders/glTF */ "../../node_modules/@babylonjs/loaders/glTF/index.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/core */ "../../node_modules/@babylonjs/core/index.js");
/* harmony import */ var _babylonjs_materials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/materials */ "../../node_modules/@babylonjs/materials/index.js");
/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/extent */ "../../node_modules/ol/extent.js");
/* harmony import */ var ol_tilegrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/tilegrid */ "../../node_modules/ol/tilegrid.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj */ "../../node_modules/ol/proj.js");
/* harmony import */ var proj4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! proj4 */ "../../node_modules/proj4/lib/index.js");







/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

var DDDViewerConfig = function DDDViewerConfig() {
  this.tileUrlBase = "/data/tiles/";
  this.sceneMaterials = [];
};

var DDDMaterialsConfig = function DDDMaterialsConfig() {};
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

/**
 * ScenePosition represents
 */


var ScenePosition = function ScenePosition() {
  this.positionWGS84 = [0, 0, 0];
  this.positionTileZoomLevel = 0;
  this.positionGroundHeight = 0;
  this.positionHeading = 0;
  this.positionTilt = 0;
};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var LayerManager = /*#__PURE__*/function () {
  function LayerManager(sceneViewer) {
    this.sceneViewer = sceneViewer;
    this.layers = {};
  }

  var _proto = LayerManager.prototype;

  _proto.update = function update(deltaTime) {
    for (var key in this.layers) {
      // Load tiles dynamically as needed
      this.layers[key].update(deltaTime);
    }
  };

  _proto.addLayer = function addLayer(key, layer) {
    layer.layerManager = this;
    this.layers[key] = layer;
  };

  return LayerManager;
}();
/* eslint-disable @typescript-eslint/no-explicit-any */


var QueueLoader = /*#__PURE__*/function () {
  function QueueLoader(sceneViewer) {
    this.concurrentTasks = 2; // 1 on mobile? 2 on PC?

    this.sceneViewer = sceneViewer;
    this.queue = [];
    this.current = [];
  }

  var _proto = QueueLoader.prototype;

  _proto.update = function update() {//loadNext();
  };

  _proto.processNext = function processNext() {
    if (this.queue.length < 1) {
      return;
    }

    var task = this.queue.pop();
    this.processTask(task);
  };

  _proto.enqueueLoadModel = function enqueueLoadModel(url, onSuccess, onFailure) {
    var task = {
      "url": url,
      "onSuccess": onSuccess,
      "onFailure": onFailure
    };
    this.queue.push(task);

    if (this.current.length < this.concurrentTasks) {
      this.processNext();
    }
  };

  _proto.processTask = function processTask(task) {
    var _this = this;

    var url = task["url"];
    _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.SceneLoader.ImportMesh(null, "", url, this.sceneViewer.scene, function (newMeshes, particleSystems, skeletons) {
      _this.processNext();

      task.onSuccess(newMeshes, particleSystems, skeletons);
    }, function () {}, function (scene, msg, ex) {
      task.onFailure(scene, msg, ex);

      _this.processNext();
    });
  };

  return QueueLoader;
}();
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


var ViewerProcessManager = /*#__PURE__*/function () {
  function ViewerProcessManager(sceneViewer) {
    this.playing = true;
    this.currentTasks = [];
    this.time = 0.0;
    this.sceneViewer = sceneViewer;
    this.currentProcesses = [];
  }

  var _proto = ViewerProcessManager.prototype;

  _proto.update = function update(deltaTime) {
    if (!this.playing) {
      return;
    }

    this.time += deltaTime; // Update all current tasks

    for (var _iterator = _createForOfIteratorHelperLoose(this.currentProcesses), _step; !(_step = _iterator()).done;) {
      var proc = _step.value;
      proc.update(deltaTime);
    } // Remove finished steps


    this.currentProcesses = this.currentProcesses.filter(function (item) {
      return item.finished;
    });
  };

  _proto.add = function add(process) {
    //console.debug("Adding process: ", process);
    // Sanity check
    if (process.sceneViewer != this.sceneViewer) {
      throw new Error("");
    }

    this.currentProcesses.push(process);
  };

  _proto.remove = function remove(process) {
    //console.debug("Removing process: ", process);
    this.currentProcesses = this.currentProcesses.filter(function (item) {
      return item !== process;
    });
  };

  return ViewerProcessManager;
}();
/* eslint-disable object-curly-spacing */

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

/**
 * From: https://forum.babylonjs.com/t/pbr-texture-splatting-up-to-64-textures/1994/28
 *  and: https://www.babylonjs-playground.com/#LIVRIY#58
 */


var TerrainMaterialWrapper = /*#__PURE__*/function () {
  function TerrainMaterialWrapper(sceneViewer, splatmapTexture, atlasTexture, atlasNormalTexture, options) {
    this.tileIndexes = [];
    this.shaderinjectpoint1 = "";
    this.shaderinjectpoint2 = "";
    this.shaderinjectpoint3 = "";
    this.shaderinjectpoint4 = "";
    this.numTilesHorizontal = 0;
    this.numTilesVertical = 0;
    this.totalTiles = 0;
    this.tileScale = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector2(1, 1);
    this.numSplatTilesHorizontal = 0;
    this.numSplatTilesVertical = 0;
    this.totalSplatTiles = 0;
    this.splatScale = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector2(1, 1);
    this.splatMap = null;
    this.atlasBumpTexture = null;
    this.sceneViewer = sceneViewer;
    this.dedupDouble = false;
    this.material = this.initSplatMaterial(this.sceneViewer.scene, splatmapTexture, atlasTexture, atlasNormalTexture, options); //this.testSplatMaterial(scene);
  }

  var _proto = TerrainMaterialWrapper.prototype;

  _proto.initSplatMaterial = function initSplatMaterial(scene, splatMap, atlas, atlasnormals, options) {
    var _this = this; //var that = this;


    var defScale = 100.0;

    if (!options) {
      options = {
        numTilesHorizontal: 4,
        numTilesVertical: 4,
        numSplatTilesHorizontal: 2,
        numSplatTilesVertical: 2,
        //tileScale:[[20.0,20.0],[20.0,20.0],[20.0,20.0]],
        splatInfos: {
          layers: [{
            "name": "Ground",
            "position": [0, 3],
            "scale": [defScale, defScale],
            "displScales": 1.0
          }],
          positions: [[0.0, 3.0], [1.0, 3.0], [2.0, 3.0], [3.0, 3.0], [0.0, 2.0], [1.0, 2.0], [2.0, 2.0], [3.0, 2.0], [0.0, 1.0], [1.0, 1.0], [2.0, 1.0], [3.0, 1.0], [0.0, 0.0], [1.0, 0.0], [2.0, 0.0], [3.0, 0.0]],
          scales: [[defScale * 0.75, defScale * 0.75], [defScale, defScale], [defScale, defScale], [defScale * 0.5, defScale * 0.5], [defScale * 0.5, defScale * 0.5], [defScale * 0.5, defScale * 0.5], [defScale, defScale], [defScale, defScale], [defScale * 1.5, defScale * 1.5], [defScale * 1.6, defScale * 1.6], [defScale, defScale], [defScale, defScale], [defScale, defScale], [defScale * 0.25, defScale * 0.25], [defScale * 0.25, defScale * 0.25], [defScale, defScale]],
          displScales: [0.0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0],
          dedupScales: [1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 0.5, 1.5]
        }
      };
    }

    this.options = options;
    this.tileIndexes = [];
    this.shaderinjectpoint1 = "";
    this.shaderinjectpoint2 = "";
    this.shaderinjectpoint3 = "";
    this.shaderinjectpoint4 = ""; // 4x4 = 16

    this.numTilesHorizontal = options.numTilesHorizontal;
    this.numTilesVertical = options.numTilesVertical;
    this.totalTiles = this.numTilesVertical * this.numTilesHorizontal;
    this.tileScale = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector2(1.0 / this.numTilesHorizontal, 1.0 / this.numTilesVertical); // 2x2 = 4

    this.numSplatTilesHorizontal = options.numSplatTilesHorizontal;
    this.numSplatTilesVertical = options.numSplatTilesVertical;
    this.totalSplatTiles = this.numSplatTilesVertical * this.numSplatTilesHorizontal;
    this.splatScale = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector2(1.0 / this.numSplatTilesHorizontal, 1.0 / this.numSplatTilesVertical);
    this.shaderinjectpoint1 += "vec2 splatScale = vec2(" + this.splatScale.x + "," + this.splatScale.y + ");\r\n";
    this.shaderinjectpoint1 += "vec2 scale = vec2(" + this.tileScale.x + "," + this.tileScale.y + ");\r\n"; //this.shaderinjectpoint3 += 'normalW = vec3(0.0, 1.0, 0.0);\r\n';

    this.shaderinjectpoint3 += "vec4 finalColor1 = baseColor1;\r\n";
    this.shaderinjectpoint3 += "vec3 finalNormal1 = baseNormal1;\r\n"; //this.shaderinjectpoint3 += 'finalColor1.a = 0.05;\r\n';

    this.shaderinjectpoint4 += "vec4 finalColor1 = baseColor1;\r\n";
    this.shaderinjectpoint4 += "float finalRough1 = baseRough1;\r\n"; //this.shaderinjectpoint4 += 'finalColor1.a = 0.05;\r\n';

    var v = 0.0,
        h = 0.0;

    for (var i = 0; i < this.totalTiles; i++) {
      var tpos = Math.floor(i / 4);
      h = tpos % this.numSplatTilesHorizontal;
      v = this.numSplatTilesHorizontal - 1 - Math.floor(tpos / this.numSplatTilesHorizontal);

      if (i < this.totalTiles - 1) {
        this.shaderinjectpoint3 += "\n                     " + "//vec4 finalColor" + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalColor" + (i + 1) + " : baseColor" + (i + 2) + ";\n                     " + "//vec4 finalColor" + (i + 2) + " = finalColor" + (i + 1) + " * (1.0 - baseColor" + (i + 2) + ".a) + baseColor" + (i + 2) + " * baseColor" + (i + 2) + ".a;\n                     " + "vec4 finalColor" + (i + 2) + " = blend(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + "); " + "\n                     //finalColor" + (i + 2) + ".a *= 0.95;\n\n                     //vec3 finalNormal" + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalNormal" + (i + 1) + " : baseNormal" + (i + 2) + ";\n                     vec3 finalNormal" + (i + 2) + " = blendNormal(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + ", finalNormal" + (i + 1) + ", baseNormal" + (i + 2) + "); " + "\n                 ";
        this.shaderinjectpoint4 += "\n                     " + "vec4 finalColor" + (i + 2) + " = blend(finalColor" + (i + 1) + ", " + this.options.splatInfos.displScales[i].toFixed(5) + ", baseColor" + (i + 2) + ", " + this.options.splatInfos.displScales[i + 1].toFixed(5) + "); " + "\n                     float finalRough" + (i + 2) + " = finalColor" + (i + 1) + ".a >= baseColor" + (i + 2) + ".a ? finalRough" + (i + 1) + " : baseRough" + (i + 2) + ";\n                 ";
      } // Get basecolors from tiles


      this.shaderinjectpoint2 += "vec2 uv" + (i + 1) + " = vec2((vAlbedoUV.x + " + h + ".0) * splatScale.x, (vAlbedoUV.y + " + v + ".0) * splatScale.y);\r\n";
      this.shaderinjectpoint2 += "mat4 chanInfo" + (i + 1) + " = colInfo(vAlbedoUV, uv" + (i + 1) + ", " + this.options.splatInfos.dedupScales[i].toFixed(5) + ", vec2(" + this.options.splatInfos.scales[i][0] + "," + this.options.splatInfos.scales[i][1] + "), vec2(" + this.options.splatInfos.positions[i][0] + "," + this.options.splatInfos.positions[i][1] + "), " + i % 4 + ", scale, splatmap, albedoSampler, atlasNormalsSampler);\r\n"; //this.shaderinjectpoint2 += 'vec4 baseColor' + (i + 1) +' = col(vAlbedoUV, uv' + (i + 1) + ', vec2('+this.options.splatInfos.scales[i][0]+','+this.options.splatInfos.scales[i][1]+'), vec2('+this.options.splatInfos.positions[i][0] + ','+this.options.splatInfos.positions[i][1]+'), ' + (i % 4) + ', scale, splatmap, albedoSampler, bumpSampler);\r\n';

      this.shaderinjectpoint2 += "vec4 baseColor" + (i + 1) + " = chanInfo" + (i + 1) + "[0];\r\n";
      this.shaderinjectpoint2 += "vec3 baseNormal" + (i + 1) + " = vec3(chanInfo" + (i + 1) + "[1].x, chanInfo" + (i + 1) + "[1].y, chanInfo" + (i + 1) + "[1].z);\r\n";
      this.shaderinjectpoint2 += "float baseRough" + (i + 1) + " = chanInfo" + (i + 1) + "[1].a;\r\n";
    } //this.shaderinjectpoint3 += 'finalColor16 = col(vAlbedoUV, uv16, vec2(20.0, 20.0), vec2(1.0, 2.0), 0, scale, splatmap, albedoSampler);';
    //this.shaderinjectpoint3 += 'normalW = perturbNormal(cotangentFrame, finalNormal' + (this.totalTiles) + ', 1.0);';


    this.shaderinjectpoint3 += "normalW = normalize(normalW * 0.75 + 0.25 * finalNormal" + this.totalTiles + ");"; // TODO: adding these vectors is incorrect
    //this.shaderinjectpoint3 += 'normalW = normalW;';
    //this.shaderinjectpoint3 += 'normalW.y *= -1.0;';
    //this.shaderinjectpoint3 += 'result = finalNormal' + (this.totalTiles) + ';';

    this.shaderinjectpoint3 += "result = finalColor" + this.totalTiles + ".rgb;"; //this.shaderinjectpoint4 += 'normalW = normalW + finalNormal' + (this.totalTiles) + ';';  // TODO: adding these vectors is incorrect

    this.shaderinjectpoint4 += "reflectivityOut.roughness = finalRough" + this.totalTiles + ";";
    this.splatMap = splatMap; //this.needsUpdating = true;

    this.material = new _babylonjs_materials__WEBPACK_IMPORTED_MODULE_2__.PBRCustomMaterial("splatMaterial", scene);
    this.material.metallic = 0.0;
    this.material.roughness = 0.95; //this.material.twoSidedLighting = true;
    //this.material.disableLighting = false;

    this.material.ambientColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1.0, 1.0, 1.0); // Color3.Black();
    //this.material.disableBumpMap = true;
    //this.material.specularColor = new Color3(0.15, 0.15, 0.15); // Color3.Black();
    //this.material.emissiveColor = new Color3(0.0, 0.0, 0.0); // Color3.Black();
    //this.material.emissiveIntensity = 0.0;
    //this.material.usePhysicalLightFalloff= false;

    this.material.environmentIntensity = 1.0; // This one is needed to avoid saturation due to env

    this.material.albedoTexture = atlas;

    if (atlasnormals !== null) {
      //this.material.bumpTexture = atlasnormals;
      this.atlasBumpTexture = atlasnormals;
    }

    this.material.AddUniform("splatmap", "sampler2D", {});
    this.material.AddUniform("atlasNormalsSampler", "sampler2D", {});
    this.material.Fragment_Begin("precision highp float;\r\n" + "precision highp int;\r\n" + this.shaderinjectpoint1 + "\n            // Functions\n\n            float heightval(vec4 col) {\n                //return ((col.r + col.g + col.b) / 3.0);\n                return col.a;\n            }\n\n            /*\n            vec4 blend(vec4 texture1, float displScale1, vec4 texture2, float displScale2) {\n                return ((texture1.a * displScale1) > (texture2.a * displScale2) ? texture1 : texture2);\n            }\n            */\n\n            vec4 blend(vec4 texture1, float displScale1, vec4 texture2, float displScale2) {\n                if (texture2.a == 0.) return texture1;\n                if (texture1.a == 0.) return texture2;\n                float a1 = texture1.a + displScale1;\n                float a2 = texture2.a + displScale2;\n                float depth = 0.2;\n                float ma = max(texture1.a + a1, texture2.a + a2) - depth;\n\n                float b1 = max(texture1.a + a1 - ma, 0.0);\n                float b2 = max(texture2.a + a2 - ma, 0.0);\n\n                vec4 result = (texture1 * b1 + texture2 * b2) / (b1 + b2);\n                result.a = (texture1.a > 0. && texture2.a > 0.) ? (a1 + a2) / (2.0 * (b1 + b2)) : result.a;\n                return result;\n            }\n\n            vec3 blendNormal(vec4 texture1, float displScale1, vec4 texture2, float displScale2, vec3 normal1,  vec3 normal2) {\n                float a1 = texture1.a + displScale1;\n                float a2 = texture2.a + displScale2;\n                float depth = 0.2;\n                float ma = max(texture1.a + a1, texture2.a + a2) - depth;\n\n                float b1 = max(texture1.a + a1 - ma, 0.0);\n                float b2 = max(texture2.a + a2 - ma, 0.0);\n\n                vec3 result = (normal1 * b1 + normal2 * b2) / (b1 + b2);\n                result = normalize(result);\n\n                return result;\n            }\n\n\n            vec2 hash22(vec2 p)\n            {\n                p = p * mat2(127.1, 311.7, 269.5, 183.3);\n                p = -1.0 + 2.0 * fract(sin(p) * 43758.5453123);\n                return sin(p * 6.283);  // + timeScale\n            }\n\n            float interpolationNoise(vec2 p)\n            {\n                vec2 pi = floor(p);\n                vec2 pf = p-pi;\n\n                vec2 w = pf * pf * (3.-2. * pf);\n\n                float f00 = dot(hash22(pi + vec2(.0,.0)), pf-vec2(.0,.0));\n                float f01 = dot(hash22(pi + vec2(.0,1.)), pf-vec2(.0,1.));\n                float f10 = dot(hash22(pi + vec2(1.0,0.)), pf-vec2(1.0,0.));\n                float f11 = dot(hash22(pi + vec2(1.0,1.)), pf-vec2(1.0,1.));\n\n                float xm1 = mix(f00,f10,w.x);\n                float xm2 = mix(f01,f11,w.x);\n\n                float ym = mix(xm1,xm2,w.y);\n                return ym;\n\n            }\n\n            float perlinNoise2D(float x,float y)\n            {\n                int OCTAVES = 3;\n                float persistence = 0.5;\n                float sum = 0.0;\n                float frequency = 0.0;\n                float amplitude = 0.0;\n                for(int i = 0; i < OCTAVES; i++)\n                {\n                    frequency = pow(2.0, float(i));\n                    amplitude = pow(persistence, float(i));\n                    sum = sum + interpolationNoise(vec2(x * frequency, y * frequency)) * amplitude;\n                }\n\n                return sum;\n            }\n            " //+"vec4 col(vec2 vAlbedoUV, vec2 uvT, vec2 tile1Scale, vec2 tile1Position, int chanIdx, vec2 scale, sampler2D splatmap, sampler2D atlas, sampler2D atlasNormals) {"
    + "mat4 colInfo(vec2 vAlbedoUV, vec2 uvT, float dedupScale, vec2 tile1Scale, vec2 tile1Position, int chanIdx, vec2 scale, sampler2D splatmap, sampler2D atlas, sampler2D atlasNormals) {" + "\n                float offsetInputScale = 2.0;\n                float offsetBaseScale = 0.25;\n                vec2 offset = vec2(perlinNoise2D(offsetInputScale * (uvT.x + 0.01 * tile1Position.x), offsetInputScale * (uvT.y + 0.1 * tile1Position.y)),\n                                   perlinNoise2D(offsetInputScale * (uvT.x + 0.07 * tile1Position.y), offsetInputScale * (-uvT.y + 0.13 * tile1Position.x)));\n                offset = offset * offsetBaseScale * dedupScale;\n                " // if this.dedupDouble...

    /*
    + `
    vec2 offset2 = vec2(perlinNoise2D(uvT.y - 0.08 * tile1Position.x, uvT.x + 0.04 * tile1Position.y),
                        perlinNoise2D(uvT.y + 0.05 * tile1Position.y, -uvT.x + 0.19 * tile1Position.x));
    offset2 = offset * offsetBaseScale * dedupScale;
    `
    */
    + "vec2 scaledUv1 = fract((vAlbedoUV + offset) * tile1Scale);" // Curvy antitiling factor
    + "scaledUv1 = scaledUv1 * (254.0/256.0) + vec2(1.0 / 256.0, 1.0 / 256.0);" + "vec2 uv1 = vec2((scaledUv1.x + tile1Position.x) * scale.x, (scaledUv1.y + tile1Position.y) * scale.y);"
    /*
    +'vec2 scaledUv2 = fract((vAlbedoUV + offset2) * tile1Scale).yx;'  // Curvy antitiling factor
    +'scaledUv2 = scaledUv2 * (254.0/256.0) + vec2(1.0 / 256.0, 1.0 / 256.0);'
    +'vec2 uv2 = vec2((scaledUv2.x + tile1Position.x) * scale.x, (scaledUv2.y + tile1Position.y) * scale.y);'
    */
    + "\n                vec4 splatColor1 = texture2D(splatmap, uvT);\n                " + "\n                float dedupMix = perlinNoise2D(100.0 * uvT.x, 100.0 * uvT.y);\n                dedupMix = dedupScale > 0.0 ? smoothstep(-0.02, 0.02, dedupMix) : 0.0;\n\n                //vec4 diffuse1Color = texture2DLodEXT(atlas, uv1, -1.0);\n                vec4 diffuseColorA = texture2D(atlas, uv1);\n\n                //vec4 diffuseColorB = texture2D(atlas, uv2);\n\n                //vec4 diffuse1Color = vec4(dedupMix, 0.0, 0.0, 1.0);  // Debug dedup mix factor\n                //vec4 diffuse1Color = diffuseColorA * dedupMix + diffuseColorB * (1.0 - dedupMix);\n                vec4 diffuse1Color = diffuseColorA;\n\n                vec4 diffuseNormalA = texture2D(atlasNormals, uv1);\n                diffuseNormalA.rgb = (diffuseNormalA.rgb * 2.0 - 1.0);\n                //vec4 diffuseNormalB = texture2D(atlasNormals, uv2);\n                //diffuseNormalB.rgb = (diffuseNormalB.rgb * 2.0 - 1.0);\n\n                /*\n                vec3 diffuse1NormalVec = normalize(diffuseNormalA.xyz * dedupMix + diffuseNormalB.xyz * (1.0 - dedupMix));\n                float diffuse1NormalAlpha = diffuseNormalA.a * dedupMix + diffuseNormalB.a * (1.0 - dedupMix);\n                vec4 diffuse1Normal = vec4(diffuse1NormalVec.x, diffuse1NormalVec.y, diffuse1NormalVec.z, diffuse1NormalAlpha);\n                */\n\n                vec4 diffuse1Normal = diffuseNormalA;\n                " + "\n                float blend = (chanIdx == 0 ? splatColor1.r : (chanIdx == 1 ? splatColor1.g : (chanIdx == 2 ? splatColor1.b : splatColor1.a)));\n                //blend = 1.0;\n\n                //diffuse1Color.rgb = splatColor1.rgb;\n                //diffuse1Color.a = blend;\n\n                 //diffuse1Color.a = ((blend > 0.0) ? (heightval(diffuse1Color) * blend) : 0.0);\n                 diffuse1Color.a = ((blend > 0.0) ? (diffuse1Color.a * blend) : 0.0);\n\n                 mat4 chanInfo = mat4(diffuse1Color, vec4(diffuse1Normal.x, diffuse1Normal.y, diffuse1Normal.z, diffuse1Normal.a), vec4(0.0), vec4(0.0));\n\n                " //+"return diffuse1Color;"
    + "return chanInfo;" + "}");
    this.material.Fragment_MainBegin(this.shaderinjectpoint2);
    this.material.Fragment_Custom_Albedo(this.shaderinjectpoint3);
    this.material.Fragment_Custom_MetallicRoughness(this.shaderinjectpoint4);
    this.material.onBindObservable.add(function () {
      _this.update();
    });
    return this.material;
  };

  _proto.update = function update() {
    this.material.getEffect().setTexture("splatmap", this.splatMap);
    this.material.getEffect().setTexture("atlasNormalsSampler", this.atlasBumpTexture); //this.material.reflectionTexture = this.envReflectionProbe.cubeTexture;
    //this.material.reflectionTexture = this.scene.environmentTexture;
    //this.sceneViewer.scene.environmentTexture = this.sceneViewer.envReflectionProbe.cubeTexture;
    //this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;
  };

  return TerrainMaterialWrapper;
}();
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

/**
 * A process that can be running in a DDDViewer instance.
 * Processes are updated every frame before drawing the scene.
 */


var ViewerProcess = /*#__PURE__*/function () {
  function ViewerProcess(sceneViewer) {
    this.time = 0;
    this.sceneViewer = sceneViewer;
    this.finished = false;
  }

  var _proto = ViewerProcess.prototype;

  _proto.update = function update(deltaTime) {
    // TODO: Consider providing an (optional) initialize() lifecycle method for processes (to be run before the first frame)
    //if (this.time == 0) initialize();
    this.time += deltaTime;
  };

  return ViewerProcess;
}();

var AnimationProcess = /*#__PURE__*/function (_ViewerProcess) {
  _inheritsLoose(AnimationProcess, _ViewerProcess);

  function AnimationProcess(sceneViewer, animTime) {
    var _this;

    _this = _ViewerProcess.call(this, sceneViewer) || this;
    _this.sceneViewer = sceneViewer;
    _this.time = 0.0;
    _this.animTime = animTime || 0;
    _this.interpFactor = 0.0;
    return _this;
  }

  var _proto = AnimationProcess.prototype;

  _proto.update = function update(deltaTime, factor) {
    if (factor === void 0) {
      factor = 0;
    } // Avoid calling parent just to update deltaTime, do it here for performance


    this.time += deltaTime;
    this.interpFactor = this.animTime > 0 ? this.time / (this.animTime - factor) : 1.0;
    if (this.interpFactor > 1.0) this.interpFactor = 1.0;

    if (this.time >= this.animTime) {
      this.finished = true;
    }
  };

  return AnimationProcess;
}(ViewerProcess);

var CameraMovementAnimationProcess = /*#__PURE__*/function (_AnimationProcess) {
  _inheritsLoose(CameraMovementAnimationProcess, _AnimationProcess);

  function CameraMovementAnimationProcess(sceneViewer, moveStart, moveEnd, animTime) {
    var _this;

    _this = _AnimationProcess.call(this, sceneViewer, animTime) || this;
    _this.moveStart = moveStart;
    _this.moveEnd = moveEnd;
    return _this;
  }

  var _proto = CameraMovementAnimationProcess.prototype;

  _proto.update = function update(deltaTime) {
    // Update camera interpolating between last pos and current
    var move_start = this.moveStart;
    var move_end = this.moveEnd;
    var sceneViewer = this.sceneViewer;
    AnimationProcess.prototype.update.call(this, deltaTime); // let interp_factor = ( this.animTime > 0 ) ? (( this.time ) / this.animTime ) : 1.0;
    // if ( interp_factor > 1.0 ) {
    //     interp_factor = 1.0;
    // }

    sceneViewer.viewerState.positionWGS84 = [_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scalar.Lerp(move_start.positionWGS84[0], move_end.positionWGS84[0], this.interpFactor), _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scalar.Lerp(move_start.positionWGS84[1], move_end.positionWGS84[1], this.interpFactor)];
    sceneViewer.viewerState.positionGroundHeight = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scalar.Lerp(move_start.positionGroundHeight, move_end.positionGroundHeight, this.interpFactor);
    sceneViewer.viewerState.positionTilt = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scalar.Lerp(move_start.positionTilt, move_end.positionTilt, this.interpFactor);
    var startHeading = move_start.positionHeading;
    var targetHeading = move_end.positionHeading;

    if (Math.abs(move_end.positionHeading - move_start.positionHeading) > 180.0) {
      if (move_end.positionHeading - move_start.positionHeading > 0) {
        startHeading += 360;
      } else {
        startHeading -= 360;
      }
    }

    var newPositionHeading = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scalar.Lerp(startHeading, targetHeading, this.interpFactor);
    sceneViewer.viewerState.positionHeading = (newPositionHeading % 360 + 360) % 360; //sceneViewer.viewerState.positionHeading = 180 / Math.PI * Scalar.LerpAngle(move_start.positionHeading * Math.PI / 180.0, move_end.positionHeading * Math.PI / 180.0, interp_factor);

    var positionScene = sceneViewer.wgs84ToScene(sceneViewer.viewerState.positionWGS84);
    var position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(positionScene[0], sceneViewer.viewerState.positionGroundHeight + sceneViewer.viewerState.positionTerrainElevation + 1, positionScene[2]);
    var rotation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3((90.0 - sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
    sceneViewer.camera.position = position;

    if (sceneViewer.camera instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.ArcRotateCamera) {
      sceneViewer.camera.rotation = rotation;
    }
  };

  return CameraMovementAnimationProcess;
}(AnimationProcess);

var DateTimeAnimationProcess = /*#__PURE__*/function (_AnimationProcess) {
  _inheritsLoose(DateTimeAnimationProcess, _AnimationProcess);

  function DateTimeAnimationProcess(sceneViewer, dtStart, dtEnd, animTime) {
    var _this;

    _this = _AnimationProcess.call(this, sceneViewer, animTime) || this;
    _this.dtStart = dtStart;
    _this.dtEnd = dtEnd; //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);

    console.debug("TODO: Restore missing call sceneViewer.lightSetupFromDatePos();");
    return _this;
  }

  var _proto = DateTimeAnimationProcess.prototype;

  _proto.update = function update(deltaTime) {
    var sceneViewer = this.sceneViewer;
    AnimationProcess.prototype.update.call(this, deltaTime);
    var interpTime = (this.dtEnd.getTime() / 1000 - this.dtStart.getTime() / 1000) * this.interpFactor;
    sceneViewer.viewerState.positionDate = new Date(this.dtStart.getTime() + interpTime * 1000);
    console.debug("TODO: Restore light setup from date position."); //sceneViewer.lightSetupFromDatePos();
  };

  return DateTimeAnimationProcess;
}(AnimationProcess);
/**
 *
 */


var TextAnimationProcess = /*#__PURE__*/function (_AnimationProcess) {
  _inheritsLoose(TextAnimationProcess, _AnimationProcess);
  /**
   *
   * @param text Text to animate.
   * @param animTime Animation duration in seconds.
   */


  function TextAnimationProcess(sceneViewer, text, animTime) {
    var _this;

    _this = _AnimationProcess.call(this, sceneViewer, animTime) || this;
    _this.text = text;
    return _this;
  }

  var _proto = TextAnimationProcess.prototype;

  _proto.update = function update(deltaTime) {
    _AnimationProcess.prototype.update.call(this, deltaTime);

    var sceneViewer = this.sceneViewer;
    var textCompleteTime = 2.0;
    AnimationProcess.prototype.update.call(this, deltaTime, textCompleteTime); // let interp_factor = ( this.animTime > 0 )
    //     ? (( this.time ) / ( this.animTime - textCompleteTime ))
    //     : 1.0;
    // if ( interp_factor > 1.0 ) {
    //     interp_factor = 1.0;
    // }

    var interpChars = Math.ceil(this.text.length * this.interpFactor);
    var interpText = this.text.substr(0, interpChars);
    sceneViewer.viewerState.sceneTitleText = interpText;

    if (this.finished) {
      sceneViewer.viewerState.sceneTitleText = null;
    }
  };

  return TextAnimationProcess;
}(AnimationProcess);
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


var ViewerSequencer = /*#__PURE__*/function () {
  function ViewerSequencer(sceneViewer) {
    this.sceneViewer = sceneViewer;
    this.seq = null;
    this.playing = false;
    this.time = 0.0;
    this.index = 0;
    this.waitTime = 0.0;
  }

  var _proto = ViewerSequencer.prototype;

  _proto.update = function update(deltaTime) {
    if (!this.playing) {
      return;
    }

    this.time += deltaTime;

    if (this.waitTime > 0.0) {
      this.waitTime -= deltaTime;
      return;
    } // Run all possible steps


    while (this.index < this.seq.length && this.waitTime <= 0.0) {
      var step = this.seq[this.index];
      this.index++;
      this.runStep(step);
    }
  };

  _proto.runStep = function runStep(step) {
    console.debug("Running step: ", step);
    var command = step[0]; //if ( ! ((command instanceof String )) throw new Error( "No command specified." );

    if (command === "m") {
      var posString = this.sceneViewer.positionString();

      if (posString) {
        var move_start = this.sceneViewer.parsePositionString(posString);
        var move_end = this.sceneViewer.parsePositionString(posString);
        var animTime = step[2];
        var moveAnimationProcess = new CameraMovementAnimationProcess(this.sceneViewer, move_start, move_end, animTime);
        this.sceneViewer.processes.add(moveAnimationProcess);
      }
    } else if (command === "dt") {
      var dtStart = this.sceneViewer.viewerState.positionDate;
      console.debug(dtStart);
      var dtEnd = new Date(dtStart);
      console.debug(dtEnd);
      dtEnd.setHours(parseInt(step[1].split(":")[0]));
      dtEnd.setMinutes(parseInt(step[1].split(":")[1]));
      console.debug(dtEnd);
      var _animTime = step[2];
      var process = new DateTimeAnimationProcess(this.sceneViewer, dtStart, dtEnd, _animTime);
      this.sceneViewer.processes.add(process);
    } else if (command === "t") {
      var text = step[1];
      var _animTime2 = step[2];

      var _process = new TextAnimationProcess(this.sceneViewer, text, _animTime2);

      this.sceneViewer.processes.add(_process);
    } else if (command === "s") {
      this.waitTime = step[1];
      /*} else if ( command === "u" ) {
      const url = step[1];
      // Do not change URL if in settings
      if ( this.sceneViewer.app.$route.name !== "sceneTools" ) {
          this.sceneViewer.app.$router.push( url );
      }*/
    } else if (command === "goto") {
      this.index = step[1];
    } else if (command.startsWith("#")) ;else {
      // Unknown step type
      console.debug("Invalid sequence step: ", step);
    }
  };

  _proto.play = function play(seq) {
    console.debug("Playing sequence: ", seq);
    this.sceneViewer.camera.detachControl();
    this.sceneViewer.viewerState.sceneViewModeShow = false;
    this.seq = seq;
    this.playing = true;
    this.time = 0.0;
    this.index = 0;
  };

  return ViewerSequencer;
}();

var SceneViewer = /*#__PURE__*/function () {
  function SceneViewer(canvas, viewerState) {
    this.camera = null;
    this.sceneInstru = null;
    this.highlightMeshes = []; //materialHighlight: Material | null = null;

    this.materialHighlight = null;
    this.walkMode = false;
    this.useSplatMap = true;
    this.ambientColorNight = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0, 0, 0.3);
    this.ambientColorDay = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0.70, 0.70, 0.7);
    this.colorLightLamp = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(250 / 255, 244 / 255, 192 / 255);
    this.colorLightRed = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(512 / 255, 0 / 255, 0 / 255);
    this.colorLightGreen = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(50 / 255, 512 / 255, 50 / 255);
    this.colorLightOrange = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(255 / 255, 157 / 255, 0 / 255);
    this.lastDateUpdate = new Date().getTime();
    this.selectedMesh = null;
    this.sceneSelectedMeshId = null;
    this.materialWater = null;
    this.envReflectionProbe = null;
    this.light = null;
    this.shadowGenerator = null;
    this.lensFlareSystem = null;
    this.textureDetailSurfaceImp = null;
    this.skybox = null;
    this.splatmapAtlasTexture = null;
    this.splatmapAtlasNormalsTexture = null;
    this._previousLampPatOn = null;
    this._geolocationWatchId = null;
    this.viewerState = viewerState;
    this.layerManager = new LayerManager(this);
    this.queueLoader = new QueueLoader(this);
    this.originShiftWGS84 = [0, 0];
    this.projection = (0,proj4__WEBPACK_IMPORTED_MODULE_4__.default)("EPSG:4326");
    this.tileGrid = (0,ol_tilegrid__WEBPACK_IMPORTED_MODULE_5__.createXYZ)({
      extent: (0,ol_tilegrid__WEBPACK_IMPORTED_MODULE_5__.extentFromProjection)("EPSG:3857")
    });
    this.catalog = {};
    this.catalog_materials = {};
    this.instanceRoots = {}; // Dependencies to not yet loaded objects, in order to process them

    this.depends = [];
    this.lastDateUpdate = new Date().getTime();
    this.processes = new ViewerProcessManager(this);
    this.sequencer = new ViewerSequencer(this); // Associate a Babylon Engine to it (engine:  canvas, antialiasing, options, adaptToDeviceRatio)

    this.engine = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Engine(canvas, true); // , null, true); // , { stencil: true });

    console.warn("Scene option 'useGeometryIdsMap' is disabled.");
    this.scene = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Scene(this.engine, {
      useGeometryIdsMap: true
    }); //that.scene = createScene(engine, canvas);
    //this.scene.freezeActiveMeshes(true);  // affects too many things, causes wrong behavior (skybox, etc)
    //this.octree = null;

    this.initialize();
  }

  var _proto = SceneViewer.prototype;

  _proto.initialize = function initialize() {
    var _this = this; //const that = this;
    // Get the canvas element from the DOM.
    //const canvas = that.$el.querySelector('.ddd-scene');
    //const canvas = document.getElementById("renderCanvas");
    //console.debug(that.viewerState);


    var coords = this.viewerState.positionWGS84;
    this.registerProjectionForCoords(coords);

    this.scene.pointerMovePredicate = function () {
      return false;
    };

    this.scene.pointerDownPredicate = function () {
      return false;
    }; //this.sceneInstru = null;


    this.sceneInstru = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.SceneInstrumentation(this.scene); //that.highlightLayer = new HighlightLayer("hl1", that.scene);

    var water = new _babylonjs_materials__WEBPACK_IMPORTED_MODULE_2__.WaterMaterial("water", this.scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector2(512, 512)); //water.backFaceCulling = true;
    //water.bumpTexture = new Texture("/textures/waterbump.png", that.scene);

    water.windForce = 5;
    water.waveHeight = 0.1;
    water.waveSpeed = 100.0;
    water.bumpHeight = 0.05;
    water.waveLength = 10.0; //water.alpha = 0.8;
    //water.useSpecularOverAlpha = true;
    //water.useReflectionOverAlpha = true;
    //water.transparencyMode = 2;  // 2  ALPHA_BLEND  3;  // ALPHA_TEST_AND_BLEND
    //water.renderingGroupId = 3;

    water.colorBlendFactor = 0.2;
    this.scene.setRenderingAutoClearDepthStencil(3, false, false, false); //water.addToRenderList(ground);
    //let waterOcean = createOceanMaterial(this.scene);

    this.materialWater = water;
    /*
    that.materialGrass = new StandardMaterial("bawl", that.scene);
    that.textureGrass = new GrassProceduralTexture("textbawl", 256, that.scene);
    that.materialGrass.ambientTexture = that.textureGrass;
    */
    // Environment

    this.envReflectionProbe = null;

    if (this.viewerState.sceneEnvironmentProbe !== null) {
      this.envReflectionProbe = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.ReflectionProbe("envReflectionProbe", this.viewerState.sceneEnvironmentProbe, this.scene, true, true);
      this.envReflectionProbe.refreshRate = 6;
      this.envReflectionProbe.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0); // Assign to a material to see it
      //var pbr = new PBRMaterial('envReflectionTestMaterial', this.scene);
      //pbr.reflectionTexture = this.envReflectionProbe.cubeTexture;
      // Force PBR material udpate and show for debugging
      //var sphere = Mesh.CreateSphere("envReflectionTestSphere", 16, 5, this.scene);
      //sphere.position.y = 150;
      //sphere.material = pbr;
      // Note that material needs to be added to the camera custom render targets to be updated

      this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;
    } else {
      //this.scene.createDefaultEnvironment();
      //var hdrTexture = new CubeTexture.CreateFromPrefilteredData("/textures/environment.env", this.scene);
      var hdrTexture = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.CubeTexture.CreateFromPrefilteredData("/textures/country.env", this.scene);
      this.scene.environmentTexture = hdrTexture;
    } // Skybox


    this.loadSkybox(this.viewerState.sceneSkybox);
    /*
    const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2-0.5, 500, Vector3.Zero(), that.scene);
    camera.attachControl(canvas, true);
    camera.minZ = 1;
    //camera.maxZ = 2500;  // Automatic? see focusOn()
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 1000;
    camera.upperBetaLimit = Math.PI/2;
    camera.panningSensibility = 2;
    */
    // Camera

    this.selectCameraFree(); //this.selectCameraWalk();
    //this.selectCameraOrbit();
    // Render Pipeline config and Postprocessing
    //this.initRenderPipeline();
    //this.updateRenderPipeline();
    // Lighting
    //this.scene.ambientColor = this.ambientColorDay.clone();
    //this.scene.ambientColor = new Color3(0, 0, 0);

    this.scene.ambientColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0.3, 0.3, 0.3);
    /*
    that.lightHemi = new HemisphericLight("lightHemi", new Vector3(-0.5, 1, -1), that.scene);
    that.lightHemi.intensity = 1.15;
    that.lightHemi.diffuse = new Color3(0.95, 0.95, 1);
    that.lightHemi.specular = new Color3(1, 1, 0.95);
    that.lightHemi.groundColor = new Color3(0.95, 1, 0.95);
    */

    this.light = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight("light", new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0.3, -0.5, 0.5).normalizeToNew(), this.scene);
    this.light.diffuse = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0.95, 0.95, 1.00);
    this.light.specular = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 0.95);
    this.light.intensity = 2.5;
    /*
    that.light2 = new DirectionalLight("light2", new Vector3(-0.3, -0.5, -0.5).normalizeToNew(), that.scene);
    that.light.diffuse = new Color3(223 / 255, 242 / 255, 196 / 255);
    that.light.specular = new Color3(1, 1, 0.95);
    that.light2.intensity = 1.5;
    */

    this.shadowGenerator = null;

    if (this.viewerState.sceneShadowsEnabled) {
      this.shadowGenerator = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.CascadedShadowGenerator(1024, this.light); //that.shadowGenerator.debug = true;

      this.shadowGenerator.shadowMaxZ = 500;
      this.shadowGenerator.autoCalcDepthBounds = true;
      this.shadowGenerator.penumbraDarkness = 0.8;
      this.shadowGenerator.lambda = 0.5; //that.shadowGenerator.depthClamp = false;
      //that.shadowGenerator.freezeShadowCastersBoundingInfo = true;

      this.shadowGenerator.splitFrustum();
    }

    var lensFlareEmitter = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Mesh("lensFlareEmitter", this.scene);
    this.lensFlareSystem = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlareSystem("lensFlareSystem", lensFlareEmitter, this.scene);
    var flareScale = 0.5;
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.2, 0, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1), "/textures/Flare2.png", this.lensFlareSystem);
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.5, 0.2, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0.5, 0.5, 1), "/textures/flare3.png", this.lensFlareSystem);
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.2, 1.0, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1), "/textures/flare3.png", this.lensFlareSystem);
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.4, 0.4, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 0.5, 1), "/textures/flare.png", this.lensFlareSystem);
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.1, 0.6, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1), "/textures/flare3.png", this.lensFlareSystem);
    new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensFlare(flareScale * 0.3, 0.8, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1), "/textures/Flare2.png", this.lensFlareSystem); // Setup lighting, flares, etc.
    //this.lightSetupFromDatePos();
    //var ssao = new SSAORenderingPipeline('ssaopipeline', that.scene, 0.75);

    this.materialHighlight = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("materialHighlight", this.scene);
    this.materialHighlight.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1, 1, 1); //that.materialHighlight.specularColor = new Color3(1, 1, 1);

    this.materialHighlight.emissiveColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(1.0, 1.0, 1.);
    this.materialHighlight.wireframe = true;
    this.materialHighlight.disableLighting = true;
    this.materialHighlight.backFaceCulling = true; // The first parameter can be used to specify which mesh to import. Here we import all meshes
    //SceneLoader.ImportMesh('', '', https://models.babylonjs.com/', 'alien.glb', that.scene, function (newMeshes) {
    //    console.debug("Preparing model.");
    //    that.scene.createDefaultCameraOrLight(true);
    //    that.scene.activeCamera.attachControl(canvas, false);
    //    that.scene.activeCamera.alpha += Math.PI; // camera +180°
    //});

    this.textureDetailSurfaceImp = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture("/textures/SurfaceImperfections12_ddd.png", this.scene);
    this.loadCatalog("/assets/catalog.glb", false);
    this.loadTextures(); // Render every frame

    this.engine.runRenderLoop(function () {
      if (!_this.scene) {
        return;
      }

      _this.update(_this.engine.getDeltaTime() / 1000.0);

      _this.scene.render();
    }); // Shaders

    /*
    Effect.ShadersStore["customVertexShader"]= `
        precision highp float;
         // Attributes
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec2 uv;
         // Uniforms
        uniform mat4 worldViewProjection;
        uniform float time;
         // Varying
        //varying vec2 vUV;
         void main(void) {
            vec3 p = position;
            p.x = p.x + sin(2.0 * position.y + time);
            p.y = p.y + sin(time + 4.0);
            gl_Position = worldViewProjection * vec4(p, 1.0);
             //vUV = uv;
    }`;
    */
    // Performance
    // Avoid clear calls, as there's always a skybox

    this.scene.autoClear = false; // Color buffer

    this.scene.autoClearDepthAndStencil = false; // Depth and stencil

    this.scene.blockMaterialDirtyMechanism = true;
    this.scene.setRenderingAutoClearDepthStencil(1, false, false, false); // For objects in front of layer 0 (buildings and instances)
  };

  _proto.loadSkybox = function loadSkybox(baseUrl) {
    // Remove skybox
    if (this.skybox) {
      this.materialWater.getRenderList().length = 0;

      if (this.viewerState.sceneEnvironmentProbe) {
        this.envReflectionProbe.renderList.length = 0;
      }

      this.skybox.dispose();
      this.skybox = null;
    } // Set skybox


    if (baseUrl === "@dynamic") ;else if (baseUrl !== null) {
      var skybox = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.MeshBuilder.CreateBox("skyBox", {
        size: 3000.0
      }, this.scene);
      var skyboxMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("skyBox", this.scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.CubeTexture(baseUrl, this.scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3(0, 0, 0);
      skyboxMaterial.disableDepthWrite = true;
      skybox.material = skyboxMaterial;
      skybox.infiniteDistance = true;
      skybox.applyFog = false;
      this.skybox = skybox;
    }

    if (this.skybox) {
      this.skybox.renderingGroupId = 0; // Seems needs to be rendered in group 0 for it to be applied to the reflections on water
      //this.scene.setRenderingAutoClearDepthStencil(2, false, false, false);

      this.envReflectionProbe.renderList.push(this.skybox);
      this.materialWater.addToRenderList(this.skybox);
    }
  };

  _proto.showFullScreen = function showFullScreen() {
    if (this.engine) {
      this.engine.switchFullscreen(true);
    }
  };

  _proto.showDebugView = function showDebugView() {
    // Show BabylonJS Inspector
    this.scene.debugLayer.show({
      overlay: true
    });
  };

  _proto.loadCatalog = function loadCatalog(filename, loadMaterials) {
    var _this2 = this;

    console.debug("Loading catalog: " + filename);
    _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.SceneLoader.ImportMesh(null, filename, "", this.scene, //this.scene,
    // onSuccess
    function (newMeshes, _particleSystems, _skeletons) {
      //console.log("GLB loaded", newMeshes);
      _this2.loadCatalogFromMesh(newMeshes[0], loadMaterials);

      newMeshes[0].setParent(null);
      newMeshes[0].setEnabled(false); //newMeshes[0].isVisible = false;
      //newMeshes[0].dispose();

      _this2.processDepends();
    }, function (_event) {}, function (_scene, _msg, ex) {
      console.debug("Could not load scene catalog: " + filename, ex);
    });
  };

  _proto.processDepends = function processDepends() {
    var _this3 = this;

    console.debug("Processing dependencies");
    var dependsCopy = [].concat(this.depends);

    var _loop = function _loop() {
      var dep = _step.value;
      _this3.depends = _this3.depends.filter(function (item) {
        return item !== dep;
      });

      _this3.processMesh(dep, dep);
    };

    for (var _iterator = _createForOfIteratorHelperLoose(dependsCopy), _step; !(_step = _iterator()).done;) {
      _loop();
    }
  };

  _proto.loadCatalogFromMesh = function loadCatalogFromMesh(mesh, loadMaterials) {
    if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
      var metadata = mesh.metadata.gltf.extras; // Add color material

      /*
      let key = metadata['ddd:material'];
      let mat = this.catalog_materials[key];
      if (key && key.startsWith("Color") && mesh.material && !mat) {
          console.debug("Adding color material " + mesh.material + " to catalog: " + key);
          mat = mesh.material;
          mat.name = key;
          this.catalog_materials[key] = mat;
          //mesh.material = mat;
      } else if (key && mat) {
          //mesh.material.dispose();
          //mesh.material = mat;
      }
      */

      if (metadata["ddd:instance:key"]) {
        //this.processMesh(mesh, mesh);
        this.addMeshToCatalog(metadata["ddd:instance:key"], mesh);
      }

      if (metadata["ddd:material"] && (loadMaterials || !(metadata["ddd:material"] in this.catalog_materials))) {
        try {
          this.addMaterialToCatalog(metadata["ddd:material"], mesh, true);
        } catch (e) {
          console.debug("Error adding material to catalog: ", mesh, e);
        }
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(mesh.getChildren()), _step2; !(_step2 = _iterator2()).done;) {
      var child = _step2.value;
      this.loadCatalogFromMesh(child, loadMaterials);
    }
  };

  _proto.addMaterialToCatalog = function addMaterialToCatalog(key, mesh, force) {
    if (force === void 0) {
      force = false;
    }

    if (mesh.material) {
      //console.debug(mesh.material);
      //mesh.material.id = key;
      mesh.material.name = key;

      if (this.catalog_materials[key] && !force) {
        console.debug("Material already in catalog: " + key);
      } else {
        //console.debug("Adding material to catalog: " + key);
        this.catalog_materials[key] = mesh.material;
        var metadata = mesh.metadata.gltf.extras;
        var dontFreeze = false;

        if (metadata["ddd:material"] === "WaterBasicDaytime") {
          /*
          mesh.material.alpha = 0.7;
          mesh.material.transparencyMode = 2;  // ALPHA_BLEND
          mesh.material.useSpecularOverAlpha = true;
          mesh.material.useReflectionOverAlpha = true;
          mesh.material.bumpTexture = new Texture("/textures/waterbump.png", this.scene);
          */
          // This "WaterInstanced" is to avoid WaterMaterial from being used in instances (seems to fail, causing the material to disappear).
          this.catalog_materials["WaterInstanced"] = mesh.material;
          this.catalog_materials["WaterInstanced"].alpha = 0.7;
          this.catalog_materials["WaterInstanced"].transparencyMode = 2;
          this.catalog_materials["WaterInstanced"].freeze();
          console.debug("NOT ADDING WATERMATERIAL TO CATALOG"); //this.catalog_materials[key] = <WaterMaterial> this.materialWater;

          dontFreeze = true;
        } else if (metadata["ddd:material"] === "Water4Advanced") {
          /*
          mesh.material.alpha = 0.8;
          mesh.material.transparencyMode = 2;  // ALPHA_BLEND
          mesh.material.useSpecularOverAlpha = true;
          mesh.material.useReflectionOverAlpha = true;
          mesh.material.bumpTexture = new Texture("/textures/waterbump.png", this.scene);
          */
          console.debug("NOT ADDING WATERMATERIAL TO CATALOG"); //this.catalog_materials[key] = <Material> this.materialWater;

          dontFreeze = true;
        } else if (mesh.material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
          //mesh.material.specularColor = Color3.Lerp(mesh.material.albedoColor, Color3.White(), 0.2);
          //mesh.material.albedoColor = Color3.Lerp(mesh.material.albedoColor, Color3.White(), 0.5);
          //mesh.material.albedoColor = Color3.FromHexString(mesh.metadata.gltf.extras['ddd:material:color']).toLinearSpace();
          //mesh.material.albedoColor = Color3.FromHexString(mesh.material.albedoColor).toLinearSpace();
          var uvScale = 0.25;

          if (metadata["ddd:material"] === "Roadline" || metadata["ddd:material"] === "Roadmarks" || metadata["ddd:material"] === "Fence" || metadata["ddd:material"] === "TrafficSigns" || metadata["ddd:material"] === "RoadRailway" || metadata["ddd:material"] === "Flowers Blue" || metadata["ddd:material"] === "Flowers Roses" || metadata["ddd:material"] === "Grass Blade" || metadata["ddd:material"] === "Grass Blade Dry") {
            uvScale = 1.0;
          }

          if (metadata["ddd:material"] === "Fence") {
            uvScale = 0.5;
            mesh.material.backFaceCulling = false;

            if (mesh.material.albedoTexture && mesh.material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
              mesh.material.albedoTexture.vOffset = 0.0725;
            }

            if (mesh.material.bumpTexture) {
              mesh.material.bumpTexture.vOffset = 0.0725;
            }
          }

          if (uvScale !== 1.0) {
            if (mesh.material.albedoTexture && mesh.material instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
              mesh.material.albedoTexture.uScale = uvScale;
              mesh.material.albedoTexture.vScale = uvScale;

              if (mesh.material.bumpTexture) {
                mesh.material.bumpTexture.uScale = uvScale;
                mesh.material.bumpTexture.vScale = uvScale;
              }
            }
          }
          /*
          if ((metadata['ddd:material'] !== 'Flo') &&
              (metadata['ddd:material'] !== 'TrafficSigns') &&
              (metadata['ddd:material'] !== 'RoadRailway') &&
              (metadata['ddd:material'] !== 'Flowers Blue') &&
              (metadata['ddd:material'] !== 'Flowers Roses') &&
              (metadata['ddd:material'] !== 'Grass Blade')) {
              mesh.material.albedoTexture.uScale = 0.25;
              mesh.material.albedoTexture.vScale = 0.25;
              if (mesh.material.bumpTexture) {
                  mesh.material.bumpTexture.uScale = 0.25;
                  mesh.material.bumpTexture.vScale = 0.25;
              }
          }
          */
          // Detail map


          mesh.material.detailMap.texture = this.textureDetailSurfaceImp;
          mesh.material.detailMap.texture.uScale = 1 / 256;
          mesh.material.detailMap.texture.vScale = 1 / 256;
          mesh.material.detailMap.isEnabled = true;
          mesh.material.detailMap.diffuseBlendLevel = 0.15; // 0.2
          //mesh.material.detailMap.bumpLevel = 1; // between 0 and 1
          //mesh.material.detailMap.roughnessBlendLevel = 0.05; // between 0 and 1
          //mesh.material.environmentIntensity = 0.2;  // This one is needed to avoid saturation due to env
          //mesh.material.freeze();  // Careful: may prevent environment texture change (?)
        }

        if (metadata["zoffset"]) {
          this.catalog_materials[key].zOffset = metadata["zoffset"];
        } //mesh.material.ambientColor = mesh.material.albedoColor; // new Color3(1, 1, 1);


        if (!dontFreeze) {
          this.catalog_materials[key].freeze();
        }
      }
    } else {
      console.debug("No material found in mesh: " + mesh.id + " (key=" + key + ")");
    }
  };

  _proto.addMeshToCatalog = function addMeshToCatalog(key, mesh) {
    if (this.catalog[key]) {
      console.debug("Mesh already in catalog: " + key);
    } else {
      //console.debug("Adding mesh to catalog: " + key);
      this.catalog[key] = mesh;
      mesh.setEnabled(false);
      mesh.parent = null;
    }
  };

  _proto.processMesh = function processMesh(root, mesh) {
    //console.debug("Processing mesh: " + mesh.id)
    var rootmd = root.metadata.tileInfo; //mesh.isPickable = false;

    if (!("_splatmapMaterial" in root) && this.useSplatMap && this.viewerState.sceneTextureSet && this.viewerState.sceneTextureSet.indexOf("default") >= 0) {
      if ("metadata" in mesh && "tileCoords" in mesh.metadata) {
        var coords = root.metadata["tileCoords"]; //console.debug("Creating splat material for: ", coords);

        var tileUrlBase = this.viewerState.dddConfig.tileUrlBase;
        var splatmapUrl = tileUrlBase + "17" + "/" + coords[1] + "/" + coords[2] + ".splatmap-16chan-0_15-256.png";
        var splatmapTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture(splatmapUrl, this.scene);
        var matwrapper = new TerrainMaterialWrapper(this, splatmapTexture, this.splatmapAtlasTexture, this.splatmapAtlasNormalsTexture, {});
        root._splatmapMaterial = matwrapper.material;
        var uvScale = [225, 225]; //[225, 225]; // [113.36293971960356 * 2, 112.94475604662343 * 2];

        var bounds = rootmd ? rootmd["tile:bounds_m"] : null;

        if (bounds) {
          //console.debug("Bounds: ", bounds);
          uvScale = [bounds[2] - bounds[0], bounds[3] - bounds[1]];
        } // Seems to work well (+1 +1 / +1 -1)


        matwrapper.material.albedoTexture.uScale = 1.0 / uvScale[0] * (127 / 128); // + 1

        matwrapper.material.albedoTexture.vScale = 1.0 / uvScale[1] * (127 / 128); // + 1

        matwrapper.material.albedoTexture.uOffset = 0.5; //  + (1 / uvScale[0]);

        matwrapper.material.albedoTexture.vOffset = 0.5 - 0.5 / 128; // 1 / root._splatmapMaterial.albedoTexture.getSize().height);

        /*if (mesh.material.bumpTexture) {
            mesh.material.bumpTexture.uScale = 1.0 / uvScale[0];
            mesh.material.bumpTexture.vScale = 1.0 / uvScale[1];
            mesh.material.bumpTexture.uOffset = 0.5;
            mesh.material.bumpTexture.vOffset = 0.5;
        }*/
        //root._splatmapMaterial.freeze();
      }
    }

    if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
      var metadata = mesh.metadata.gltf.extras;
      mesh.isBlocker = true;

      if (metadata["ddd:material"] && !("ddd:text" in metadata)) {
        var key = metadata["ddd:material"];

        if (key === "WaterBasicDaytime") {
          //console.debug(mesh);
          if (metadata["ddd:path"].startsWith("Catalog Group")) {
            key = "WaterInstanced";
          }
        }

        var mat = this.catalog_materials[key];

        if (!(key in this.catalog_materials) && mesh.material) {
          mesh.material.id = key + "(Auto)";
          mesh.material.name = key;
          this.addMaterialToCatalog(metadata["ddd:material"], mesh);
          mat = this.catalog_materials[key];

          if (!(root in this.depends)) {
            this.depends.push(root);
          }
        } // Add color material

        /*
        if (key.startsWith("Color") && mesh.material && !mat) {
            console.debug("Adding color material " + mesh.material + " to catalog: " + key);
            mat = mesh.material;
            mat.name = key;
            this.catalog_materials[key] = mat;
            //mesh.material = null;
        }
        */
        // TODO: Indicate when to splat in metadata


        if (this.useSplatMap && this.viewerState.sceneTextureSet && "ddd:material:splatmap" in metadata && metadata["ddd:material:splatmap"] === true && (!("ddd:layer" in metadata) || metadata["ddd:layer"] === "0") && (metadata["ddd:material"] === "Park" || metadata["ddd:material"] === "Grass" || metadata["ddd:material"] === "Terrain" || metadata["ddd:material"] === "Ground" || metadata["ddd:material"] === "Ground Clear" || metadata["ddd:material"] === "Dirt" || metadata["ddd:material"] === "Garden" || metadata["ddd:material"] === "Forest" || metadata["ddd:material"] === "Sand" || metadata["ddd:material"] === "Rock" || metadata["ddd:material"] === "Rock Orange" || metadata["ddd:material"] === "WayPedestrian" && (!("ddd:area:type" in metadata) || metadata["ddd:area:type"] !== "stairs") || metadata["ddd:material"] === "Wetland" || metadata["ddd:material"] === "Asphalt")) {
          if (root._splatmapMaterial) {
            if (mesh.material && mesh.material !== root._splatmapMaterial) {
              mesh.material.dispose();
            }

            mesh.material = root._splatmapMaterial;
            root._splatmapMaterial.renderingGroupId = 1; // Expensive probe
            //this.envReflectionProbe.renderList.push(mesh);
          }
        } else if (key in this.catalog_materials) {
          // && mesh.material
          if (mesh.material && mesh.material !== mat && mat) {
            var mmat = mesh.material;
            mesh.material = null;
            mmat.dispose(); // Causes white materials, but cleans all outstanding materials
          }

          if (mat) {
            mesh.material = mat;
          }
        } else {
          //console.debug("Material not found in catalog: " + key);
          // TODO: Will never happen if not showing materials (dependencies should be to the particular instance or material)
          this.depends.push(root);
        }
      }

      if (metadata["ddd:light:color"]) {
        /*
        var light = new PointLight("light_" + mesh.id, mesh.position, this.scene);
        light.parent = mesh.parent;
        light.position = mesh.position;
        light.position.y = light.position.z + 1;
        light.intensity = 20;
        light.diffuse = new Color3(1, 0, 0);
        light.specular = new Color3(0, 1, 0);
        */
        mesh.parent = null;
        mesh.dispose();
      } else if (metadata["ddd:text"]) {
        var newMesh = null;
        var showText = this.viewerState.sceneTextsEnabled;

        if (showText) {
          // Text should be (possibly) exported as meshes by the generator.
          newMesh = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.MeshBuilder.CreatePlane("text_" + mesh.id, {
            size: 2.4,
            sideOrientation: _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Mesh.DOUBLESIDE,
            updatable: true
          }, this.scene);
          newMesh.parent = null;
          newMesh.parent = mesh.parent; // .parent;

          newMesh.scaling = mesh.scaling.clone();
          newMesh.rotationQuaternion = mesh.rotationQuaternion.clone();
          newMesh.position = mesh.position.clone();
          newMesh.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Right(), Math.PI / 2.0, _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Space.LOCAL);
          newMesh.scaling.y *= 0.35; //Create dynamic texture

          var texture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.DynamicTexture("dynamicTexture_text_" + mesh.id, {
            width: 256,
            height: 128
          }, this.scene, true); //var textureContext = texture.getContext();

          var font = "bold 36px serif";
          var text = metadata["ddd:text"];
          texture.drawText(text, 128.0 - text.length * 8, 60, font, "blue", "transparent", true, true);
          var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("Mat" + mesh.id, this.scene);
          material.diffuseTexture = texture;
          material.diffuseTexture.hasAlpha = true;
          material.useAlphaFromDiffuseTexture = true;
          material.transparencyMode = 1; // ALPHA_TEST

          newMesh.material = material;
          newMesh.isPickable = false; //newMesh.metadata = {gltf: {extras: metadata}};  // Doesn't seem to work and/or freezes the app
          //delete newMesh.metadata['ddd:text'];
        }

        mesh.parent = null;
        mesh.dispose();
        mesh = newMesh;
      } else if (metadata["ddd:instance:key"]) {
        var _key = metadata["ddd:instance:key"]; // Ignored objects (devel purpose)

        var ignored_keys = []; // ["building-window"]

        if (ignored_keys.indexOf(_key) >= 0) {
          mesh.parent = null;
          mesh.dispose();
          return null;
        }

        if (this.catalog[_key]) {
          if ("ddd:instance:buffer:matrices" in metadata) {
            this.instanceAsThinInstanceBuffers(_key, root, mesh);
          } else {
            //this.instanceAsNode(root, key, mesh);
            this.instanceAsThinInstance(_key, root, mesh); // note this removes the mesh
          }
        } else {
          // Instance not found. Mark this root for re processing and exit.
          //console.debug("Instance key not found in catalog: : " + key);
          this.depends.push(root);
          return null;
        }
      }

      this.depends.push(root);
    } //mesh.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;


    if (mesh) {
      // && !replaced

      /*
      if (mesh.simplify && mesh.getTotalVertices() > 0 && !replaced) {
          mesh.simplify([{ quality: 0.1, distance: 100 }, ], false, SimplificationType.QUADRATIC);
      }
      */
      mesh.cullingStrategy = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY; //mesh.freezeWorldMatrix();
      //if (mesh.material) { mesh.material.needDepthPrePass = true; }  // causes some objects with textures to show black

      for (var _iterator3 = _createForOfIteratorHelperLoose(mesh.getChildren()), _step3; !(_step3 = _iterator3()).done;) {
        var children = _step3.value;
        this.processMesh(root, children);
      }
    }
    /*
    if (mesh === root) {
        //this.octree = this.scene.createOrUpdateSelectionOctree(); // capacity, maxDepth);
    }
    */


    return mesh;
  };

  _proto.instanceAsThinInstance = function instanceAsThinInstance(key, root, node) {
    var instance = this.catalog[key];
    var meshes = instance.getChildMeshes();

    for (var _iterator4 = _createForOfIteratorHelperLoose(meshes), _step4; !(_step4 = _iterator4()).done;) {
      var mesh = _step4.value;

      if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
        var metadata = mesh.metadata.gltf.extras;

        if (metadata["ddd:light:color"]) {
          // TODO: include the child instance
          continue;
        }
      } // Get root


      var instanceRootKey = root.id + "_" + key + "_" + mesh.id; // root.id + "_" +  // TODO! do not clone but keep groups!

      var meshInstanceRoot = this.instanceRoots[instanceRootKey];

      if (!meshInstanceRoot) {
        //console.debug("Creating instanceroot for: " + instanceRootKey);
        instance.setEnabled(true);
        meshInstanceRoot = mesh.clone(instanceRootKey, null, true);
        meshInstanceRoot = meshInstanceRoot.makeGeometryUnique(); // Can we do this without cloning geometry? do thin instances work that way?

        var cloneMat = meshInstanceRoot.material;

        if (cloneMat) {
          meshInstanceRoot.material = null;
          cloneMat.dispose();
        } //meshInstanceRoot.metadata.gltf.extras['ddd:instance:key'] = "_MESH_INSTANCE_ROOT";  // WARN:seems this extras are being shared among instances


        meshInstanceRoot.toLeftHanded(); //meshInstanceRoot.rotate(Vector3.Up(), Math.PI / 2);
        //meshInstanceRoot.scaling = new Vector3(1, 1, -1);

        this.instanceRoots[instanceRootKey] = meshInstanceRoot;
        meshInstanceRoot.parent = root; //meshInstanceRoot.position = root.computeWorldMatrix(true);  // Seems to cause problems, but should not :? (freezing may be involved)

        this.processMesh(meshInstanceRoot, meshInstanceRoot); // Enable shadows for the instances if shadows are set

        if (this.shadowGenerator) {
          this.shadowGenerator.getShadowMap().renderList.push(meshInstanceRoot);
        } //meshInstanceRoot.setEnabled(false);
        //meshInstanceRoot.addLODLevel(200, null);


        instance.setEnabled(false); //instance.dispose();
      } // Transform

      /*
      let localPos = mesh.position;
      let localRot = mesh.rotationQuaternion;
      let localScaling = mesh.scaling;
      localScaling.x = -1 * localScaling.x;
      var meshMatrix = Matrix.Compose(localScaling, localRot, localPos);
      */
      //var adaptMatrix = Matrix.Compose(new Vector3(1, 1, -1), [0, 1, 0, 0], [0, 0, 0]);


      var scaleMatrix = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Matrix.Compose(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, -1), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Quaternion(0, 0, 0, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0)); //Matrix.Scaling(-1, 1, 1);

      var nodeMatrix = node.computeWorldMatrix(true);
      var meshInstanceRootMatrix = meshInstanceRoot.computeWorldMatrix(true); //let matrix = adaptMatrix.multiply(nodeMatrix); // meshMatrix.multiply(nodeMatrix);

      var matrix = scaleMatrix.multiply(nodeMatrix);
      matrix = matrix.multiply(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Matrix.Invert(meshInstanceRootMatrix)); //console.debug("Creating instance: " + meshInstanceRoot.id);

      meshInstanceRoot.thinInstanceAdd(matrix);
      meshInstanceRoot.freezeWorldMatrix(); //let tmpcopy = meshInstanceRoot.clone();
      //tmpcopy.position = localPos;
      //tmpcopy.rotationQuaternion = localRot;
      //tmpcopy.parent = meshInstanceRoot;
    }

    node.parent = null;
    node.dispose();
  };

  _proto.instanceAsThinInstanceBuffers = function instanceAsThinInstanceBuffers(key, root, node) {
    console.debug("Creating thin instance buffers for: " + key);
    var instance = this.catalog[key];
    var meshes = instance.getChildMeshes();
    var metadataNode = node.metadata.gltf.extras;

    for (var _iterator5 = _createForOfIteratorHelperLoose(meshes), _step5; !(_step5 = _iterator5()).done;) {
      var mesh = _step5.value;
      var metadata = mesh.metadata.gltf.extras;

      if (metadata["ddd:light:color"]) {
        // TODO: include the child instance
        continue;
      } // Get root


      var instanceRootKey = root.id + "_" + key + "_" + mesh.id; // root.id + "_" +  // TODO! do not clone but keep groups!

      var meshInstanceRoot = this.instanceRoots[instanceRootKey];

      if (!meshInstanceRoot) {
        //console.debug("Creating instanceroot for: " + instanceRootKey);
        instance.setEnabled(true);
        meshInstanceRoot = mesh.clone(instanceRootKey, null, true);
        meshInstanceRoot = meshInstanceRoot.makeGeometryUnique(); // Can we do this without cloning geometry? do thin instances work that way?

        var cloneMat = meshInstanceRoot.material;

        if (cloneMat) {
          meshInstanceRoot.material = null;
          cloneMat.dispose();
        } //meshInstanceRoot.metadata.gltf.extras['ddd:instance:key'] = "_MESH_INSTANCE_ROOT";  // WARN:seems this extras are being shared among instances
        //meshInstanceRoot.toRightHanded();
        //meshInstanceRoot.rotate(Vector3.Right(), Math.PI / 2);
        // This section is critical. The bakeCurrentTransformIntoVertices in the middle is too.


        meshInstanceRoot.scaling = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, -1);
        meshInstanceRoot.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Up(), -Math.PI / 2);
        meshInstanceRoot.bakeCurrentTransformIntoVertices();
        meshInstanceRoot.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Forward(), -Math.PI / 2);
        meshInstanceRoot.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Right(), Math.PI);
        meshInstanceRoot.bakeCurrentTransformIntoVertices(); //meshInstanceRoot.flipFaces(true);

        this.instanceRoots[instanceRootKey] = meshInstanceRoot;
        meshInstanceRoot.parent = root; //meshInstanceRoot.position = root.computeWorldMatrix(true);  // Seems to cause problems, but should not :? (freezing may be involved)

        this.processMesh(meshInstanceRoot, meshInstanceRoot); // Enable shadows for the instances if shadows are set

        if (this.shadowGenerator) {
          this.shadowGenerator.getShadowMap().renderList.push(meshInstanceRoot);
        } //meshInstanceRoot.setEnabled(false);
        //meshInstanceRoot.addLODLevel(200, null);


        instance.setEnabled(false); //instance.dispose();
      } //var adaptMatrix = Matrix.Compose(new Vector3(1, 1, -1), [0, 1, 0, 0], [0, 0, 0]);


      var bufferMatrices = metadataNode["ddd:instance:buffer:matrices"]; //const scaleMatrix = Matrix.Compose( new Vector3( 1, 1, -1 ), new Quaternion( 0, 0, 0, 0 ), new Vector3( 0, 0, 0 )); //Matrix.Scaling(-1, 1, 1);
      //let nodeMatrix = node.computeWorldMatrix(true);
      //let meshInstanceRootMatrix = meshInstanceRoot.computeWorldMatrix(true);
      //let matrix = adaptMatrix.multiply(nodeMatrix); // meshMatrix.multiply(nodeMatrix);
      //let matrix = scaleMatrix.multiply(nodeMatrix);
      //matrix = matrix.multiply(Matrix.Invert(meshInstanceRootMatrix));
      //console.debug("Creating instance: " + meshInstanceRoot.id);
      //var idx = meshInstanceRoot.thinInstanceAdd(matrix);

      var bufferMatricesArray = new Float32Array(bufferMatrices.length);
      bufferMatricesArray.set(bufferMatrices);
      meshInstanceRoot.thinInstanceSetBuffer("matrix", bufferMatricesArray, 16, true);
      meshInstanceRoot.freezeWorldMatrix(); //let tmpcopy = meshInstanceRoot.clone();
      //tmpcopy.position = localPos;
      //tmpcopy.rotationQuaternion = localRot;
      //tmpcopy.parent = meshInstanceRoot;
    }

    node.parent = null;
    node.dispose();
  };

  _proto.instanceAsNode = function instanceAsNode(key, _root, mesh) {
    //console.debug("Replacing mesh: " + key);
    var newMesh = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.TransformNode(mesh.id + "_instance", this.scene); // new Mesh("chunk_" + tileKey, this.scene);
    //let newMesh = mesh;
    //newMesh.geometry = null;

    newMesh.parent = mesh.parent;
    newMesh.position = mesh.position;
    newMesh.rotationQuaternion = mesh.rotationQuaternion;
    newMesh.scaling = mesh.scaling; //newMesh.absoluteScaling = mesh.absoluteScaling;

    /*for (let cc of mesh.getChildren()) {
        cc.parent = null;
        cc.dispose();
    }*/

    if (!newMesh.metadata) {
      newMesh.metadata = {};
    }

    if (mesh.metadata && mesh.metadata.gltf) {
      newMesh.metadata.gltf = mesh.metadata.gltf; //newMesh.metadata.gltf.extras['ddd:instance:key'] = null;
    }

    mesh.dispose();
    this.catalog[key].setEnabled(true);
    var instance = this.catalog[key].clone(); // createInstance(mesh.id + "_instanced");

    this.catalog[key].setEnabled(false);
    instance.metadata.gltf.extras["ddd:instance:key"] = null;
    instance.id = mesh.id + "_clone"; //instance.isVisible = true;

    instance.parent = newMesh;
    newMesh.rotate(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, 0), Math.PI / 2, _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Space.LOCAL);
    instance.setEnabled(true); //mesh = newMesh;
  }
  /**
   * Dispose this DDDViewer instance.
   * @todo Ensure all events, processes and objects are disconnected and disposed.
   */
  ;

  _proto.dispose = function dispose() {
    if (this.scene) {
      console.debug("Disposing SceneViewer scene.");
      this.scene.dispose(); //this.scene = null;
    }

    if (this.engine) {
      console.debug("Disposing SceneViewer 3D engine (BabylonJS).");
      this.engine.dispose(); //this.engine = null;
    }
  }
  /**
   * DDDViewer main update callback, this is called every frame by the engine.
   * Children object update method is called recursively from here (sequencer, processes, layers).
   * @param deltaTime
   */
  ;

  _proto.update = function update(deltaTime) {
    var positionWGS84 = this.positionWGS84();

    if (positionWGS84) {
      this.viewerState.positionWGS84 = positionWGS84;
      this.viewerState.positionTileZoomLevel = 17;

      if (this.viewerState.positionGroundHeight !== null && this.viewerState.positionGroundHeight < 50) {
        this.viewerState.positionTileZoomLevel = 18;
      }

      this.updateElevation();
      var terrainElevation = this.viewerState.positionTerrainElevation; // Fix viewer to floor

      if (this.walkMode) {
        if (terrainElevation !== null && this.camera) {
          this.camera.position.y = terrainElevation + this.viewerState.sceneCameraWalkHeight; // 3.0;
        }
      } else {
        if (terrainElevation && this.camera && this.camera.position.y < terrainElevation + 1.0) {
          this.camera.position.y = terrainElevation + 1.0;
        }
      }

      if (this.camera) {
        if (this.camera instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.ArcRotateCamera) {
          var heading = -90 + -this.camera.alpha * (180.0 / Math.PI);
          heading = (heading % 360 + 360) % 360;
          this.viewerState.positionHeading = heading;
          var tilt = this.camera.beta * (180.0 / 3.14159265359);
          this.viewerState.positionTilt = tilt;
        } else if (this.camera instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.TargetCamera) {
          var _heading = this.camera.rotation.y * (180.0 / Math.PI);

          _heading = (_heading % 360 + 360) % 360;
          this.viewerState.positionHeading = _heading;
          var yaw = this.camera.rotation.x * (180.0 / 3.14159265359);
          this.viewerState.positionTilt = 90.0 - yaw;
        }
      }
    }

    if (this.camera) {
      var positionScene = this.camera.position.asArray();
      positionScene = [positionScene[0], positionScene[1], positionScene[2]]; // Copy array

      this.viewerState.positionScene = positionScene;

      if (this.envReflectionProbe) {
        this.envReflectionProbe.position = this.camera.position.clone();
      }
    } //this.sequencer.update( deltaTime );
    //this.processes.update( deltaTime );


    this.layerManager.update(deltaTime);
    this.viewerState.sceneFPS = this.engine.getFps(); // this.engine.getFps().toFixed( 1 );

    this.viewerState.sceneDrawCalls = this.sceneInstru ? this.sceneInstru.drawCallsCounter.current : 0;
    this.viewerState.sceneTriangles = this.sceneInstru ? this.scene.getActiveIndices() / 3 : 0; // Run time
    // TODO: this currently requires a minimum elapsed time so Date.setSeconds work. This approach accumulates error.

    var updateInterval = 100; // 5000;

    var maxUpdateElapsed = 2000; // 2 sec

    {
      var currentDateUpdate = new Date().getTime();

      if (currentDateUpdate - this.lastDateUpdate > updateInterval) {
        var updateElapsed = currentDateUpdate - this.lastDateUpdate;
        this.lastDateUpdate = currentDateUpdate;

        if (updateElapsed > maxUpdateElapsed) {
          updateElapsed = maxUpdateElapsed;
        }

        var scaledElapsed = updateElapsed / 1000 * (24 * 2); // 24 * 2 = 48x faster (1 day = 30 min)
        //if (this.viewerState.positionDate.getHours() < 5) { scaledElapsed *= 3; }  // Faster pace at night

        this.viewerState.positionDate.setSeconds(this.viewerState.positionDate.getSeconds() + scaledElapsed);
        this.viewerState.positionDateSeconds = this.viewerState.positionDate.getTime() / 1000; // TODO: Temporarily disabled
        //this.lightSetupFromDatePos();
      }
    } //this.skybox.computeWorldMatrix();  // only needed if scene.freezeActiveMeshes is true
  };

  _proto.sceneToWGS84 = function sceneToWGS84(coords) {
    //let wgs84Pos = this.originShiftWGS84;
    //const point = olProj.transform([coords[0], coords[2]], this.projection, 'EPSG:4326');
    var point = this.projection.inverse([coords[0], coords[2]]);
    return [point[0], point[1], coords[1]];
  };

  _proto.wgs84ToScene = function wgs84ToScene(coords) {
    //const point = olProj.transform(coords, 'EPSG:4326', this.projection);
    var point = this.projection.forward(coords);
    return [point[0], coords[2], point[1]];
  };

  _proto.positionWGS84 = function positionWGS84() {
    var scenePos = this.camera.position.asArray();
    var wgs84Pos = this.sceneToWGS84([scenePos[0], scenePos[1], scenePos[2]]);
    return wgs84Pos;
    /*
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    */
  };

  _proto.parsePositionString = function parsePositionString(posString) {
    //console.debug("Parsing: " + posString);
    var result = new ScenePosition();

    try {
      // Parse at location
      //http://localhost:8080/maps/@42.1354407,-0.4126472,17.0z
      var href = posString;
      var regexp = /.*@([0-9.\\-]+),([0-9.\\-]+)((,(([0-9.\\-]+)[ayhtz]))*).*/;
      var matches = href.match(regexp); //console.debug(matches);

      if (matches && matches.length >= 3) {
        result.positionWGS84 = [parseFloat(matches[2]), parseFloat(matches[1])];
      }

      if (matches && matches.length >= 4) {
        for (var _iterator6 = _createForOfIteratorHelperLoose(matches[3].split(",")), _step6; !(_step6 = _iterator6()).done;) {
          var match = _step6.value;

          if (match === "") {
            continue;
          }

          var value = parseFloat(match.slice(0, -1));
          var code = match.slice(-1);

          if (code === "z") {
            result.positionTileZoomLevel = value;
          } else if (code === "a") {
            result.positionGroundHeight = value;
          } else if (code === "h") {
            result.positionHeading = value;
          } else if (code === "t") {
            result.positionTilt = value;
          } //console.debug(value, code);

        }
      }
    } catch (e) {
      console.debug("Error parsing location from href: " + e);
    } //let positionWgs84 = this.getViewerState().positionWGS84;


    return result;
  };

  _proto.positionString = function positionString() {
    // /@43.2505933,5.3736631,126a,35y,20.08h,56.42t/
    var point = this.positionWGS84(); //const zoom = this.map.getView().getZoom();
    //let heading = (this.camera.rotation.y * (180.0 / 3.14159265359));
    //heading = (heading % 360 + 360) % 360;

    var heading = this.viewerState.positionHeading; //let yaw = this.camera.rotation.x * (180.0 / 3.14159265359);

    var tilt = this.viewerState.positionTilt; //let height = this.camera.position.y;

    var groundHeight = this.viewerState.positionGroundHeight;

    if (groundHeight === null) {
      //return this.camera.position.y;
      return null;
    }

    var posString = "@" + point[1].toFixed(7) + "," + point[0].toFixed(7);
    {
      posString = posString + "," + groundHeight + "a"; // seems Ground M  ... (not WGS84 height (with EGM))

      posString = posString + "," + "35" + "y"; // ?

      posString = posString + "," + heading.toFixed(1) + "h"; // Heading

      posString = posString + "," + tilt.toFixed(2) + "t"; // Yaw (0 is vertical, 90 horizontal)
    }
    return posString;
  };

  _proto.updateElevation = function updateElevation() {
    if (!this.camera) return; //const ray = new Ray(this.camera.position, new Vector3(0, -1, 0));

    var ray = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Ray(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(this.camera.position.x, -100.0, this.camera.position.z), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), 3000.0);
    var pickResult = this.scene.pickWithRay(ray); //const pickResult = null;

    if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== "skyBox") {
      if (pickResult.pickedMesh.metadata && pickResult.pickedMesh.metadata.gltf && pickResult.pickedMesh.metadata.gltf.extras && pickResult.pickedMesh.metadata.gltf.extras["osm:name"]) {
        this.viewerState.positionName = pickResult.pickedMesh.metadata.gltf.extras["osm:name"];
      } else {
        this.viewerState.positionName = null;
      }

      var terrainElevation = pickResult.distance - 100.0;
      this.viewerState.positionTerrainElevation = terrainElevation;
      this.viewerState.positionGroundHeight = this.camera.position.y - terrainElevation;
    }
  }
  /*
  positionGroundHeight() {
      //const ray = new Ray(this.camera.position, new Vector3(0, -1, 0));
      const ray = new Ray(new Vector3(this.camera.position.x, -100.0, this.camera.position.z), new Vector3(0, 1, 0), 3000.0);
      const pickResult = this.scene.pickWithRay(ray);
      if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {
          //console.debug(pickResult.pickedMesh.id);
          return this.camera.position.y - (pickResult.distance - 100.0);
      } else {
          return null;
      }
  }
   positionTerrainElevation() {
      //const ray = new Ray(this.camera.position, new Vector3(0, -1, 0));
      const ray = new Ray(new Vector3(this.camera.position.x, -100.0, this.camera.position.z), new Vector3(0, 1, 0), 3000.0);
      const pickResult = this.scene.pickWithRay(ray);
      if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {
           if (pickResult.pickedMesh.metadata && pickResult.pickedMesh.metadata.gltf && pickResult.pickedMesh.metadata.gltf.extras && pickResult.pickedMesh.metadata.gltf.extras['osm:name']) {
              this.viewerState.positionName = pickResult.pickedMesh.metadata.gltf.extras['osm:name'];
          } else {
              this.viewerState.positionName = null;
          }
           return (pickResult.distance - 100.0);
      } else {
          return null;
      }
  }
  */

  /**
   * Untested
   * (from: https://gist.github.com/spite/051604efd1d971ab4b6ef1bc1ae2636e)
   */

  /*
  _getTileFromLatLon(zoom, lat, lon) {
      const width = Math.pow(2, zoom);
      const height = Math.pow(2, zoom);
      const latRad = (lat * Math.PI) / 180;
      const x = ~~((width * (lon + 180)) / 360);
      const y = ~~(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2.0) * height);
      return {zoom, x, y};
  }
  */
  ;

  _proto.registerProjectionForCoords = function registerProjectionForCoords(coords) {
    console.debug("Setting Scene Geo transform for coords: " + coords); // Get tile grid coordinates

    var coordsUtm = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(coords, "EPSG:4326", "EPSG:3857");
    var tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);
    var tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
    var tileCenter = (0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getCenter)(tileExtent);
    var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326"); // Using coords of tile center for custom projection as DDD does

    this.projection = (0,proj4__WEBPACK_IMPORTED_MODULE_4__.default)("+proj=tmerc +lat_0=" + tileCenterWGS84[1] + " +lon_0=" + tileCenterWGS84[0] + " +k_0=1 " + "+x_0=0. +y_0=0. +datum=WGS84 +ellps=WGS84 " + "+towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  };

  _proto.deselectMesh = function deselectMesh() {
    if (this.selectedMesh) {
      //this.viewerState.selectedMesh.showBoundingBox = false;
      for (var _iterator7 = _createForOfIteratorHelperLoose(this.highlightMeshes), _step7; !(_step7 = _iterator7()).done;) {
        var mesh = _step7.value;
        mesh.dispose();
      }

      this.highlightMeshes = [];
      this.selectedMesh = null;
      this.viewerState.sceneSelectedMeshId = null;
    }
  };

  _proto.findMeshById = function findMeshById(meshId, node) {
    if (node === void 0) {
      node = null;
    }

    var children = null;

    if (node) {
      var nodeUrlId = node.id.split("/").pop().replaceAll("#", "_");

      if (nodeUrlId === meshId) {
        return node;
      }

      children = node.getChildren();
    } else {
      children = this.scene.rootNodes;
    }

    for (var _iterator8 = _createForOfIteratorHelperLoose(children), _step8; !(_step8 = _iterator8()).done;) {
      var child = _step8.value;
      var result = this.findMeshById(meshId, child);

      if (result !== null) {
        return result;
      }
    }

    return null;
  };

  _proto.selectMeshById = function selectMeshById(meshId, highlight) {
    var mesh = null;
    mesh = this.findMeshById(meshId);
    if (mesh) this.selectMesh(mesh, highlight);
  };

  _proto.selectMesh = function selectMesh(mesh, highlight) {
    var _this4 = this;

    this.deselectMesh();

    if (mesh) {
      this.selectedMesh = mesh;
      this.viewerState.sceneSelectedMeshId = mesh.id; //this.viewerState.selectedMesh.showBoundingBox = true;
      //console.debug(this.viewerState.selectedMesh.metadata.gltf.extras);

      if (highlight) {
        // Highlight
        //that.highlightLayer.addMesh(pickResult.pickedMesh, Color3.White()); // , true);
        //pickResult.pickedMesh.material = that.materialHighlight;
        //pickResult.pickedMesh.material = that.materialGrass;
        // Prepare the wireframe mesh
        // To disable depth test check rendering groups:  https://forum.babylonjs.com/t/how-do-i-disable-depth-testing-on-a-mesh/1159
        var highlightClone = mesh.clone(); // Iterate clone recursively to set highlight material to all submeshes

        var setHighlightRecursively = function setHighlightRecursively(submesh) {
          submesh.material = _this4.materialHighlight;

          for (var _iterator9 = _createForOfIteratorHelperLoose(submesh.getChildren()), _step9; !(_step9 = _iterator9()).done;) {
            var mc = _step9.value;
            setHighlightRecursively(mc);
          }
        };

        setHighlightRecursively(highlightClone); //highlightClone.material = this.materialHighlight;

        highlightClone.parent = mesh.parent;
        this.highlightMeshes.push(highlightClone);
      }
    }
  };

  _proto.getBoundsRecursively = function getBoundsRecursively(node, bounds) {
    if (!bounds) {
      //bounds = { minimumWorld: { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY },
      //    maximumWorld: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY, z: Number.NEGATIVE_INFINITY } };
      bounds = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.BoundingInfo(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY));
    }

    if (node.getBoundingInfo) {
      var minWorld = node.getBoundingInfo().boundingBox.minimumWorld;
      var maxWorld = node.getBoundingInfo().boundingBox.maximumWorld;

      if (bounds.minimum.x > minWorld.x) {
        bounds.minimum.x = minWorld.x;
      }

      if (bounds.minimum.y > minWorld.y) {
        bounds.minimum.y = minWorld.y;
      }

      if (bounds.minimum.z > minWorld.z) {
        bounds.minimum.z = minWorld.z;
      }

      if (bounds.maximum.x < maxWorld.x) {
        bounds.maximum.x = maxWorld.x;
      }

      if (bounds.maximum.y < maxWorld.y) {
        bounds.maximum.y = maxWorld.y;
      }

      if (bounds.maximum.z < maxWorld.z) {
        bounds.maximum.z = maxWorld.z;
      }
    }

    for (var _iterator10 = _createForOfIteratorHelperLoose(node.getChildren()), _step10; !(_step10 = _iterator10()).done;) {
      var nc = _step10.value;
      bounds = this.getBoundsRecursively(nc, bounds);
    }

    return bounds;
  }
  /*
  * Find a node within a scene or node recursively.
  * Criteria is a dictionary of key=value pairs. An object will match if any of the pairs matches object's metadata.
  */
  ;

  _proto.findNode = function findNode(node, criteria) {
    //console.debug(node);
    if (criteria["_node_name"] && node.id) {
      var name = node.id.split("/").pop().replaceAll("#", "_");

      if (name === criteria["_node_name"]) {
        return node;
      }
    }

    if (node.metadata && node.metadata.gltf && node.metadata.gltf.extras) {
      var metadata = node.metadata.gltf.extras;

      for (var key in criteria) {
        if (metadata[key] === criteria[key]) {
          return node;
        }
      }
    }

    for (var _iterator11 = _createForOfIteratorHelperLoose(node.getChildren()), _step11; !(_step11 = _iterator11()).done;) {
      var sn = _step11.value;
      var result = this.findNode(sn, criteria);

      if (result) {
        return result;
      }
    }

    return null;
  };

  _proto.updateRenderPipeline = function updateRenderPipeline() {
    this.scene.postProcessesEnabled = this.viewerState.scenePostprocessingEnabled;

    if (!this.viewerState.scenePostprocessingEnabled) {
      return;
    }
  };

  _proto.initRenderPipeline = function initRenderPipeline() {
    // Postprocess
    // The default pipeline applies other settings, we'd better off using Bloom independently if possible
    // Also note this is tied to the camera, and thus if used, this should be updated when the camera changes
    var defaultPipeline = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.DefaultRenderingPipeline("default", true, this.scene, [this.camera]);
    defaultPipeline.fxaaEnabled = true;
    defaultPipeline.bloomEnabled = true;
    defaultPipeline.bloomWeight = 1.0; // 1.5 is exagerated but maybe usable for pics
    //defaultPipeline.cameraFov = this.camera.fov;

    defaultPipeline.imageProcessing.toneMappingEnabled = true; //var postProcessHighlights = new HighlightsPostProcess("highlights", 0.1, camera);
    //var postProcessTonemap = new TonemapPostProcess("tonemap", TonemappingOperator.Hable, 1.2, camera);
    // See: https://doc.babylonjs.com/divingDeeper/postProcesses/postProcessRenderPipeline

    /*
    var standardPipeline = new PostProcessRenderPipeline(this.engine, "standardPipeline");
    var effectBloom = new BloomEffect(this.scene, 4, 5.0, 2.0);
    //var effectDepthOfField = new DepthOfFieldEffect(this.scene);
    var postProcessChain = new PostProcessRenderEffect(this.engine, "postProcessChain", function() { return [effectBloom, effectDepthOfField] });
    standardPipeline.addEffect(effectBloom);
    this.scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
    */

    var lensRenderingPipeline = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.LensRenderingPipeline("lens", {
      edge_blur: 0.25,
      chromatic_aberration: 1.0,
      distortion: 0.5,
      dof_focus_distance: 60,
      dof_aperture: 1.0,
      grain_amount: 0.0,
      dof_pentagon: false,
      dof_gain: 1.0,
      dof_threshold: 1.0,
      dof_darken: 0.25
    }, this.scene, 1.0, [this.camera]); //this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline('lensEffects', camera);

    /*
    const ssao = new SSAO2RenderingPipeline('ssao', this.scene, {
      ssaoRatio: .5,
      blurRatio: 1
    }, [ this.camera ], true)
    */

    /*
    var curve = new ColorCurves();
    curve.globalHue = 0;
    curve.globalDensity = 80;
    curve.globalSaturation = 5;
    curve.highlightsHue 0;
    curve.highlightsDensity = 80;
    curve.highlightsSaturation = 40;
    curve.shadowsHue = 0;
    curve.shadowsDensity = 80;
    curve.shadowsSaturation = 40;
    this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    this.scene.imageProcessingConfiguration.colorCurves = curve;
    var postProcess = new ImageProcessingPostProcess("processing", 1.0, camera);
    */

    /*
    // Fog
    //this.scene.fogMode = Scene.FOGMODE_EXP;
    //this.scene.fogDensity = 0.005;  // default is 0.1
    this.scene.fogMode = Scene.FOGMODE_LINEAR;
    this.scene.fogStart = 250.0;
    this.scene.fogEnd = 500.0;
    this.scene.fogColor = new Color3(0.75, 0.75, 0.85);
    */

    /*
    pixels = rp.cubeTexture.readPixels(0,0)
    // i take the first pixel of the reflection probe texture for fog color.
    // since pixels are stored as buffer array, first pixel are first 4 values of array [r,g,b,a....]
    scene.fogColor = new Color3(pixels[0]/255, pixels[1]/255, pixels[2]/255)
    */
  };

  _proto.selectCameraFree = function selectCameraFree() {
    if (this.camera) {
      this.camera.customRenderTargets = [];
      this.camera.detachControl();
      this.camera.dispose();
    } //console.debug("Creating free camera.");


    this.walkMode = false;
    var camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.UniversalCamera("Camera", _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), this.scene);
    camera.minZ = 1;
    camera.maxZ = 4500;
    camera.angularSensibility = 500.0;
    camera.touchAngularSensibility = 1000.0; //camera.touchMoveSensibility = 1.0;
    //camera.inertia = 0.10;

    camera.inertia = 0.5;
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.keysUpward.push(81);
    camera.keysDownward.push(69);
    camera.attachControl(this.engine.getRenderingCanvas(), true);
    camera.fov = 40.0 * (Math.PI / 180.0); // 35.0 might be GM, 45.8... is default  // 35

    var positionScene = this.wgs84ToScene(this.viewerState.positionWGS84);
    camera.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(positionScene[0], this.viewerState.positionGroundHeight + this.viewerState.positionTerrainElevation + 1, positionScene[2]);
    camera.rotation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3((90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0), this.viewerState.positionHeading * (Math.PI / 180.0), 0.0); //camera.cameraRotation = new Vector2(/* (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0) */ 0, this.viewerState.positionHeading * (Math.PI / 180.0));

    this.camera = camera;
    this.setMoveSpeed(this.viewerState.sceneMoveSpeed);
    this.updateRenderTargets();
  };

  _proto.selectCameraWalk = function selectCameraWalk() {
    this.selectCameraFree();
    this.walkMode = true;
    this.camera.inertia = 0.0;
    this.setMoveSpeed(this.viewerState.sceneMoveSpeed);
  }
  /*
  geolocationPosition( enabled ) {
       //this.selectCameraFree();
      //this.walkMode = true;
      //this.camera.detachControl();
       /-
      this.app.$getLocation({enableHighAccuracy: true}).then(coordinates => {
          console.log(coordinates);
          let altitude = coordinates.altitude !== null ? coordinates.altitude : 2.0;
          let scenePos = this.wgs84ToScene([coordinates.lng, coordinates.lat, altitude]);
          //console.log(scenePos);
          this.camera.position.x = scenePos[0];
          this.camera.position.y = altitude;
          this.camera.position.z = scenePos[2];
           let heading = coordinates.heading;
          if (heading) {
              this.sceneViewer.viewerState.positionHeading = heading;
              let rotation = new Vector3((90.0 - this.sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), this.sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
              this.camera.rotation = rotation;
          }
      });
      -/
       this.viewerState.geolocationEnabled = enabled;
       if ( enabled ) {
           const that = this;
           // Enable geolocation
          this.selectCameraFree();
           //this._geolocationWatchId = this.app.$watchLocation({enableHighAccuracy: true, maximumAge: 5}).then(coordinates => {
          this.app.$getLocation({ enableHighAccuracy: true, maximumAge: 5 }).then(( coords ) => { that.onDeviceLocation( coords ); });
           // Compass
          this._onDeviceOrientation = function( e ) { that.onDeviceOrientation( e ); };
          this._onDeviceOrientation.bind( that );
          const isIOS = false;
          if ( isIOS ) {
              DeviceOrientationEvent.requestPermission().then(( response ) => {
                  if ( response === "granted" ) {
                      window.addEventListener( "deviceorientation", this._onDeviceOrientation );
                  } else {
                      alert( "Compass usage permission not granted." );
                  }
              }).catch(() => alert( "Compass not supported." ));
          } else {
              window.addEventListener( "deviceorientationabsolute", this._onDeviceOrientation );
          }
       } else  {
           // Disable geolocation
           this.viewerState.geolocationEnabled = false;
          if ( this._geolocationWatchId !== null ) {
              this.app.$clearLocationWatch( this._geolocationWatchId );
              this._geolocationWatchId = null;
          }
          window.removeEventListener( "deviceorientationabsolute", this._onDeviceOrientation );
          window.removeEventListener( "deviceorientation", this._onDeviceOrientation );
          this._onDeviceOrientation = null;
      }
   }
   onDeviceLocation( coordinates ) {
      //console.log(coordinates);
      if ( coordinates ) {
           const altitude = coordinates.altitude !== null ? coordinates.altitude : 2.0;
          if ( this.walkMode ) { altitude.y = 2.5; }
           this.viewerState.positionWGS84 = [ coordinates.lng, coordinates.lat, altitude ];
          const scenePos = this.wgs84ToScene( this.viewerState.positionWGS84 );
          this.viewerState.positionScene = scenePos;
           this.camera.position.x = scenePos[0];
          this.camera.position.y = altitude;
          this.camera.position.z = scenePos[2];
           /-
          let heading = coordinates.heading;
          if (heading !== null && !isNaN(heading)) {
              this.viewerState.positionHeading = heading;
              let rotation = new Vector3((90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0), this.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
              this.camera.rotation = rotation;
              //console.debug(heading);
          }
          -/
      }
       if ( this.viewerState.geolocationEnabled ) {
          const that = this;
          setTimeout( function() {
              that.app.$getLocation({ enableHighAccuracy: true, maximumAge: 5 }).then(( coords ) => { that.onDeviceLocation( coords ); });
          }, 1000 );
      }
   }
  */

  /**
  * From: https://www.w3.org/TR/orientation-event/
  */

  /*
  getQuaternion( alpha, beta, gamma ) {
       var degtorad = Math.PI / 180; // Degree-to-Radian conversion
     var _x = beta  ? beta  * degtorad : 0; // beta value
    var _y = gamma ? gamma * degtorad : 0; // gamma value
    var _z = alpha ? alpha * degtorad : 0; // alpha value
     var cX = Math.cos( _x/2 );
    var cY = Math.cos( _y/2 );
    var cZ = Math.cos( _z/2 );
    var sX = Math.sin( _x/2 );
    var sY = Math.sin( _y/2 );
    var sZ = Math.sin( _z/2 );
     //
    // ZXY quaternion construction.
    //
     var w = cX * cY * cZ - sX * sY * sZ;
    var x = sX * cY * cZ - cX * sY * sZ;
    var y = cX * sY * cZ + sX * cY * sZ;
    var z = cX * cY * sZ + sX * sY * cZ;
     //return [ w, x, y, z ];
    return new Quaternion(x, y, z, w);
  }
  */

  /*
  onDeviceOrientation( e ) {
       //let rotation = Quaternion.FromEulerAngles(e.alpha * Math.PI / 180.0, e.beta * Math.PI / 180.0, e.gamma * Math.PI / 180.0);
      //let forward = Vector3.Forward().rotateByQuaternionToRef(rotation, new Vector3());
      //let heading = Math.atan2(forward.y, forward.x) * 180.0 / Math.PI;
      //alert(heading);
       let heading = e.webkitCompassHeading || Math.abs( e.alpha - 360 );
       if ( heading !== null && !isNaN( heading )) {
           heading = ( heading ) % 360.0;
          this.viewerState.positionHeading = heading;
           let tilt = e.webkitCompassTilt || Math.abs( e.beta - 360 );
          if ( tilt !== null && !isNaN( tilt )) {
              this.viewerState.positionTilt = ( - tilt );
          }
           const tiltRotation = ( 90.0 - this.viewerState.positionTilt ) * ( Math.PI / 180.0 );
          if ( tiltRotation < 0 ) { tilt = Math.PI * 2 - tiltRotation; }
          const rotation = new Vector3( tiltRotation, this.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );
          //let rotation = new Vector3(Math.PI / 2 + -e.beta * Math.PI / 180.0, -e.alpha * Math.PI / 180.0, e.gamma * Math.PI / 180.0 );
          this.camera!.rotation = rotation;
          //console.debug(heading);
      }
      //compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
  }
  */
  ;

  _proto.selectCameraOrbit = function selectCameraOrbit() {
    this.walkMode = false;
    var targetCoords = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();

    if (this.selectedMesh) {
      var boundingBox = this.getBoundsRecursively(this.selectedMesh); //targetCoords = this.selectedMesh.absolutePosition;

      var minWorld = boundingBox.minimum;
      var maxWorld = boundingBox.maximum;
      targetCoords = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3((minWorld.x + maxWorld.x) / 2, (minWorld.y + maxWorld.y) / 2, (minWorld.z + maxWorld.z) / 2);
    }

    var distance = 75.0;

    if (this.camera) {
      distance = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(this.camera.position, targetCoords);
      this.camera.customRenderTargets = [];
      this.camera.detachControl();
      this.camera.dispose();
    }

    console.debug("Creating orbit camera pointing to: " + targetCoords);
    var camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.ArcRotateCamera("Camera", -(90 + this.viewerState.positionHeading) * Math.PI / 180.0, this.viewerState.positionTilt * Math.PI / 180.0, distance, targetCoords, this.scene);
    camera.attachControl(this.engine.getRenderingCanvas(), true);
    camera.minZ = 1; //camera.maxZ = 2500;  // Automatic? see focusOn()

    camera.lowerRadiusLimit = 15;
    camera.upperRadiusLimit = 1000;
    camera.upperBetaLimit = Math.PI; // /2; // Math.PI / 2 = limit to flat view

    camera.panningSensibility = 50.0; // 0.5;
    //camera.angularSensibility = 50.0;
    //camera.inertia = 0.10;
    //camera.multiTouchPanning = false;
    //camera.multiTouchPanAndZoom = false;
    //camera.pinchZoom = true;

    camera.useNaturalPinchZoom = true;
    camera.fov = 35.0 * (Math.PI / 180.0);
    this.camera = camera;
    this.updateRenderTargets();
  };

  _proto.updateRenderTargets = function updateRenderTargets() {
    if (this.camera && this.envReflectionProbe) {
      this.camera.customRenderTargets.push(this.envReflectionProbe.cubeTexture);
    } //this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.camera);

  }
  /*
  groundTextureLayerSetKey( key: string ): void {
       this.viewerState.sceneGroundTextureOverride = key;
       let url = null;
      const layers = this.viewerState.dddConfig.sceneGroundLayers;
      if ( layers[key]) {
          url = layers[key].url;
      }
      this.layerManager.layers["ddd-osm-3d"].groundTextureLayerSetUrl( url );
  }
  */
  ;

  _proto.setMoveSpeed = function setMoveSpeed(speed) {
    this.viewerState.sceneMoveSpeed = speed;

    if (this.camera && this.camera instanceof _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.TargetCamera) {
      this.camera.speed = speed;
    }
  };

  _proto.cycleMoveSpeed = function cycleMoveSpeed() {
    if (this.viewerState.sceneMoveSpeed < 5.0) {
      this.setMoveSpeed(5.0);
    } else if (this.viewerState.sceneMoveSpeed < 10.0) {
      this.setMoveSpeed(10.0);
    } else {
      this.setMoveSpeed(2.0);
    }
  }
  /*
  lightSetupFromDatePos(): void {
       //this.envReflectionProbe.update(); // = new ReflectionProbe("envReflectionProbe", 128, this.scene, true, true, true)
      //this.envReflectionProbe.renderList.push(this.skyBox);
      //this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;
       //console.debug(this.envReflectionProbe.cubeTexture.readPixels(0, 0));
      const times = SunCalc.getTimes( this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
       const sunriseStr = times.sunrise.getHours() + ":" + times.sunrise.getMinutes();
      const sunsetStr = times.sunset.getHours() + ":" + times.sunset.getMinutes();
       // get position of the sun (azimuth and altitude) at today's sunrise
      ///*var sunrisePos = SunCalc.getPosition(times.sunrise, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
      //var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
      //var sunsetSunPos = SunCalc.getPosition(times.sunset, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
      //var sunsetAzimuth = sunsetPos.azimuth * 180 / Math.PI; **
       const currentSunPos = SunCalc.getPosition( this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0], this.viewerState.positionScene[1]);
      const currentMoonPos = SunCalc.getMoonPosition( this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
      //var crrentMoonIlum = SunCalc.getMoonIllumination(this.viewerState.positionDate);
       //var currentPos = currentSunPos.altitude > 0 ? currentSunPos : currentMoonPos;
       //var currentElevation = currentPos.altitude * 180 / Math.PI;
      //var currentAzimuth = currentPos.azimuth * 180 / Math.PI;
      //console.debug("Sun azimuth: " + currentAzimuth + " ele: " + currentElevation + " Date: " + this.viewerState.positionDate + " Sunrise: " + sunriseStr + " azimuth: " + sunriseAzimuth + " Sunset: " + sunsetStr + " azimuth: " + sunsetAzimuth);
       const altitudeLessHorizonAtmAprox = ( currentSunPos.altitude + 0.25 ) / ( Math.PI + 0.25 ) * Math.PI; // 0.25~15rad
      let sunlightAmountNorm = Math.sin( altitudeLessHorizonAtmAprox );
      if ( sunlightAmountNorm < 0 ) { sunlightAmountNorm = 0; }
      sunlightAmountNorm = 1 - Math.pow( 1 - sunlightAmountNorm, 4 );
       //let lightAltitude = altitudeLessHorizonAtmAprox >= 0 && altitudeLessHorizonAtmAprox < Math.PI ? altitudeLessHorizonAtmAprox : Math.PI - altitudeLessHorizonAtmAprox;
      const lightRot = Quaternion.FromEulerAngles( currentSunPos.altitude, currentSunPos.azimuth, 0 );  // Use moon
      const lightSunAndFlareRot = Quaternion.FromEulerAngles( currentSunPos.altitude, currentSunPos.azimuth, 0 );
       //this.light = new DirectionalLight("light", new Vector3(0.3, -0.5, 0.5).normalizeToNew(), this.scene);
      //this.light.diffuse = new Color3(0.95, 0.95, 1.00);
      //this.light.specular = new Color3(1, 1, 0.95);
      const minLightDay = 0.0;
      const maxLightDay = 3.0;
       // Set light dir and intensity
      Vector3.Forward().rotateByQuaternionToRef( lightRot, this.light.direction );
      const lightIntensity = minLightDay + ( maxLightDay - minLightDay ) * sunlightAmountNorm;
      //console.debug("Sunlight amount norm: " + sunlightAmountNorm + " lightIntensity: " + lightIntensity);
      this.light.intensity = lightIntensity;
        //this.scene.environmentTexture.level = 0; // 0.1 + sunlightAmountNorm; // = hdrTexture;
      //this.scene.environmentTexture.level = 0.1 + sunlightAmountNorm; // = hdrTexture;
      //Color3.LerpToRef(this.ambientColorNight, this.ambientColorDay, sunlightAmountNorm, this.scene.ambientColor);
       if ( this.skybox && this.skybox.material && this.skybox.material.reflectionTexture ) {
          this.skybox.material.reflectionTexture.level = 0.1 + sunlightAmountNorm;
          this.skybox.rotation.y = currentSunPos.azimuth - ( 19 * ( Math.PI / 180.0 ));
      }
       if ( this.skybox ) {
          const shaderMaterial = this.scene.getMaterialByName( "skyShader" );
          if ( shaderMaterial ) {
              shaderMaterial.setFloat( "time", ( this.viewerState.positionDate.getTime() % ( 100000000.0 )) / 500000.0 );
              if ( currentSunPos.altitude > 0 ) {
                  shaderMaterial.setFloat( "suny", Math.sin( currentSunPos.altitude ));
              } else if ( currentMoonPos.altitude > 0 ) {
                  //shaderMaterial.setFloat("suny", -Math.sin(currentMoonPos.altitude));
                  shaderMaterial.setFloat( "suny", Math.sin( currentSunPos.altitude ));
              } else {
                  //shaderMaterial.setFloat("suny", 0);
                  shaderMaterial.setFloat( "suny", Math.sin( currentSunPos.altitude ));
              }
              shaderMaterial.setFloat( "sunx", ( currentSunPos.azimuth - ( Math.PI / 2.0 )) / Math.PI );
          }
      }
        Vector3.Forward().rotateByQuaternionToRef( lightSunAndFlareRot, this.lensFlareEmitter.position );
      this.lensFlareEmitter.position.scaleInPlace( -1400.0 );
      this.lensFlareEmitter.position.addInPlace( this.camera.position );
      this.lensFlareSystem.setEmitter( this.lensFlareEmitter );
       const flareEnabled = currentSunPos.altitude > 0;
      if ( this.lensFlareSystem.isEnabled !== flareEnabled ) {
          this.lensFlareSystem.isEnabled = flareEnabled;
      }
       //console.debug(this.scene.ambientColor);
       // Lamps
      const lampMatOn = sunlightAmountNorm > 0.2;  // 0.2 is more logical, 0.1 exagerates the change
      if ( lampMatOn !== this._previousLampPatOn ) {
          this._previousLampPatOn = lampMatOn;
          if ( "LightLampOff" in this.catalog_materials ) {
              const lampMat = this.catalog_materials["LightLampOff"];
              lampMat.unfreeze();
              if ( lampMatOn ) {
                  lampMat.emissiveColor = Color3.Black();
              } else {
                  lampMat.emissiveColor = this.colorLightLamp;
              }
              //lampMat.freeze();
          }
       }
       const semCycleSeconds = 20;
      let semColor = ( this.viewerState.positionDate.getMinutes() % semCycleSeconds ) / semCycleSeconds;
      semColor = ( semColor < 0.5 ? 0 : ( semColor < 0.9 ? 1 : 2 ));
      if ( "LightRed" in this.catalog_materials ) {
          const lampMat = this.catalog_materials["LightRed"];
          lampMat.unfreeze();
          lampMat.emissiveColor = ( semColor === 0 ) ? this.colorLightRed : Color3.Black();
          //lampMat.freeze();
      }
      if ( "LightGreen" in this.catalog_materials ) {
          const lampMat = this.catalog_materials["LightGreen"];
          lampMat.unfreeze();
          lampMat.emissiveColor = ( semColor === 1 ) ? this.colorLightGreen : Color3.Black();
      }
      if ( "LightOrange" in this.catalog_materials ) {
          const lampMat = this.catalog_materials["LightOrange"];
          lampMat.unfreeze();
          lampMat.emissiveColor = ( semColor === 2 ) ? this.colorLightOrange : Color3.Black();
          //lampMat.freeze();
      }
   }
  */
  ;

  _proto.sceneShadowsSetEnabled = function sceneShadowsSetEnabled(value) {
    this.viewerState.sceneShadowsEnabled = value;
    localStorage.setItem("dddSceneShadowsEnabled", JSON.stringify(value));
    alert("Reload the viewer for changes to take effect.");
  };

  _proto.sceneTextsSetEnabled = function sceneTextsSetEnabled(value) {
    this.viewerState.sceneTextsEnabled = value;
    localStorage.setItem("dddSceneTextsEnabled", JSON.stringify(value));
    alert("Reload the viewer for changes to take effect.");
  };

  _proto.scenePostprocessingSetEnabled = function scenePostprocessingSetEnabled(value) {
    this.viewerState.scenePostprocessingEnabled = value; //localStorage.setItem('dddScenePostprocessingSetEnabled', value);
    //alert('Reload the viewer for changes to take effect.');

    this.updateRenderPipeline();
  }
  /**
  */
  ;

  _proto.loadTextures = function loadTextures() {
    var _this5 = this;

    var texturesConfig = this.viewerState.dddConfig.sceneMaterials.find(function (item) {
      return item.value === _this5.viewerState.sceneTextureSet;
    });
    if (!texturesConfig) return;

    if (texturesConfig.textures !== null) {
      this.loadCatalog("/assets/catalog_materials-" + texturesConfig.textures + ".glb", true);
    }

    if (texturesConfig.splatmap !== null) {
      this.useSplatMap = true;
      var atlasTextureUrl = "/assets/splatmap-textures-atlas-" + texturesConfig.splatmap + ".png";
      var atlasNormalsTextureUrl = "/assets/splatmap-textures-atlas-normals-" + texturesConfig.splatmap + ".png";
      this.splatmapAtlasTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture(atlasTextureUrl, this.scene, false, true, _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture.NEAREST_NEAREST_MIPLINEAR); // , Texture.NEAREST_SAMPLINGMODE);

      this.splatmapAtlasNormalsTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture(atlasNormalsTextureUrl, this.scene, false, true, _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture.NEAREST_NEAREST_MIPLINEAR);
    } else {
      this.useSplatMap = false;
    }
  }
  /**
   * Changes the materials set used to draw the scene.
   * @todo this would ideally belong to layers that explicity support DDD export features (splatmaps / texture catalogs)
   * @param textureSet
   */
  ;

  _proto.sceneTextureSet = function sceneTextureSet(textureSet) {
    this.viewerState.sceneTextureSet = textureSet;
    localStorage.setItem("dddSceneTextureSet", JSON.stringify(textureSet));

    if (textureSet !== null) {
      this.loadTextures();
    }

    alert("Reload the app to apply changes.");
  };

  return SceneViewer;
}();
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

/**
 * Holds DDDViewer global state like viewer position, date/time, configuration...
 * Some internal values are also stored here for convenience (FPS, drawcalls, mobile detection...).
 * This object must be JSON-serializable.
 */


var ViewerState = function ViewerState(dddConfig, initialCoords, isMobile) {
  if (isMobile === void 0) {
    isMobile = false;
  }

  this.mapVisible = true;
  this.sceneVisible = false;
  this.isMobile = false;
  this.positionTileZoomLevel = 9;
  this.positionWGS84 = [-8.726, 42.233]; // [0.0, 0.0];
  // Position in scene, in engine coordinates (elevation is Y)

  this.positionScene = [0, 0, 0];
  this.positionGroundHeight = 150.0;
  this.positionTerrainElevation = 0;
  this.positionHeading = 0.0;
  this.positionTilt = 0.0;
  this.positionName = null;
  this.positionDate = new Date();
  this.positionDateSeconds = this.positionDate.getTime() / 1000;
  this.geolocationEnabled = false;
  this.serverInfoShow = true; // TODO: These nodes are instrumented: remove selectedMesh from here and use ids.
  // TODO: Try removing this and this.sceneViewer id still used

  this.sceneSelectedMesh = null;
  this.sceneSelectedMeshId = null;
  this.sceneFPS = 0;
  this.sceneDrawCalls = 0;
  this.sceneTriangles = 0;
  this.sceneShadowsEnabled = false;
  this.sceneTextsEnabled = false;
  this.scenePostprocessingEnabled = false;
  this.scenePickingEnabled = true;
  this.sceneViewModeShow = true;
  this.sceneTileDrawDistance = 1;
  this.sceneMoveSpeed = 5;
  this.sceneCameraWalkHeight = 2.0;
  this.sceneViewportRescale = 1;
  this.sceneEnvironmentProbe = 16; // null to use a static environment (should be associated to the skybox, but it's currently fixed)

  this.sceneSkybox = "/textures/TropicalSunnyDay"; // "@dynamic"; // ""/textures/TropicalSunnyDay";

  this.sceneTextureSet = "defaultsplat256";
  this.sceneGroundTextureOverride = null;
  this.sceneTitleText = null;
  this.dddConfig = dddConfig;
  this.isMobile = isMobile;

  if (this.isMobile) {
    this.sceneViewportRescale = 2;
    this.sceneTextureSet = null; // "default256";
  }

  this.positionWGS84 = initialCoords;
  var shadowsEnabled = localStorage.getItem("dddSceneShadowsEnabled");
  this.sceneShadowsEnabled = shadowsEnabled ? JSON.parse(shadowsEnabled) : this.sceneShadowsEnabled;
  var textsEnabled = localStorage.getItem("dddSceneTextsEnabled");
  this.sceneTextsEnabled = textsEnabled ? JSON.parse(textsEnabled) : this.sceneTextsEnabled;
  var textureSet = localStorage.getItem("dddSceneTextureSet");
  this.sceneTextureSet = textureSet ? JSON.parse(textureSet) : this.sceneTextureSet; // Start time

  this.positionDate.setHours(11);
  this.positionDate.setMinutes(0);
};
/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

/**
 * DDD Viewer base layer class.
 */


var Base3DLayer = function Base3DLayer() {
  this.layerManager = null;
};

var Tile3D = function Tile3D(key) {
  this.key = key;
  this.status = null;
};

var GeoTile3D = /*#__PURE__*/function (_Tile3D) {
  _inheritsLoose(GeoTile3D, _Tile3D);

  function GeoTile3D(key) {
    var _this;

    _this = _Tile3D.call(this, key) || this;
    _this.node = null;
    _this.coordsTileGrid = null;
    return _this;
  }

  return GeoTile3D;
}(Tile3D);

var GeoTile3DLayer = /*#__PURE__*/function (_Base3DLayer) {
  _inheritsLoose(GeoTile3DLayer, _Base3DLayer);

  function GeoTile3DLayer() {
    var _this2;

    _this2 = _Base3DLayer.call(this) || this;
    _this2.groundTextureLayerUrl = null; //groundTextureLayerUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";  // "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    //groundTextureLayerUrl = "http://localhost:8090/wmts/ign_ortho/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg";  // "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

    _this2._lastHeight = 0; // Used to hack positioning of tiles before height is known

    _this2._lastLoadDynamic = 0;
    _this2._initialHeightSet = false;
    _this2.tilesLoadedCount = 0;
    _this2.tiles = {}; // TODO: This makes sense here, but is also duplicated on SceneViewer

    _this2.tileGrid = (0,ol_tilegrid__WEBPACK_IMPORTED_MODULE_5__.createXYZ)({
      extent: (0,ol_tilegrid__WEBPACK_IMPORTED_MODULE_5__.extentFromProjection)("EPSG:3857")
    });
    return _this2;
  }

  var _proto = GeoTile3DLayer.prototype;

  _proto.update = function update() {
    this.updateTilesDynamic();
  }
  /*
  * From: https://bartwronski.com/2017/04/13/cull-that-cone/
  */
  ;

  _proto.testConeSphere = function testConeSphere(origin, forward, size, angle, sphereCenter, sphereRadius) {
    //console.debug(origin, forward, size, angle, sphereCenter, sphereRadius);
    var V = sphereCenter.subtract(origin);
    var VlenSq = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Dot(V, V);
    var V1len = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Dot(V, forward);
    var distanceClosestPoint = Math.cos(angle) * Math.sqrt(VlenSq - V1len * V1len) - V1len * Math.sin(angle);
    var angleCull = distanceClosestPoint > sphereRadius;
    var frontCull = V1len > sphereRadius + size;
    var backCull = V1len < -sphereRadius;
    return !(angleCull || frontCull || backCull);
  };

  _proto.updateTilesDynamic = function updateTilesDynamic() {
    var _this$layerManager; // loading chunks each 100 frames. Bad performance 


    this._lastLoadDynamic -= 1;

    if (this._lastLoadDynamic > 0) {
      return;
    }

    this._lastLoadDynamic = 100;
    var sceneViewer = this.layerManager.sceneViewer;
    var positionWGS84 = (_this$layerManager = this.layerManager) == null ? void 0 : _this$layerManager.sceneViewer.positionWGS84();
    var coordsWGS84 = [positionWGS84[0], positionWGS84[1]];
    var coordsUtm = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(coordsWGS84, "EPSG:4326", "EPSG:3857");
    var tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17); //const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];
    // Calculate frustrum (2D)

    var frustrumOrigin = sceneViewer.camera.position.clone(); //if (this._lastHeight) { frustrumOrigin.y -= this._lastHeight; }  // Considers all tiles in a plane centered on last

    frustrumOrigin.y = 0;
    var frustrumForward = sceneViewer.camera.getDirection(_babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3.Forward());
    frustrumForward.y = 0;
    frustrumForward.normalize();
    var frustrumSize = sceneViewer.viewerState.sceneTileDrawDistance * 300.0; // 1500.0;

    var frustrumAngle = sceneViewer.camera.fov * 2.0; // * (Math.PI / 180.0); // 30.0;

    this.loadTile(tileCoords); // ensure elevation for current tile
    // Project frustrum corners to tiles
    // Calculate tiles inside frustrum

    var tiledistWalk = sceneViewer.viewerState.sceneTileDrawDistance + 3;
    var tiledistDraw = sceneViewer.viewerState.sceneTileDrawDistance + 0.7;

    for (var i = -tiledistWalk; i <= tiledistWalk; i++) {
      for (var j = -tiledistWalk; j <= tiledistWalk; j++) {
        // Current tile is already enqueued
        if (i === 0 && j === 0) {
          continue;
        }

        if (i * i + j * j > tiledistDraw * tiledistDraw) {
          this.disableTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
        } else {
          var tileCenter = this.tileGrid.getTileCoordCenter([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
          var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326");
          var tileCenterScene = sceneViewer.projection.forward(tileCenterWGS84);
          var sphereCenter = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(tileCenterScene[0], 0, tileCenterScene[1]); // TODO: Get median height from tile

          var sphereRadius = 230.0 / 2.0;

          if (this.testConeSphere(frustrumOrigin, frustrumForward, frustrumSize, frustrumAngle, sphereCenter, sphereRadius)) {
            //console.debug("Loading: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
            this.loadTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
          } else {
            //console.debug("Ignoring: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
            this.disableTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
          }
        }
      }
    } // Sort tiles by distance
    // Enqueue (1 on mobile? 2 on PC?)
    // setEnabled(false) on culled chunks
    // update LOD levels (call lodLevel - remove items, etc) per distance

    /*
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            this.loadTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
        }
    }
    */

  };

  _proto.disableTile = function disableTile(tileCoords) {
    var z = tileCoords[0];
    var x = tileCoords[1];
    var y = tileCoords[2];
    var tileKey = z + "/" + x + "/" + y;

    if (!(tileKey in this.tiles)) {
      return;
    }

    var tile = this.tiles[tileKey];

    if (tile.status !== "loading" && tile.node.isEnabled(false)) {
      tile.node.setEnabled(false);
      tile.node.parent = null; // TODO: this was not working before (tile.parent did not apply)
    }
  }
  /**
  * Gets tile metadata.
  * It does this recursively searching for a "Metadata" named node, as the path exporting root metadata to the root node or scene itself hasn't been found to work.
  */
  ;

  _proto.getTileMetadata = function getTileMetadata(node) {
    /*if (node.id.startsWith("Metadata")) {
        return node.metadata.gltf.extras;
    }*/
    for (var _iterator = _createForOfIteratorHelperLoose(node.getChildren()), _step; !(_step = _iterator()).done;) {
      var child = _step.value;

      if (child.id.indexOf("Metadata") > 0) {
        return child.metadata.gltf.extras;
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(node.getChildren()), _step2; !(_step2 = _iterator2()).done;) {
      var _child = _step2.value;
      var md = this.getTileMetadata(_child);

      if (md !== null) {
        return md;
      }
    }

    return null;
  } // TODO: Tile coordinates should be made a type or reuse OpenLayers grid coordinates type
  ;

  _proto.loadTile = function loadTile(tileCoords) {
    var _this3 = this; //console.debug(tileCoords);


    var z = tileCoords[0];
    var x = tileCoords[1];
    var y = tileCoords[2];
    var tileKey = z + "/" + x + "/" + y;
    var tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
    var tileCenter = (0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getCenter)(tileExtent);
    var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326"); //const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

    var tileExtentMinScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getBottomLeft)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var tileExtentMaxScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getTopRight)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var sizeWidth = Math.abs(tileExtentMaxScene[0] - tileExtentMinScene[0]);
    var sizeHeight = Math.abs(tileExtentMaxScene[1] - tileExtentMinScene[1]);

    if (tileKey in this.tiles) {
      var tile = this.tiles[tileKey];

      if (tile.status !== "loading" && !tile.node.isEnabled(false)) {
        tile.node.parent = null; // this.layerManager!.sceneViewer.scene;

        tile.node.setEnabled(true); //tile.node.freezeWorldMatrix();
      }

      return;
    } else {
      this.tiles[tileKey] = new GeoTile3D(tileKey);
      this.tiles[tileKey].status = "loading";
      this.tiles[tileKey].coordsTileGrid = tileCoords;
    } //const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
    //const tileUrl = "./scenes/ddd-model.glb";
    //const glb = "https://www.yourcityracing.com/static/game/larochelle_150r_-1.153,46.155.glb";
    //const glb = new File([""], "scene.glb", {type: "application/octect-stream"})
    //const tileUrlBase = './scenes/ddd_http_';
    //const tileUrlBase = 'http://localhost:8000/cache/ddd_http/';
    //const tileUrlBase = 'http://' + app.dddConfig.tileUrlBase + ':8000/cache/ddd_http/';
    //const tileUrlBase = 'http://' + location.hostname + '/cache/ddd_http/';


    var tileUrlBase = this.layerManager.sceneViewer.viewerState.dddConfig.tileUrlBase;
    var tileUrl = tileUrlBase + z + "/" + x + "/" + y + ".glb"; //console.debug("Loading: " + tileUrl);

    var pivot = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.TransformNode("chunk_" + tileKey.replace("/", "_"), this.layerManager.sceneViewer.scene); // new Mesh("chunk_" + tileKey, this.layerManager.sceneViewer.scene);
    //let reversePivot = new TransformNode("chunk_reverse_" + tileKey, this.scene);  // new Mesh("chunk_" + tileKey, this.scene);
    //let rawPivot = new TransformNode("chunk_raw_" + tileKey, this.scene);  // new Mesh("chunk_" + tileKey, this.scene);
    //reversePivot.scaling = new Vector3(1, 1, -1);  // Babylon uses a parent node with this scale to flip glTF models, redone here
    //rawPivot.parent = reversePivot;
    //reversePivot.parent = pivot;
    //pivot.parent = this.scene;

    var marker = this.loadQuadMarker(tileCoords, _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.Gray());
    this.tiles[tileKey].node = marker;
    this.layerManager.sceneViewer.queueLoader.enqueueLoadModel(tileUrl, // onSuccess
    function (newMeshes, _particleSystems, _skeletons) {
      //console.log("GLB loaded", newMeshes);
      marker.dispose(false, true); //marker.parent = null;

      var minHeight = Number.POSITIVE_INFINITY;
      newMeshes.forEach(function (mesh, _i) {
        if (_this3.layerManager.sceneViewer.shadowGenerator) {
          mesh.receiveShadows = true;

          if (mesh.metadata && mesh.metadata.gltf.extras && (mesh.metadata.gltf.extras["ddd:shadows"] === false || mesh.metadata.gltf.extras["ddd:shadows"] === "false" || mesh.metadata.gltf.extras["ddd:path"].indexOf("/Areas_") > 0 || mesh.metadata.gltf.extras["ddd:path"].indexOf("/Ways_") > 0)) {
            //console.debug("No shadow");
            return;
          }

          _this3.layerManager.sceneViewer.shadowGenerator.getShadowMap().renderList.push(mesh);
        } //console.debug(mesh.getBoundingInfo());


        var heightMin = mesh.getBoundingInfo().boundingBox.minimumWorld.y;

        if (heightMin < minHeight && heightMin !== 0) {
          minHeight = heightMin;
        }

        var heightMax = mesh.getBoundingInfo().boundingBox.maximumWorld.y;
        /*
          if(mesh.material) {
              if (mesh.id.indexOf("Item") < 0 && mesh.id.indexOf("Building") < 0) {
                  mesh.material = materialPlane;
              }
              //mesh.overrideMaterialSideOrientation = Mesh.DOUBLESIDE;
              //mesh.updateMeshPositions();
          }
          */
        //console.debug(mesh.absolutePosition);
        //mesh.position = new Vector3(mesh.position.x, mesh.position.y, -mesh.position.z);
        //mesh.updateMeshPositions();
        //mesh.parent = rawPivot;
      }); // Reparent root

      newMeshes[0].parent = pivot;
      newMeshes[0].id = tileKey.replace("/", "_");
      _this3.tiles[tileKey].node = pivot;
      _this3.tiles[tileKey].status = "loaded";

      var tileExtent = _this3.tileGrid.getTileCoordExtent(tileCoords);

      var tileCenter = (0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getCenter)(tileExtent);
      var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326");

      var tileCenterScene = _this3.layerManager.sceneViewer.projection.forward(tileCenterWGS84); //let distance = 225.0;
      //pivot.position = new Vector3((x - 62360) * distance, 0, -(y - 48539) * distance);
      //pivot.scaling = new Vector3(1, 1, -1);


      pivot.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(tileCenterScene[0], 0, tileCenterScene[1]);
      pivot.rotation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, Math.PI, 0);
      pivot.freezeWorldMatrix();
      _this3.tiles[tileKey].node = pivot;
      _this3._lastHeight = minHeight;
      _this3.tilesLoadedCount++;

      if (!_this3._initialHeightSet) {
        //console.debug("Repositioning camera height based on terrain height: " + maxHeight);
        //that.layerManager.sceneViewer.camera.position.y += maxHeight;
        var ray = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Ray(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(_this3.layerManager.sceneViewer.camera.position.x, -100.0, _this3.layerManager.sceneViewer.camera.position.z), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), 3000.0);

        var pickResult = _this3.layerManager.sceneViewer.scene.pickWithRay(ray);

        if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id && pickResult.pickedMesh.id.indexOf("placeholder_") !== 0 && pickResult.pickedMesh.id.indexOf("skyBox") !== 0) {
          //console.debug("Setting height from: " + pickResult.pickedMesh.id);
          _this3._initialHeightSet = true;
          _this3.layerManager.sceneViewer.camera.position.y = pickResult.distance - 100.0;

          if (_this3.layerManager.sceneViewer.viewerState.positionGroundHeight) {
            _this3.layerManager.sceneViewer.camera.position.y += _this3.layerManager.sceneViewer.viewerState.positionGroundHeight;
          } else {
            _this3.layerManager.sceneViewer.camera.position.y += 40.0;
          }
        }
      }

      var tileMetadata = _this3.getTileMetadata(pivot); //console.debug("Tile metadata: ", tileMetadata);
      // Replace materials, instancing...


      pivot.metadata = {
        "tileCoords": tileCoords,
        "tileSize": [sizeWidth, sizeHeight],
        "tileInfo": tileMetadata
      };
      _this3.layerManager.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = true;

      _this3.layerManager.sceneViewer.processMesh(pivot, pivot); // TODO: Wrong conversion, use Node for "processMesh"


      _this3.layerManager.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = false; //pivot.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;

      pivot.freezeWorldMatrix(); // TODO: Removed during TS migration, but this is needed to support ground texture replacement
      //this.groundTextureLayerProcessNode( tileCoords, pivot );
      // Check if the selected node is in the recently loaded node
      // TODO: Should use a generic notification + object id/naming system

      if (_this3.layerManager.sceneViewer.viewerState.sceneSelectedMeshId) {
        var criteria = {
          "_node_name": _this3.layerManager.sceneViewer.viewerState.sceneSelectedMeshId
        }; //console.debug(criteria);

        var foundMesh = _this3.layerManager.sceneViewer.findNode(pivot, criteria); //console.debug(foundMesh);


        if (foundMesh) {
          _this3.layerManager.sceneViewer.selectMesh(foundMesh, true);

          _this3.layerManager.sceneViewer.viewerState.sceneSelectedMeshId = null; // Triggers watchers update
        }
      }
      /*
        this.sceneViewer.selectMesh(pickResult.pickedMesh);
        let meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
        this.$router.push('/3d/item/' + meshName + '/' + this.sceneViewer.positionString()).catch(()=>{});
        */

    }, // onError
    function (_scene, _msg, ex) {
      // eslint-disable-next-line no-console
      console.log("Tile model (.glb) loading error: ", ex);

      if (ex.request && ex.request.status === 404) {
        // 404 - tile is being generated, show OSM tile as replacement
        marker.dispose(false, true);
        marker = _this3.loadQuadTile(tileCoords); // , Color3.Red()

        _this3.tiles[tileKey].node = marker; // "notfound";

        _this3.tiles[tileKey].status = "notfound";
        _this3.layerManager.sceneViewer.viewerState.serverInfoShow = true;
      } else {
        // Error: colour marker red
        marker.dispose(false, true);
        marker = _this3.loadQuadTile(tileCoords); // , Color3.Red()

        _this3.tiles[tileKey].node = marker; // "notfound";

        _this3.tiles[tileKey].status = "error";
        var color = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.Red();
        marker.material.emissiveColor = color;
      }
    }); //model.parent = pivot;
  };

  _proto.loadQuadMarker = function loadQuadMarker(tileCoords, color) {
    if (color === void 0) {
      color = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.Gray();
    }

    var z = tileCoords[0];
    var x = tileCoords[1];
    var y = tileCoords[2];
    var tileKey = z + "/" + x + "/" + y;
    var tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
    var tileCenter = (0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getCenter)(tileExtent);
    var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326");
    var tileCenterScene = this.layerManager.sceneViewer.projection.forward(tileCenterWGS84);
    var tileExtentMinScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getBottomLeft)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var tileExtentMaxScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getTopRight)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var sizeWidth = Math.abs(tileExtentMaxScene[0] - tileExtentMinScene[0]);
    var sizeHeight = Math.abs(tileExtentMaxScene[1] - tileExtentMinScene[1]);
    var marker = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.MeshBuilder.CreatePlane("placeholder_" + tileKey, {
      width: sizeWidth,
      height: sizeHeight,
      sideOrientation: _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Mesh.DOUBLESIDE
    }, this.layerManager.sceneViewer.scene);
    marker.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
    marker.rotation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.PI * 0.5, 0, 0); //Creation of a repeated textured material

    var materialPlane = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("textureTile_" + tileKey, this.layerManager.sceneViewer.scene); //materialPlane.diffuseTexture = new Texture("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.scene);

    materialPlane.diffuseColor = color;
    materialPlane.specularColor = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.Black();
    /*
    materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
    materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
    materialPlane.diffuseTexture.uOffset = -0.5;
    materialPlane.diffuseTexture.vOffset = -0.5;
    */

    materialPlane.emissiveColor = color; // new Color3(1.0, 1.0, 1.);

    materialPlane.disableLighting = true;
    materialPlane.backFaceCulling = false;
    marker.material = materialPlane;
    return marker;
  };

  _proto.loadQuadTile = function loadQuadTile(tileCoords, color) {
    if (color === void 0) {
      color = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.White();
    }

    var z = tileCoords[0];
    var x = tileCoords[1];
    var y = tileCoords[2];
    var tileKey = z + "/" + x + "/" + y;
    var tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
    var tileCenter = (0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getCenter)(tileExtent);
    var tileCenterWGS84 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)(tileCenter, "EPSG:3857", "EPSG:4326");
    var tileCenterScene = this.layerManager.sceneViewer.projection.forward(tileCenterWGS84);
    var tileExtentMinScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getBottomLeft)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var tileExtentMaxScene = this.layerManager.sceneViewer.projection.forward((0,ol_proj__WEBPACK_IMPORTED_MODULE_3__.transform)((0,ol_extent__WEBPACK_IMPORTED_MODULE_6__.getTopRight)(tileExtent), "EPSG:3857", "EPSG:4326"));
    var sizeWidth = Math.abs(tileExtentMaxScene[0] - tileExtentMinScene[0]);
    var sizeHeight = Math.abs(tileExtentMaxScene[1] - tileExtentMinScene[1]); //console.debug(sizeWidth, sizeHeight);

    var marker = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.MeshBuilder.CreatePlane("placeholder_" + tileKey, {
      width: sizeWidth,
      height: sizeHeight,
      sideOrientation: _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Mesh.DOUBLESIDE
    }, this.layerManager.sceneViewer.scene);
    marker.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
    marker.rotation = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.PI * 0.5, 0, 0); //Creation of a repeated textured material

    var materialPlane = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("textureTile_" + tileKey, this.layerManager.sceneViewer.scene);
    materialPlane.diffuseTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.layerManager.sceneViewer.scene); //if (!color) color = Color3.Black; //new Color3(0, 0, 0);

    materialPlane.specularColor = _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Color3.Black();
    /*
    materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
    materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
    materialPlane.diffuseTexture.uOffset = -0.5;
    materialPlane.diffuseTexture.vOffset = -0.5;
    */

    materialPlane.emissiveColor = color; // new Color3(1.0, 1.0, 1.);

    materialPlane.disableLighting = true;
    materialPlane.backFaceCulling = false;
    marker.material = materialPlane;
    return marker;
  }
  /*
  groundTextureLayerProcessNode( tileCoords: number[], node: Node ): void {
       let materialGround = null;
       if ( this.groundTextureLayerUrl ) {
          const z = tileCoords[0];
          const x = tileCoords[1];
          const y = tileCoords[2];
           const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
          const tileCenter = extent.getCenter( tileExtent );
          const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
          const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );
           const tileExtentMinScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getBottomLeft( tileExtent ), "EPSG:3857", "EPSG:4326" ));
          const tileExtentMaxScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getTopRight( tileExtent ), "EPSG:3857", "EPSG:4326" ));
          const sizeWidth = Math.abs( tileExtentMaxScene[0] - tileExtentMinScene[0]);
          const sizeHeight = Math.abs( tileExtentMaxScene[1] - tileExtentMinScene[1]);
           // Create material
          //console.debug("Creating material for ground texture: " + url);
          const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];
          const url = this.replaceTileCoordsUrl( tileCoords, this.groundTextureLayerUrl );
          materialGround = new StandardMaterial( "materialGround_" + tileKey, this.layerManager!.sceneViewer.scene );
          materialGround.roughness = 0.95;
          materialGround.specularColor = new Color3( 0.15, 0.15, 0.15 ); // Color3.Black();
          //materialGround.specularColor = new Color3(0.2, 0.2, 0.2); // Color3.Black();
          //materialGround.emissiveColor = Color3.White();  // new Color3(1.0, 1.0, 1.);
          //materialGround.disableLighting = true;
          //materialGround.backFaceCulling = false;
          materialGround.diffuseTexture = new Texture( url, this.layerManager!.sceneViewer.scene );
          materialGround.diffuseTexture.uScale = 1.0 / ( sizeWidth + 0 );  // Force small texture overlap to avoid texture repeating
          materialGround.diffuseTexture.vScale = 1.0 / ( sizeHeight + 1 );  // Force small texture overlap to avoid texture repeating
          materialGround.diffuseTexture.uOffset = -0.5;
          materialGround.diffuseTexture.vOffset = -0.5;
          materialGround.diffuseTexture.wrapU = Texture.WRAP_ADDRESSMODE;
          materialGround.diffuseTexture.wrapV = Texture.WRAP_ADDRESSMODE;
          //materialGround.bumpTexture = materialGround.diffuseTexture;
          //materialGround.bumpTexture.uScale = 1.0 / sizeWidth;
          //materialGround.bumpTexture.vScale = 1.0 / sizeHeight;
          //materialGround.bumpTexture.uOffset = -0.5;
          //materialGround.bumpTexture.vOffset = -0.5;
      }
       // Assign
      const meshes = node.getChildMeshes();
      for ( const mesh of meshes ) {
          if ( mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras ) {
              const metadata = mesh.metadata.gltf.extras;
              if (( metadata["ddd:path"].indexOf( "/Areas" ) > 0 ) ||
                  ( metadata["ddd:path"].indexOf( "/Ways" ) > 0 )) {
                  if ( materialGround !== null ) {
                      if ( !( "_ground_material_original" in mesh )) {
                          mesh._ground_material_original = mesh.material;
                      }
                      mesh.material = materialGround;
                  } else {
                      if ( mesh._ground_material_original ) {
                          mesh.material = mesh._ground_material_original;
                      }
                  }
              }
          }
      }
  }
  */

  /*
  groundTextureLayerSetUrl( url: string ): void {
      // "https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png"
      //console.debug("Layer setting ground texture layer: " + url);
      this.groundTextureLayerUrl = url;
     
      // Update existing tiles
      for ( const key in this.tiles ) {
          const tile = this.tiles[key];
          this.groundTextureLayerProcessNode( tile.coordsTileGrid, tile.node );
      }
  }
  */
  ;

  _proto.replaceTileCoordsUrl = function replaceTileCoordsUrl(tileCoords, url) {
    var result = url;
    result = result.replace("{z}", tileCoords[0].toString());
    result = result.replace("{x}", tileCoords[1].toString());
    result = result.replace("{y}", tileCoords[2].toString());
    return result;
  };

  return GeoTile3DLayer;
}(Base3DLayer);
/* eslint-disable indent */

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */


var SkyMaterialWrapper = /*#__PURE__*/function () {
  function SkyMaterialWrapper(scene) {
    this.material = this.initMaterial(scene); //this.testSplatMaterial(scene);
  }

  var _proto = SkyMaterialWrapper.prototype;

  _proto.initMaterial = function initMaterial(scene) {
    //, options: any) {
    _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore.customVertexShader = "\n        precision highp float;\n\n        // Attributes\n        attribute vec3 position;\n        attribute vec3 normal;\n        attribute vec2 uv;\n\n        // Uniforms\n        uniform mat4 worldViewProjection;\n\n        // Varying\n        varying vec4 vPosition;\n        varying vec3 vNormal;\n        varying vec2 vUV;\n        void main() {\n\n            vec4 p = vec4( position, 1. );\n\n            vPosition = p;\n            vNormal = normal;\n\n             vUV = uv;\n             // vUV.y =1.-vUV.y;     // flip uv screen ;\n            gl_Position = worldViewProjection * p;\n\n        }";
    _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore.customFragmentShader = "\n        precision highp float;\n\n        uniform mat4 worldView;\n\n        varying vec4 vPosition;\n\n         precision mediump float;\n\n        // Day and night sky cycle. By L\xE1szl\xF3 Matuska (@BitOfGold)\n        // Creates a sky texture for a skydome\n        // https://www.shadertoy.com/view/ltlSWB\n\n\n        // based on other shaders, Greetings goes to:\n\n        // Weather. By David Hoskins, May 2014.\n        // https://www.shadertoy.com/view/4dsXWn\n\n        // Edge of atmosphere\n        // created by dmytro rubalskyi (ruba)\n        // https://www.shadertoy.com/view/XlXGzB\n\n        // Starfield01 by xaot88\n        // https://www.shadertoy.com/view/Md2SR3\n        // ======================================================================\n\n        //#define shadertoy 1\n\n        //#define cloud2 1 //second layer of clouds, altocumulus or stratocumulus. (in 4K, too slow on my GTX970. HD is OK.)\n        //plan was to make cirrus too...\n\n        #ifdef GL_ES\n        precision highp float;\n        #endif\n\n        const float M_PI = 3.1415926535;\n        const float DEGRAD = M_PI / 180.0;\n\n        #ifdef shadertoy\n            float height = 500.0; //viewer height\n            float cloudy = 0.6; //0.6 //0.0 clear sky\n        #else\n            varying vec3 vNormal;\n            varying vec2 vUV;\n            uniform sampler2D iChannel0;\n            uniform float sunx;\n            uniform float suny;\n            //uniform float moonx;\n            //uniform float moony;\n            //uniform float cloudy;\n           // uniform float height;\n            uniform float time;\n        #endif\n        //float moonx = 1.0;\n        //float moony = 9.6;\n        //float sunx = 1.0;\n        //float suny = 1.6;\n        float cloudy = 0.1;\n        float height = 500.0;\n\n        //rendering quality\n        const int steps = 8; //16 is fast, 128 or 256 is extreme high\n        const int stepss = 8; //16 is fast, 16 or 32 is high\n\n        //float t = 12.0; //fix time. 12.0 91.0, 97.0, 188.0, 72.0, 74.0\n\n        float camroty = 0. * DEGRAD; //20.\n        float haze = 0.1; //0.2\n        float cloudyhigh = 0.05; //if cloud2 defined\n\n        float cloudnear = 1.0; //9e3 12e3  //do not render too close clouds on the zenith\n        float cloudfar = 1e3; //15e3 17e3\n\n        float startreshold = 0.99; //0.99 0.98 star density treshold.\n\n        const float I = 10.; //sun light power, 10.0 is normal\n        const float g = 0.45; //light concentration .76 //.45 //.6  .45 is normaL\n        const float g2 = g * g;\n\n        //Reyleigh scattering (sky color, atmospheric up to 8km)\n        vec3 bR = vec3(5.8e-6, 13.5e-6, 33.1e-6); //normal earth\n        //vec3 bR = vec3(5.8e-6, 33.1e-6, 13.5e-6); //purple\n        //vec3 bR = vec3( 63.5e-6, 13.1e-6, 50.8e-6 ); //green\n        //vec3 bR = vec3( 13.5e-6, 23.1e-6, 115.8e-6 ); //yellow\n        //vec3 bR = vec3( 5.5e-6, 15.1e-6, 355.8e-6 ); //yeellow\n        //vec3 bR = vec3(3.5e-6, 333.1e-6, 235.8e-6 ); //red-purple\n\n        //Mie scattering (water particles up to 1km)\n        vec3 bM = vec3(21e-6); //normal mie\n        //vec3 bM = vec3(50e-6); //high mie\n\n        //-----\n        //positions\n\n        const float Hr = 8000.0; //Reyleight scattering top\n        const float Hm = 1000.0; //Mie scattering top\n\n        const float R0 = 6360e3; //planet radius\n        const float Ra = 6380e3; //atmosphere radius\n        vec3 C = vec3(0., -R0, 0.); //planet center\n        vec3 Ds = normalize(vec3(0., .09, -1.)); //sun direction?\n\n        //--------------------------------------------------------------------------\n        //Starfield\n        // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\n\n        // Return random noise in the range [0.0, 1.0], as a function of x.\n        float Noise2d( in vec2 x )\n        {\n            float xhash = cos( x.x * 37.0 );\n            float yhash = cos( x.y * 57.0 );\n            return fract( 415.92653 * ( xhash + yhash ) );\n        }\n\n        // Convert Noise2d() into a \"star field\" by stomping everthing below fThreshhold to zero.\n        float NoisyStarField( in vec2 vSamplePos, float fThreshhold )\n        {\n            float StarVal = Noise2d( vSamplePos );\n            if ( StarVal >= fThreshhold )\n                StarVal = pow( (StarVal - fThreshhold)/(1.0 - fThreshhold), 6.0 );\n            else\n                StarVal = 0.0;\n            return StarVal;\n        }\n\n        // Stabilize NoisyStarField() by only sampling at integer values.\n        float StableStarField( in vec2 vSamplePos, float fThreshhold )\n        {\n            // Linear interpolation between four samples.\n            // Note: This approach has some visual artifacts.\n            // There must be a better way to \"anti alias\" the star field.\n            float fractX = fract( vSamplePos.x );\n            float fractY = fract( vSamplePos.y );\n            vec2 floorSample = floor( vSamplePos );\n            float v1 = NoisyStarField( floorSample, fThreshhold );\n            float v2 = NoisyStarField( floorSample + vec2( 0.0, 1.0 ), fThreshhold );\n            float v3 = NoisyStarField( floorSample + vec2( 1.0, 0.0 ), fThreshhold );\n            float v4 = NoisyStarField( floorSample + vec2( 1.0, 1.0 ), fThreshhold );\n\n            float StarVal =   v1 * ( 1.0 - fractX ) * ( 1.0 - fractY )\n                            + v2 * ( 1.0 - fractX ) * fractY\n                            + v3 * fractX * ( 1.0 - fractY )\n                            + v4 * fractX * fractY;\n            return StarVal;\n        }\n\n\n        //--------------------------------------------------------------------------\n        //Cloud noise\n\n        float Noise( in vec3 x )\n        {\n            vec3 p = floor(x);\n            vec3 f = fract(x);\n            f = f*f*(3.0-2.0*f);\n\n            vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;\n\n            vec2 rg = texture( iChannel0, (uv+ 0.5)/256.0, -100.0).yx;\n            return mix( rg.x, rg.y, f.z );\n        }\n\n        float fnoise( vec3 p, in float t )\n        {\n            p *= .25;\n            float f;\n\n            f = 0.5000 * Noise(p); p = p * 3.02; p.y -= t*.2;\n            f += 0.2500 * Noise(p); p = p * 3.03; p.y += t*.06;\n            f += 0.1250 * Noise(p); p = p * 3.01;\n            f += 0.0625   * Noise(p); p =  p * 3.03;\n            f += 0.03125  * Noise(p); p =  p * 3.02;\n            f += 0.015625 * Noise(p);\n            return f;\n        }\n\n        //--------------------------------------------------------------------------\n        //clouds, scattering\n\n        float cloud(vec3 p, in float t) {\n            float cld = fnoise(p*2e-4,t) + cloudy*0.1 ;\n            cld = smoothstep(.4+.04, .6+.04, cld);\n            cld *= 70.;\n            return cld+haze;\n        }\n\n\n        void densities(in vec3 pos, out float rayleigh, out float mie, in float t) {\n            float h = length(pos - C) - R0;\n            rayleigh =  exp(-h/Hr);\n            vec3 d = pos;\n            d.y = 0.0;\n            float dist = length(d);\n\n            float cld = 0.;\n            if (5e3 < h && h < 8e3) {\n                cld = cloud(pos+vec3(23175.7, 0.,-t*3e3), t);\n                cld *= sin(3.1415*(h-5e3)/5e3) * cloudy;\n            }\n            #ifdef cloud2\n                float cld2 = 0.;\n                if (12e3 < h && h < 15.5e3) {\n                    cld2 = fnoise(pos*3e-4,t)*cloud(pos*32.0+vec3(27612.3, 0.,-t*15e3), t);\n                    cld2 *= sin(3.1413*(h-12e3)/12e3) * cloudyhigh;\n                    cld2 = clamp(cld2,0.0,1.0);\n                }\n\n            #endif\n\n\n            if ( dist < cloudfar) {\n                float factor = clamp(1.0-((cloudfar - dist)/(cloudfar-cloudnear)),0.0,1.0);\n                cld *= factor;\n            }\n\n            mie = exp(-h/Hm) + cld + haze;\n            #ifdef cloud2\n                mie += cld2;\n            #endif\n\n        }\n\n        float escape(in vec3 p, in vec3 d, in float R) {\n\n            vec3 v = p - C;\n            float b = dot(v, d);\n            float c = dot(v, v) - R*R;\n            float det2 = b * b - c;\n            if (det2 < 0.) return -1.;\n            float det = sqrt(det2);\n            float t1 = -b - det, t2 = -b + det;\n            return (t1 >= 0.) ? t1 : t2;\n        }\n\n        // this can be explained: http://www.scratchapixel.com/lessons/3d-advanced-lessons/simulating-the-colors-of-the-sky/atmospheric-scattering/\n        void scatter(vec3 o, vec3 d, out vec3 col, out float scat, in float t) {\n            float L = escape(o, d, Ra);\n            float mu = dot(d, Ds);\n            float opmu2 = 1. + mu*mu;\n            float phaseR = .0596831 * opmu2;\n            float phaseM = .1193662 * (1. - g2) * opmu2 / ((2. + g2) * pow(1. + g2 - 2.*g*mu, 1.5));\n\n            float depthR = 0., depthM = 0.;\n            vec3 R = vec3(0.), M = vec3(0.);\n\n            float dl = L / float(steps);\n            for (int i = 0; i < steps; ++i) {\n                float l = float(i) * dl;\n                vec3 p = o + d * l;\n\n                float dR, dM;\n                densities(p, dR, dM, t);\n                dR *= dl; dM *= dl;\n                depthR += dR;\n                depthM += dM;\n\n                float Ls = escape(p, Ds, Ra);\n                if (Ls > 0.) {\n                    float dls = Ls / float(stepss);\n                    float depthRs = 0., depthMs = 0.;\n                    for (int j = 0; j < stepss; ++j) {\n                        float ls = float(j) * dls;\n                        vec3 ps = p + Ds * ls;\n                        float dRs, dMs;\n                        densities(ps, dRs, dMs, t);\n                        depthRs += dRs * dls;\n                        depthMs += dMs * dls;\n                    }\n\n                    vec3 A = exp(-(bR * (depthRs + depthR) + bM * (depthMs + depthM)));\n                    R += A * dR;\n                    M += A * dM;\n                }\n            }\n\n\n            col = I * (R * bR * phaseR + M * bM * phaseM);\n            scat = 1.0 - clamp(depthM*1e-5,0.,1.);\n        }\n\n        //--------------------------------------------------------------------------\n        // ray casting\n\n\n        vec3 rotate_y(vec3 v, float angle)\n        {\n            float ca = cos(angle); float sa = sin(angle);\n            return v*mat3(\n                +ca, +.0, -sa,\n                +.0,+1.0, +.0,\n                +sa, +.0, +ca);\n        }\n\n        vec3 rotate_x(vec3 v, float angle)\n        {\n            float ca = cos(angle); float sa = sin(angle);\n            return v*mat3(\n                +1.0, +.0, +.0,\n                +.0, +ca, -sa,\n                +.0, +sa, +ca);\n        }\n\n        float map(float value, float min1, float max1, float min2, float max2) {\n          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n        }\n\n        vec4 generate(in vec2 uv, in vec2 fragCoord, in vec2 sunpos, in float t) {\n\n            //if (fragCoord.y < -0.25) discard;\n\n            float att = 1.0;\n            float staratt = 0.0;\n            if (sunpos.y < 0.10) {\n                staratt = map(sunpos.y, 0.20, -1.0, 0.0, 1.0);\n            }\n            if (sunpos.y < -0.10) {\n                att = map(sunpos.y, -0.10, -1.0, 1.0, 0.25);\n                //sunpos.y = -sunpos.y;\n            }\n\n            vec3 O = vec3(0., height, 0.);\n\n            vec3 D = normalize(rotate_y(rotate_x(vec3(0.0, 0.0, 1.0),-uv.y*M_PI/2.0),-uv.x*M_PI+camroty));\n\n            if (D.y <= -0.15) {\n                D.y = -0.3 -D.y;\n            }\n\n            Ds= normalize(rotate_y(rotate_x(vec3(0.0, 0.0, 1.0),-sunpos.y*M_PI/2.0),-sunpos.x*M_PI));\n            float scat = 0.;\n            vec3 color = vec3(0.);\n            scatter(O, D, color, scat, t);\n            color *= att;\n\n            float starcolor = StableStarField(fragCoord * 1024.0, startreshold);\n            color += vec3(scat * starcolor * staratt);\n\n            // Water mix to bottom half, black at night\n            if (fragCoord.y < 0.0) {\n                float waterFactor = smoothstep(-0.05, 0.0, sunpos.y);\n                vec3 waterColor = vec3(70.0 / 255.0, 135.0 / 255.0, 240.0 / 255.0) * waterFactor;\n                float waterMix = smoothstep(0.0, -0.1, fragCoord.y);\n                waterColor = (color + waterColor) / 2.0;\n                color = color + (waterColor - color) * waterMix;\n            }\n\n            float env = 1.0;\n            return(vec4(env * pow(color, vec3(.7)),1.0));\n        }\n\n        void main() {\n            vec2 uv = vec2(2.0 * vUV.x - 1.0,  -2.0 *  vUV.y + 1.0);\n            vec2 sunpos = vec2(sunx,suny);\n            float t = time;\n            gl_FragColor = generate(uv, uv, sunpos,t);\n        }\n\n        "; // Compile

    var shaderMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial("skyShader", scene, {
      vertex: "custom",
      fragment: "custom"
    }, {
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
    });
    var mainTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_1__.Texture("/textures/skynoise.png", scene, true, false, 12); // NEAREST
    //https://www.shadertoy.com/view/ltlSWB

    shaderMaterial.setTexture("iChannel0", mainTexture);
    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setFloat("offset", 10);
    shaderMaterial.setFloat("sunx", 2.0);
    shaderMaterial.setFloat("suny", 0.9);
    shaderMaterial.backFaceCulling = false;
    /*
    var time = 0;
    scene.registerBeforeRender(function () {
        var shaderMaterial = scene.getMaterialByName("skyShader");
        shaderMaterial.setFloat("time", time);
         //Animate Move Sun
        shaderMaterial.setFloat("suny", Math.sin(time/3));
        shaderMaterial.setFloat("sunx", Math.sin(time/3));
        time += 0.008;
    });
    */

    this.material = shaderMaterial;
    return shaderMaterial;
  };

  return SkyMaterialWrapper;
}();



/***/ }),

/***/ "./styles/main.css":
/*!*************************!*\
  !*** ./styles/main.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../node_modules/@babylonjs/core/index.js":
/*!***************************************************!*\
  !*** ../../node_modules/@babylonjs/core/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
Object(function webpackMissingModule() { var e = new Error("Cannot find module './abstractScene'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Actions/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Animations/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './assetContainer'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Audio/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Behaviors/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Bones/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Buffers/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Cameras/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Collisions/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Compute/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Culling/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Debug/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './DeviceInput/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Engines/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Events/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Gamepads/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Gizmos/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Helpers/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Instrumentation/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Layers/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './LensFlares/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Lights/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Loading/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Materials/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Maths/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Meshes/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Morph/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Navigation/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Offline/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Particles/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Physics/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './PostProcesses/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Probes/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Rendering/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './scene'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './sceneComponent'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Sprites/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './States/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Misc/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './XR/index'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './types'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());











































//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@babylonjs/loaders/glTF/index.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@babylonjs/loaders/glTF/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
Object(function webpackMissingModule() { var e = new Error("Cannot find module './glTFFileLoader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './glTFValidation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './1.0'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './2.0'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@babylonjs/materials/index.js":
/*!********************************************************!*\
  !*** ../../node_modules/@babylonjs/materials/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
Object(function webpackMissingModule() { var e = new Error("Cannot find module './cell'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './custom'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './fire'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './fur'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './gradient'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './grid'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './lava'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './mix'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './normal'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './shadowOnly'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './simple'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './sky'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './terrain'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './triPlanar'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './water'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/mgrs/mgrs.js":
/*!***************************************!*\
  !*** ../../node_modules/mgrs/mgrs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "toPoint": () => (/* binding */ toPoint)
/* harmony export */ });



/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

var A = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  forward: forward,
  inverse: inverse,
  toPoint: toPoint
});
/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
function forward(ll, accuracy) {
  accuracy = accuracy || 5; // default accuracy 1m
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
};

/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
function inverse(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
};

function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
};
/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return (deg * (Math.PI / 180.0));
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return (180.0 * (rad / Math.PI));
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    }
    else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    }
    else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    }
    else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }

  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

  var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {

  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);

  var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  }
  else {
    result = {
      lat: lat,
      lon: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';

  if ((84 >= lat) && (lat >= 72)) {
    LetterDesignator = 'X';
  }
  else if ((72 > lat) && (lat >= 64)) {
    LetterDesignator = 'W';
  }
  else if ((64 > lat) && (lat >= 56)) {
    LetterDesignator = 'V';
  }
  else if ((56 > lat) && (lat >= 48)) {
    LetterDesignator = 'U';
  }
  else if ((48 > lat) && (lat >= 40)) {
    LetterDesignator = 'T';
  }
  else if ((40 > lat) && (lat >= 32)) {
    LetterDesignator = 'S';
  }
  else if ((32 > lat) && (lat >= 24)) {
    LetterDesignator = 'R';
  }
  else if ((24 > lat) && (lat >= 16)) {
    LetterDesignator = 'Q';
  }
  else if ((16 > lat) && (lat >= 8)) {
    LetterDesignator = 'P';
  }
  else if ((8 > lat) && (lat >= 0)) {
    LetterDesignator = 'N';
  }
  else if ((0 > lat) && (lat >= -8)) {
    LetterDesignator = 'M';
  }
  else if ((-8 > lat) && (lat >= -16)) {
    LetterDesignator = 'L';
  }
  else if ((-16 > lat) && (lat >= -24)) {
    LetterDesignator = 'K';
  }
  else if ((-24 > lat) && (lat >= -32)) {
    LetterDesignator = 'J';
  }
  else if ((-32 > lat) && (lat >= -40)) {
    LetterDesignator = 'H';
  }
  else if ((-40 > lat) && (lat >= -48)) {
    LetterDesignator = 'G';
  }
  else if ((-48 > lat) && (lat >= -56)) {
    LetterDesignator = 'F';
  }
  else if ((-56 > lat) && (lat >= -64)) {
    LetterDesignator = 'E';
  }
  else if ((-64 > lat) && (lat >= -72)) {
    LetterDesignator = 'D';
  }
  else if ((-72 > lat) && (lat >= -80)) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  // prepend with leading zeroes
  var seasting = "00000" + utm.easting,
    snorthing = "00000" + utm.northing;

  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }

  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt++;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt++;

    if (colInt === I) {
      colInt++;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt++;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt++;

    if (rowInt === I) {
      rowInt++;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }

  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {

  if (mgrsString && mgrsString.length === 0) {
    throw ("MGRSPoint coverting from nothing");
  }

  var length = mgrsString.length;

  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }
    sb += testChar;
    i++;
  }

  var zoneNumber = parseInt(sb, 10);

  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw ("MGRSPoint bad conversion from: " + mgrsString);
  }

  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
  }

  hunK = mgrsString.substring(i, i += 2);

  var set = get100kSetForZone(zoneNumber);

  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;

  if (remainder % 2 !== 0) {
    throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
  }

  var sep = remainder / 2;

  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }

  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;

  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;

  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw ("Bad character: " + e);
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }

  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

  if (n > 'V') {
    throw ("MGRSPoint given invalid Northing " + n);
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;

  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) { // making sure that this loop ends
        throw ("Bad character: " + n);
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }

  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
  case 'C':
    northing = 1100000.0;
    break;
  case 'D':
    northing = 2000000.0;
    break;
  case 'E':
    northing = 2800000.0;
    break;
  case 'F':
    northing = 3700000.0;
    break;
  case 'G':
    northing = 4600000.0;
    break;
  case 'H':
    northing = 5500000.0;
    break;
  case 'J':
    northing = 6400000.0;
    break;
  case 'K':
    northing = 7300000.0;
    break;
  case 'L':
    northing = 8200000.0;
    break;
  case 'M':
    northing = 9100000.0;
    break;
  case 'N':
    northing = 0.0;
    break;
  case 'P':
    northing = 800000.0;
    break;
  case 'Q':
    northing = 1700000.0;
    break;
  case 'R':
    northing = 2600000.0;
    break;
  case 'S':
    northing = 3500000.0;
    break;
  case 'T':
    northing = 4400000.0;
    break;
  case 'U':
    northing = 5300000.0;
    break;
  case 'V':
    northing = 6200000.0;
    break;
  case 'W':
    northing = 7000000.0;
    break;
  case 'X':
    northing = 7900000.0;
    break;
  default:
    northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  }
  else {
    throw ("Invalid zone letter: " + zoneLetter);
  }

}


/***/ }),

/***/ "../../node_modules/ol/AssertionError.js":
/*!***********************************************!*\
  !*** ../../node_modules/ol/AssertionError.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "../../node_modules/ol/util.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/AssertionError
 */

/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    /**
     * @param {number} code Error code.
     */
    function AssertionError(code) {
        var _this = this;
        var path = _util_js__WEBPACK_IMPORTED_MODULE_0__.VERSION === 'latest' ? _util_js__WEBPACK_IMPORTED_MODULE_0__.VERSION : 'v' + _util_js__WEBPACK_IMPORTED_MODULE_0__.VERSION.split('-')[0];
        var message = 'Assertion failed. See https://openlayers.org/en/' +
            path +
            '/doc/errors/#' +
            code +
            ' for details.';
        _this = _super.call(this, message) || this;
        /**
         * Error code. The meaning of the code can be found on
         * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
         * the version found in the OpenLayers script's header comment if a version
         * other than the latest is used).
         * @type {number}
         * @api
         */
        _this.code = code;
        /**
         * @type {string}
         */
        _this.name = 'AssertionError';
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        _this.message = message;
        return _this;
    }
    return AssertionError;
}(Error));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssertionError);
//# sourceMappingURL=AssertionError.js.map

/***/ }),

/***/ "../../node_modules/ol/TileRange.js":
/*!******************************************!*\
  !*** ../../node_modules/ol/TileRange.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOrUpdate": () => (/* binding */ createOrUpdate),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/TileRange
 */
/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */
var TileRange = /** @class */ (function () {
    /**
     * @param {number} minX Minimum X.
     * @param {number} maxX Maximum X.
     * @param {number} minY Minimum Y.
     * @param {number} maxY Maximum Y.
     */
    function TileRange(minX, maxX, minY, maxY) {
        /**
         * @type {number}
         */
        this.minX = minX;
        /**
         * @type {number}
         */
        this.maxX = maxX;
        /**
         * @type {number}
         */
        this.minY = minY;
        /**
         * @type {number}
         */
        this.maxY = maxY;
    }
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {boolean} Contains tile coordinate.
     */
    TileRange.prototype.contains = function (tileCoord) {
        return this.containsXY(tileCoord[1], tileCoord[2]);
    };
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Contains.
     */
    TileRange.prototype.containsTileRange = function (tileRange) {
        return (this.minX <= tileRange.minX &&
            tileRange.maxX <= this.maxX &&
            this.minY <= tileRange.minY &&
            tileRange.maxY <= this.maxY);
    };
    /**
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @return {boolean} Contains coordinate.
     */
    TileRange.prototype.containsXY = function (x, y) {
        return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
    };
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Equals.
     */
    TileRange.prototype.equals = function (tileRange) {
        return (this.minX == tileRange.minX &&
            this.minY == tileRange.minY &&
            this.maxX == tileRange.maxX &&
            this.maxY == tileRange.maxY);
    };
    /**
     * @param {TileRange} tileRange Tile range.
     */
    TileRange.prototype.extend = function (tileRange) {
        if (tileRange.minX < this.minX) {
            this.minX = tileRange.minX;
        }
        if (tileRange.maxX > this.maxX) {
            this.maxX = tileRange.maxX;
        }
        if (tileRange.minY < this.minY) {
            this.minY = tileRange.minY;
        }
        if (tileRange.maxY > this.maxY) {
            this.maxY = tileRange.maxY;
        }
    };
    /**
     * @return {number} Height.
     */
    TileRange.prototype.getHeight = function () {
        return this.maxY - this.minY + 1;
    };
    /**
     * @return {import("./size.js").Size} Size.
     */
    TileRange.prototype.getSize = function () {
        return [this.getWidth(), this.getHeight()];
    };
    /**
     * @return {number} Width.
     */
    TileRange.prototype.getWidth = function () {
        return this.maxX - this.minX + 1;
    };
    /**
     * @param {TileRange} tileRange Tile range.
     * @return {boolean} Intersects.
     */
    TileRange.prototype.intersects = function (tileRange) {
        return (this.minX <= tileRange.maxX &&
            this.maxX >= tileRange.minX &&
            this.minY <= tileRange.maxY &&
            this.maxY >= tileRange.minY);
    };
    return TileRange;
}());
/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {TileRange=} tileRange TileRange.
 * @return {TileRange} Tile range.
 */
function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
    if (tileRange !== undefined) {
        tileRange.minX = minX;
        tileRange.maxX = maxX;
        tileRange.minY = minY;
        tileRange.maxY = maxY;
        return tileRange;
    }
    else {
        return new TileRange(minX, maxX, minY, maxY);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileRange);
//# sourceMappingURL=TileRange.js.map

/***/ }),

/***/ "../../node_modules/ol/array.js":
/*!**************************************!*\
  !*** ../../node_modules/ol/array.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binarySearch": () => (/* binding */ binarySearch),
/* harmony export */   "numberSafeCompareFunction": () => (/* binding */ numberSafeCompareFunction),
/* harmony export */   "includes": () => (/* binding */ includes),
/* harmony export */   "linearFindNearest": () => (/* binding */ linearFindNearest),
/* harmony export */   "reverseSubArray": () => (/* binding */ reverseSubArray),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "stableSort": () => (/* binding */ stableSort),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "isSorted": () => (/* binding */ isSorted)
/* harmony export */ });
/**
 * @module ol/array
 */
/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function=} opt_comparator Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
    var mid, cmp;
    var comparator = opt_comparator || numberSafeCompareFunction;
    var low = 0;
    var high = haystack.length;
    var found = false;
    while (low < high) {
        /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
         * to double (which gives the wrong results). */
        mid = low + ((high - low) >> 1);
        cmp = +comparator(haystack[mid], needle);
        if (cmp < 0.0) {
            /* Too low. */
            low = mid + 1;
        }
        else {
            /* Key found or too high */
            high = mid;
            found = !cmp;
        }
    }
    /* Key not found. */
    return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
function numberSafeCompareFunction(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */
function includes(arr, obj) {
    return arr.indexOf(obj) >= 0;
}
/**
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */
function linearFindNearest(arr, target, direction) {
    var n = arr.length;
    if (arr[0] <= target) {
        return 0;
    }
    else if (target <= arr[n - 1]) {
        return n - 1;
    }
    else {
        var i = void 0;
        if (direction > 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] < target) {
                    return i - 1;
                }
            }
        }
        else if (direction < 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] <= target) {
                    return i;
                }
            }
        }
        else {
            for (i = 1; i < n; ++i) {
                if (arr[i] == target) {
                    return i;
                }
                else if (arr[i] < target) {
                    if (arr[i - 1] - target < target - arr[i]) {
                        return i - 1;
                    }
                    else {
                        return i;
                    }
                }
            }
        }
        return n - 1;
    }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */
function reverseSubArray(arr, begin, end) {
    while (begin < end) {
        var tmp = arr[begin];
        arr[begin] = arr[end];
        arr[end] = tmp;
        ++begin;
        --end;
    }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */
function extend(arr, data) {
    var extension = Array.isArray(data) ? data : [data];
    var length = extension.length;
    for (var i = 0; i < length; i++) {
        arr[arr.length] = extension[i];
    }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */
function remove(arr, obj) {
    var i = arr.indexOf(obj);
    var found = i > -1;
    if (found) {
        arr.splice(i, 1);
    }
    return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */
function find(arr, func) {
    var length = arr.length >>> 0;
    var value;
    for (var i = 0; i < length; i++) {
        value = arr[i];
        if (func(value, i, arr)) {
            return value;
        }
    }
    return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
function equals(arr1, arr2) {
    var len1 = arr1.length;
    if (len1 !== arr2.length) {
        return false;
    }
    for (var i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */
function stableSort(arr, compareFnc) {
    var length = arr.length;
    var tmp = Array(arr.length);
    var i;
    for (i = 0; i < length; i++) {
        tmp[i] = { index: i, value: arr[i] };
    }
    tmp.sort(function (a, b) {
        return compareFnc(a.value, b.value) || a.index - b.index;
    });
    for (i = 0; i < arr.length; i++) {
        arr[i] = tmp[i].value;
    }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */
function findIndex(arr, func) {
    var index;
    var found = !arr.every(function (el, idx) {
        index = idx;
        return !func(el, idx, arr);
    });
    return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function=} opt_func Comparison function.
 * @param {boolean=} opt_strict Strictly sorted (default false).
 * @return {boolean} Return index.
 */
function isSorted(arr, opt_func, opt_strict) {
    var compare = opt_func || numberSafeCompareFunction;
    return arr.every(function (currentVal, index) {
        if (index === 0) {
            return true;
        }
        var res = compare(arr[index - 1], currentVal);
        return !(res > 0 || (opt_strict && res === 0));
    });
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "../../node_modules/ol/asserts.js":
/*!****************************************!*\
  !*** ../../node_modules/ol/asserts.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assert": () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssertionError.js */ "../../node_modules/ol/AssertionError.js");
/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
    if (!assertion) {
        throw new _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__.default(errorCode);
    }
}
//# sourceMappingURL=asserts.js.map

/***/ }),

/***/ "../../node_modules/ol/coordinate.js":
/*!*******************************************!*\
  !*** ../../node_modules/ol/coordinate.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "closestOnCircle": () => (/* binding */ closestOnCircle),
/* harmony export */   "closestOnSegment": () => (/* binding */ closestOnSegment),
/* harmony export */   "createStringXY": () => (/* binding */ createStringXY),
/* harmony export */   "degreesToStringHDMS": () => (/* binding */ degreesToStringHDMS),
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistanceToSegment": () => (/* binding */ squaredDistanceToSegment),
/* harmony export */   "toStringHDMS": () => (/* binding */ toStringHDMS),
/* harmony export */   "toStringXY": () => (/* binding */ toStringXY),
/* harmony export */   "wrapX": () => (/* binding */ wrapX),
/* harmony export */   "getWorldsAway": () => (/* binding */ getWorldsAway)
/* harmony export */ });
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extent.js */ "../../node_modules/ol/extent.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "../../node_modules/ol/math.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "../../node_modules/ol/string.js");
/**
 * @module ol/coordinate
 */



/**
 * An array of numbers representing an xy coordinate. Example: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */
/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a `{string}`.
 *
 * @typedef {function((Coordinate|undefined)): string} CoordinateFormat
 * @api
 */
/**
 * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {add} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     add(coord, [-2, 4]);
 *     // coord is now [5.85, 51.983333]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {Coordinate} delta Delta.
 * @return {Coordinate} The input coordinate adjusted by
 * the given delta.
 * @api
 */
function add(coordinate, delta) {
    coordinate[0] += +delta[0];
    coordinate[1] += +delta[1];
    return coordinate;
}
/**
 * Calculates the point closest to the passed coordinate on the passed circle.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {import("./geom/Circle.js").default} circle The circle.
 * @return {Coordinate} Closest point on the circumference.
 */
function closestOnCircle(coordinate, circle) {
    var r = circle.getRadius();
    var center = circle.getCenter();
    var x0 = center[0];
    var y0 = center[1];
    var x1 = coordinate[0];
    var y1 = coordinate[1];
    var dx = x1 - x0;
    var dy = y1 - y0;
    if (dx === 0 && dy === 0) {
        dx = 1;
    }
    var d = Math.sqrt(dx * dx + dy * dy);
    var x = x0 + (r * dx) / d;
    var y = y0 + (r * dy) / d;
    return [x, y];
}
/**
 * Calculates the point closest to the passed coordinate on the passed segment.
 * This is the foot of the perpendicular of the coordinate to the segment when
 * the foot is on the segment, or the closest segment coordinate when the foot
 * is outside the segment.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {Array<Coordinate>} segment The two coordinates
 * of the segment.
 * @return {Coordinate} The foot of the perpendicular of
 * the coordinate to the segment.
 */
function closestOnSegment(coordinate, segment) {
    var x0 = coordinate[0];
    var y0 = coordinate[1];
    var start = segment[0];
    var end = segment[1];
    var x1 = start[0];
    var y1 = start[1];
    var x2 = end[0];
    var y2 = end[1];
    var dx = x2 - x1;
    var dy = y2 - y1;
    var along = dx === 0 && dy === 0
        ? 0
        : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
    var x, y;
    if (along <= 0) {
        x = x1;
        y = y1;
    }
    else if (along >= 1) {
        x = x2;
        y = y2;
    }
    else {
        x = x1 + along * dx;
        y = y1 + along * dy;
    }
    return [x, y];
}
/**
 * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
 * used to format
 * a {Coordinate} to a string.
 *
 * Example without specifying the fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY();
 *     var out = stringifyFunc(coord);
 *     // out is now '8, 48'
 *
 * Example with explicitly specifying 2 fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY(2);
 *     var out = stringifyFunc(coord);
 *     // out is now '7.85, 47.98'
 *
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {CoordinateFormat} Coordinate format.
 * @api
 */
function createStringXY(opt_fractionDigits) {
    return (
    /**
     * @param {Coordinate} coordinate Coordinate.
     * @return {string} String XY.
     */
    function (coordinate) {
        return toStringXY(coordinate, opt_fractionDigits);
    });
}
/**
 * @param {string} hemispheres Hemispheres.
 * @param {number} degrees Degrees.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} String.
 */
function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
    var normalizedDegrees = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.modulo)(degrees + 180, 360) - 180;
    var x = Math.abs(3600 * normalizedDegrees);
    var dflPrecision = opt_fractionDigits || 0;
    var precision = Math.pow(10, dflPrecision);
    var deg = Math.floor(x / 3600);
    var min = Math.floor((x - deg * 3600) / 60);
    var sec = x - deg * 3600 - min * 60;
    sec = Math.ceil(sec * precision) / precision;
    if (sec >= 60) {
        sec = 0;
        min += 1;
    }
    if (min >= 60) {
        min = 0;
        deg += 1;
    }
    return (deg +
        '\u00b0 ' +
        (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.padNumber)(min, 2) +
        '\u2032 ' +
        (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.padNumber)(sec, 2, dflPrecision) +
        '\u2033' +
        (normalizedDegrees == 0
            ? ''
            : ' ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0)));
}
/**
 * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
 * using the given string template. The strings `{x}` and `{y}` in the template
 * will be replaced with the first and second coordinate values respectively.
 *
 * Example without specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template);
 *     // out is now 'Coordinate is (8|48).'
 *
 * Example explicitly specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template, 2);
 *     // out is now 'Coordinate is (7.85|47.98).'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {string} template A template string with `{x}` and `{y}` placeholders
 *     that will be replaced by first and second coordinate values.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Formatted coordinate.
 * @api
 */
function format(coordinate, template, opt_fractionDigits) {
    if (coordinate) {
        return template
            .replace('{x}', coordinate[0].toFixed(opt_fractionDigits))
            .replace('{y}', coordinate[1].toFixed(opt_fractionDigits));
    }
    else {
        return '';
    }
}
/**
 * @param {Coordinate} coordinate1 First coordinate.
 * @param {Coordinate} coordinate2 Second coordinate.
 * @return {boolean} The two coordinates are equal.
 */
function equals(coordinate1, coordinate2) {
    var equals = true;
    for (var i = coordinate1.length - 1; i >= 0; --i) {
        if (coordinate1[i] != coordinate2[i]) {
            equals = false;
            break;
        }
    }
    return equals;
}
/**
 * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
 * returned by the function.
 *
 * Example:
 *
 *     import {rotate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var rotateRadians = Math.PI / 2; // 90 degrees
 *     rotate(coord, rotateRadians);
 *     // coord is now [-47.983333, 7.85]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} angle Angle in radian.
 * @return {Coordinate} Coordinate.
 * @api
 */
function rotate(coordinate, angle) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    coordinate[0] = x;
    coordinate[1] = y;
    return coordinate;
}
/**
 * Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var scale = 1.2;
 *     scaleCoordinate(coord, scale);
 *     // coord is now [9.42, 57.5799996]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} scale Scale factor.
 * @return {Coordinate} Coordinate.
 */
function scale(coordinate, scale) {
    coordinate[0] *= scale;
    coordinate[1] *= scale;
    return coordinate;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Squared distance between coord1 and coord2.
 */
function squaredDistance(coord1, coord2) {
    var dx = coord1[0] - coord2[0];
    var dy = coord1[1] - coord2[1];
    return dx * dx + dy * dy;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Distance between coord1 and coord2.
 */
function distance(coord1, coord2) {
    return Math.sqrt(squaredDistance(coord1, coord2));
}
/**
 * Calculate the squared distance from a coordinate to a line segment.
 *
 * @param {Coordinate} coordinate Coordinate of the point.
 * @param {Array<Coordinate>} segment Line segment (2
 * coordinates).
 * @return {number} Squared distance from the point to the line segment.
 */
function squaredDistanceToSegment(coordinate, segment) {
    return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and
 * seconds.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord);
 *     // out is now '47° 58′ 60″ N 7° 50′ 60″ E'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord, 1);
 *     // out is now '47° 58′ 60.0″ N 7° 50′ 60.0″ E'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Hemisphere, degrees, minutes and seconds.
 * @api
 */
function toStringHDMS(coordinate, opt_fractionDigits) {
    if (coordinate) {
        return (degreesToStringHDMS('NS', coordinate[1], opt_fractionDigits) +
            ' ' +
            degreesToStringHDMS('EW', coordinate[0], opt_fractionDigits));
    }
    else {
        return '';
    }
}
/**
 * Format a coordinate as a comma delimited string.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord);
 *     // out is now '8, 48'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord, 1);
 *     // out is now '7.8, 48.0'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} XY.
 * @api
 */
function toStringXY(coordinate, opt_fractionDigits) {
    return format(coordinate, '{x}, {y}', opt_fractionDigits);
}
/**
 * Modifies the provided coordinate in-place to be within the real world
 * extent. The lower projection extent boundary is inclusive, the upper one
 * exclusive.
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {Coordinate} The coordinate within the real world extent.
 */
function wrapX(coordinate, projection) {
    if (projection.canWrapX()) {
        var worldWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__.getWidth)(projection.getExtent());
        var worldsAway = getWorldsAway(coordinate, projection, worldWidth);
        if (worldsAway) {
            coordinate[0] -= worldsAway * worldWidth;
        }
    }
    return coordinate;
}
/**
 * @param {Coordinate} coordinate Coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {number=} opt_sourceExtentWidth Width of the source extent.
 * @return {number} Offset in world widths.
 */
function getWorldsAway(coordinate, projection, opt_sourceExtentWidth) {
    var projectionExtent = projection.getExtent();
    var worldsAway = 0;
    if (projection.canWrapX() &&
        (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
        var sourceExtentWidth = opt_sourceExtentWidth || (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__.getWidth)(projectionExtent);
        worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
    }
    return worldsAway;
}
//# sourceMappingURL=coordinate.js.map

/***/ }),

/***/ "../../node_modules/ol/extent.js":
/*!***************************************!*\
  !*** ../../node_modules/ol/extent.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boundingExtent": () => (/* binding */ boundingExtent),
/* harmony export */   "buffer": () => (/* binding */ buffer),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "closestSquaredDistanceXY": () => (/* binding */ closestSquaredDistanceXY),
/* harmony export */   "containsCoordinate": () => (/* binding */ containsCoordinate),
/* harmony export */   "containsExtent": () => (/* binding */ containsExtent),
/* harmony export */   "containsXY": () => (/* binding */ containsXY),
/* harmony export */   "coordinateRelationship": () => (/* binding */ coordinateRelationship),
/* harmony export */   "createEmpty": () => (/* binding */ createEmpty),
/* harmony export */   "createOrUpdate": () => (/* binding */ createOrUpdate),
/* harmony export */   "createOrUpdateEmpty": () => (/* binding */ createOrUpdateEmpty),
/* harmony export */   "createOrUpdateFromCoordinate": () => (/* binding */ createOrUpdateFromCoordinate),
/* harmony export */   "createOrUpdateFromCoordinates": () => (/* binding */ createOrUpdateFromCoordinates),
/* harmony export */   "createOrUpdateFromFlatCoordinates": () => (/* binding */ createOrUpdateFromFlatCoordinates),
/* harmony export */   "createOrUpdateFromRings": () => (/* binding */ createOrUpdateFromRings),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "approximatelyEquals": () => (/* binding */ approximatelyEquals),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "extendCoordinate": () => (/* binding */ extendCoordinate),
/* harmony export */   "extendCoordinates": () => (/* binding */ extendCoordinates),
/* harmony export */   "extendFlatCoordinates": () => (/* binding */ extendFlatCoordinates),
/* harmony export */   "extendRings": () => (/* binding */ extendRings),
/* harmony export */   "extendXY": () => (/* binding */ extendXY),
/* harmony export */   "forEachCorner": () => (/* binding */ forEachCorner),
/* harmony export */   "getArea": () => (/* binding */ getArea),
/* harmony export */   "getBottomLeft": () => (/* binding */ getBottomLeft),
/* harmony export */   "getBottomRight": () => (/* binding */ getBottomRight),
/* harmony export */   "getCenter": () => (/* binding */ getCenter),
/* harmony export */   "getCorner": () => (/* binding */ getCorner),
/* harmony export */   "getEnlargedArea": () => (/* binding */ getEnlargedArea),
/* harmony export */   "getForViewAndSize": () => (/* binding */ getForViewAndSize),
/* harmony export */   "getHeight": () => (/* binding */ getHeight),
/* harmony export */   "getIntersectionArea": () => (/* binding */ getIntersectionArea),
/* harmony export */   "getIntersection": () => (/* binding */ getIntersection),
/* harmony export */   "getMargin": () => (/* binding */ getMargin),
/* harmony export */   "getSize": () => (/* binding */ getSize),
/* harmony export */   "getTopLeft": () => (/* binding */ getTopLeft),
/* harmony export */   "getTopRight": () => (/* binding */ getTopRight),
/* harmony export */   "getWidth": () => (/* binding */ getWidth),
/* harmony export */   "intersects": () => (/* binding */ intersects),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "returnOrUpdate": () => (/* binding */ returnOrUpdate),
/* harmony export */   "scaleFromCenter": () => (/* binding */ scaleFromCenter),
/* harmony export */   "intersectsSegment": () => (/* binding */ intersectsSegment),
/* harmony export */   "applyTransform": () => (/* binding */ applyTransform),
/* harmony export */   "wrapX": () => (/* binding */ wrapX)
/* harmony export */ });
/* harmony import */ var _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extent/Corner.js */ "../../node_modules/ol/extent/Corner.js");
/* harmony import */ var _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extent/Relationship.js */ "../../node_modules/ol/extent/Relationship.js");
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./asserts.js */ "../../node_modules/ol/asserts.js");
/**
 * @module ol/extent
 */



/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */
/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
function boundingExtent(coordinates) {
    var extent = createEmpty();
    for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent=} opt_extent Destination extent.
 * @private
 * @return {Extent} Extent.
 */
function _boundingExtentXYs(xs, ys, opt_extent) {
    var minX = Math.min.apply(null, xs);
    var minY = Math.min.apply(null, ys);
    var maxX = Math.max.apply(null, xs);
    var maxY = Math.max.apply(null, ys);
    return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 * @api
 */
function buffer(extent, value, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0] - value;
        opt_extent[1] = extent[1] - value;
        opt_extent[2] = extent[2] + value;
        opt_extent[3] = extent[3] + value;
        return opt_extent;
    }
    else {
        return [
            extent[0] - value,
            extent[1] - value,
            extent[2] + value,
            extent[3] + value,
        ];
    }
}
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} The clone.
 */
function clone(extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    }
    else {
        return extent.slice();
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
function closestSquaredDistanceXY(extent, x, y) {
    var dx, dy;
    if (x < extent[0]) {
        dx = extent[0] - x;
    }
    else if (extent[2] < x) {
        dx = x - extent[2];
    }
    else {
        dx = 0;
    }
    if (y < extent[1]) {
        dy = extent[1] - y;
    }
    else if (extent[3] < y) {
        dy = y - extent[3];
    }
    else {
        dy = 0;
    }
    return dx * dx + dy * dy;
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */
function containsCoordinate(extent, coordinate) {
    return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */
function containsExtent(extent1, extent2) {
    return (extent1[0] <= extent2[0] &&
        extent2[2] <= extent1[2] &&
        extent1[1] <= extent2[1] &&
        extent2[3] <= extent1[3]);
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
function containsXY(extent, x, y) {
    return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */
function coordinateRelationship(extent, coordinate) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var x = coordinate[0];
    var y = coordinate[1];
    var relationship = _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.UNKNOWN;
    if (x < minX) {
        relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.LEFT;
    }
    else if (x > maxX) {
        relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.RIGHT;
    }
    if (y < minY) {
        relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.BELOW;
    }
    else if (y > maxY) {
        relationship = relationship | _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.ABOVE;
    }
    if (relationship === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.UNKNOWN) {
        relationship = _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.INTERSECTING;
    }
    return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */
function createEmpty() {
    return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = minX;
        opt_extent[1] = minY;
        opt_extent[2] = maxX;
        opt_extent[3] = maxY;
        return opt_extent;
    }
    else {
        return [minX, minY, maxX, maxY];
    }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateEmpty(opt_extent) {
    return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromCoordinate(coordinate, opt_extent) {
    var x = coordinate[0];
    var y = coordinate[1];
    return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromCoordinates(coordinates, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function createOrUpdateFromRings(rings, opt_extent) {
    var extent = createOrUpdateEmpty(opt_extent);
    return extendRings(extent, rings);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
function equals(extent1, extent2) {
    return (extent1[0] == extent2[0] &&
        extent1[2] == extent2[2] &&
        extent1[1] == extent2[1] &&
        extent1[3] == extent2[3]);
}
/**
 * Determine if two extents are approximately equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {number} tolerance Tolerance in extent coordinate units.
 * @return {boolean} The two extents differ by less than the tolerance.
 */
function approximatelyEquals(extent1, extent2, tolerance) {
    return (Math.abs(extent1[0] - extent2[0]) < tolerance &&
        Math.abs(extent1[2] - extent2[2]) < tolerance &&
        Math.abs(extent1[1] - extent2[1]) < tolerance &&
        Math.abs(extent1[3] - extent2[3]) < tolerance);
}
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */
function extend(extent1, extent2) {
    if (extent2[0] < extent1[0]) {
        extent1[0] = extent2[0];
    }
    if (extent2[2] > extent1[2]) {
        extent1[2] = extent2[2];
    }
    if (extent2[1] < extent1[1]) {
        extent1[1] = extent2[1];
    }
    if (extent2[3] > extent1[3]) {
        extent1[3] = extent2[3];
    }
    return extent1;
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */
function extendCoordinate(extent, coordinate) {
    if (coordinate[0] < extent[0]) {
        extent[0] = coordinate[0];
    }
    if (coordinate[0] > extent[2]) {
        extent[2] = coordinate[0];
    }
    if (coordinate[1] < extent[1]) {
        extent[1] = coordinate[1];
    }
    if (coordinate[1] > extent[3]) {
        extent[3] = coordinate[1];
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */
function extendCoordinates(extent, coordinates) {
    for (var i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */
function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
    for (; offset < end; offset += stride) {
        extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    }
    return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */
function extendRings(extent, rings) {
    for (var i = 0, ii = rings.length; i < ii; ++i) {
        extendCoordinates(extent, rings[i]);
    }
    return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
function extendXY(extent, x, y) {
    extent[0] = Math.min(extent[0], x);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x);
    extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
 * @return {S|boolean} Value.
 * @template S
 */
function forEachCorner(extent, callback) {
    var val;
    val = callback(getBottomLeft(extent));
    if (val) {
        return val;
    }
    val = callback(getBottomRight(extent));
    if (val) {
        return val;
    }
    val = callback(getTopRight(extent));
    if (val) {
        return val;
    }
    val = callback(getTopLeft(extent));
    if (val) {
        return val;
    }
    return false;
}
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */
function getArea(extent) {
    var area = 0;
    if (!isEmpty(extent)) {
        area = getWidth(extent) * getHeight(extent);
    }
    return area;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */
function getBottomLeft(extent) {
    return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */
function getBottomRight(extent) {
    return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */
function getCenter(extent) {
    return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {import("./extent/Corner.js").default} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */
function getCorner(extent, corner) {
    var coordinate;
    if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__.default.BOTTOM_LEFT) {
        coordinate = getBottomLeft(extent);
    }
    else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__.default.BOTTOM_RIGHT) {
        coordinate = getBottomRight(extent);
    }
    else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__.default.TOP_LEFT) {
        coordinate = getTopLeft(extent);
    }
    else if (corner === _extent_Corner_js__WEBPACK_IMPORTED_MODULE_1__.default.TOP_RIGHT) {
        coordinate = getTopRight(extent);
    }
    else {
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_2__.assert)(false, 13); // Invalid corner
    }
    return coordinate;
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */
function getEnlargedArea(extent1, extent2) {
    var minX = Math.min(extent1[0], extent2[0]);
    var minY = Math.min(extent1[1], extent2[1]);
    var maxX = Math.max(extent1[2], extent2[2]);
    var maxY = Math.max(extent1[3], extent2[3]);
    return (maxX - minX) * (maxY - minY);
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
    var dx = (resolution * size[0]) / 2;
    var dy = (resolution * size[1]) / 2;
    var cosRotation = Math.cos(rotation);
    var sinRotation = Math.sin(rotation);
    var xCos = dx * cosRotation;
    var xSin = dx * sinRotation;
    var yCos = dy * cosRotation;
    var ySin = dy * sinRotation;
    var x = center[0];
    var y = center[1];
    var x0 = x - xCos + ySin;
    var x1 = x - xCos - ySin;
    var x2 = x + xCos - ySin;
    var x3 = x + xCos + ySin;
    var y0 = y - xSin - yCos;
    var y1 = y - xSin + yCos;
    var y2 = y + xSin + yCos;
    var y3 = y + xSin - yCos;
    return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
function getHeight(extent) {
    return extent[3] - extent[1];
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */
function getIntersectionArea(extent1, extent2) {
    var intersection = getIntersection(extent1, extent2);
    return getArea(intersection);
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent=} opt_extent Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */
function getIntersection(extent1, extent2, opt_extent) {
    var intersection = opt_extent ? opt_extent : createEmpty();
    if (intersects(extent1, extent2)) {
        if (extent1[0] > extent2[0]) {
            intersection[0] = extent1[0];
        }
        else {
            intersection[0] = extent2[0];
        }
        if (extent1[1] > extent2[1]) {
            intersection[1] = extent1[1];
        }
        else {
            intersection[1] = extent2[1];
        }
        if (extent1[2] < extent2[2]) {
            intersection[2] = extent1[2];
        }
        else {
            intersection[2] = extent2[2];
        }
        if (extent1[3] < extent2[3]) {
            intersection[3] = extent1[3];
        }
        else {
            intersection[3] = extent2[3];
        }
    }
    else {
        createOrUpdateEmpty(intersection);
    }
    return intersection;
}
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */
function getMargin(extent) {
    return getWidth(extent) + getHeight(extent);
}
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */
function getSize(extent) {
    return [extent[2] - extent[0], extent[3] - extent[1]];
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */
function getTopLeft(extent) {
    return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */
function getTopRight(extent) {
    return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
function getWidth(extent) {
    return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
function intersects(extent1, extent2) {
    return (extent1[0] <= extent2[2] &&
        extent1[2] >= extent2[0] &&
        extent1[1] <= extent2[3] &&
        extent1[3] >= extent2[1]);
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
function isEmpty(extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
function returnOrUpdate(extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    }
    else {
        return extent;
    }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */
function scaleFromCenter(extent, value) {
    var deltaX = ((extent[2] - extent[0]) / 2) * (value - 1);
    var deltaY = ((extent[3] - extent[1]) / 2) * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
function intersectsSegment(extent, start, end) {
    var intersects = false;
    var startRel = coordinateRelationship(extent, start);
    var endRel = coordinateRelationship(extent, end);
    if (startRel === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.INTERSECTING ||
        endRel === _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.INTERSECTING) {
        intersects = true;
    }
    else {
        var minX = extent[0];
        var minY = extent[1];
        var maxX = extent[2];
        var maxY = extent[3];
        var startX = start[0];
        var startY = start[1];
        var endX = end[0];
        var endY = end[1];
        var slope = (endY - startY) / (endX - startX);
        var x = void 0, y = void 0;
        if (!!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.ABOVE) && !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.ABOVE)) {
            // potentially intersects top
            x = endX - (endY - maxY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects &&
            !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.RIGHT) &&
            !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.RIGHT)) {
            // potentially intersects right
            y = endY - (endX - maxX) * slope;
            intersects = y >= minY && y <= maxY;
        }
        if (!intersects &&
            !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.BELOW) &&
            !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.BELOW)) {
            // potentially intersects bottom
            x = endX - (endY - minY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects &&
            !!(endRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.LEFT) &&
            !(startRel & _extent_Relationship_js__WEBPACK_IMPORTED_MODULE_0__.default.LEFT)) {
            // potentially intersects left
            y = endY - (endX - minX) * slope;
            intersects = y >= minY && y <= maxY;
        }
    }
    return intersects;
}
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent=} opt_extent Destination extent.
 * @param {number=} opt_stops Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {Extent} Extent.
 * @api
 */
function applyTransform(extent, transformFn, opt_extent, opt_stops) {
    var coordinates = [];
    if (opt_stops > 1) {
        var width = extent[2] - extent[0];
        var height = extent[3] - extent[1];
        for (var i = 0; i < opt_stops; ++i) {
            coordinates.push(extent[0] + (width * i) / opt_stops, extent[1], extent[2], extent[1] + (height * i) / opt_stops, extent[2] - (width * i) / opt_stops, extent[3], extent[0], extent[3] - (height * i) / opt_stops);
        }
    }
    else {
        coordinates = [
            extent[0],
            extent[1],
            extent[2],
            extent[1],
            extent[2],
            extent[3],
            extent[0],
            extent[3],
        ];
    }
    transformFn(coordinates, coordinates, 2);
    var xs = [];
    var ys = [];
    for (var i = 0, l = coordinates.length; i < l; i += 2) {
        xs.push(coordinates[i]);
        ys.push(coordinates[i + 1]);
    }
    return _boundingExtentXYs(xs, ys, opt_extent);
}
/**
 * Modifies the provided extent in-place to be within the real world
 * extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./proj/Projection.js").default} projection Projection
 * @return {Extent} The extent within the real world extent.
 */
function wrapX(extent, projection) {
    var projectionExtent = projection.getExtent();
    var center = getCenter(extent);
    if (projection.canWrapX() &&
        (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
        var worldWidth = getWidth(projectionExtent);
        var worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
        var offset = worldsAway * worldWidth;
        extent[0] -= offset;
        extent[2] -= offset;
    }
    return extent;
}
//# sourceMappingURL=extent.js.map

/***/ }),

/***/ "../../node_modules/ol/extent/Corner.js":
/*!**********************************************!*\
  !*** ../../node_modules/ol/extent/Corner.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/extent/Corner
 */
/**
 * Extent corner.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
});
//# sourceMappingURL=Corner.js.map

/***/ }),

/***/ "../../node_modules/ol/extent/Relationship.js":
/*!****************************************************!*\
  !*** ../../node_modules/ol/extent/Relationship.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/extent/Relationship
 */
/**
 * Relationship to an extent.
 * @enum {number}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16,
});
//# sourceMappingURL=Relationship.js.map

/***/ }),

/***/ "../../node_modules/ol/geom/GeometryType.js":
/*!**************************************************!*\
  !*** ../../node_modules/ol/geom/GeometryType.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/geom/GeometryType
 */
/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    POINT: 'Point',
    LINE_STRING: 'LineString',
    LINEAR_RING: 'LinearRing',
    POLYGON: 'Polygon',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon',
    GEOMETRY_COLLECTION: 'GeometryCollection',
    CIRCLE: 'Circle',
});
//# sourceMappingURL=GeometryType.js.map

/***/ }),

/***/ "../../node_modules/ol/math.js":
/*!*************************************!*\
  !*** ../../node_modules/ol/math.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "cosh": () => (/* binding */ cosh),
/* harmony export */   "log2": () => (/* binding */ log2),
/* harmony export */   "squaredSegmentDistance": () => (/* binding */ squaredSegmentDistance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "solveLinearSystem": () => (/* binding */ solveLinearSystem),
/* harmony export */   "toDegrees": () => (/* binding */ toDegrees),
/* harmony export */   "toRadians": () => (/* binding */ toRadians),
/* harmony export */   "modulo": () => (/* binding */ modulo),
/* harmony export */   "lerp": () => (/* binding */ lerp)
/* harmony export */ });
/**
 * @module ol/math
 */
/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */
var cosh = (function () {
    // Wrapped in a iife, to save the overhead of checking for the native
    // implementation on every invocation.
    var cosh;
    if ('cosh' in Math) {
        // The environment supports the native Math.cosh function, use it…
        cosh = Math.cosh;
    }
    else {
        // … else, use the reference implementation of MDN:
        cosh = function (x) {
            var y = /** @type {Math} */ (Math).exp(x);
            return (y + 1 / y) / 2;
        };
    }
    return cosh;
})();
/**
 * Return the base 2 logarithm of a given number. The method will use the
 * native `Math.log2` function if it is available, otherwise the base 2
 * logarithm will be calculated via the reference implementation of the
 * Mozilla developer network.
 *
 * @param {number} x X.
 * @return {number} Base 2 logarithm of x.
 */
var log2 = (function () {
    // Wrapped in a iife, to save the overhead of checking for the native
    // implementation on every invocation.
    var log2;
    if ('log2' in Math) {
        // The environment supports the native Math.log2 function, use it…
        log2 = Math.log2;
    }
    else {
        // … else, use the reference implementation of MDN:
        log2 = function (x) {
            return Math.log(x) * Math.LOG2E;
        };
    }
    return log2;
})();
/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (dx !== 0 || dy !== 0) {
        var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x1 = x2;
            y1 = y2;
        }
        else if (t > 0) {
            x1 += dx * t;
            y1 += dy * t;
        }
    }
    return squaredDistance(x, y, x1, y1);
}
/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
function squaredDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}
/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array<number>} The resulting vector.
 */
function solveLinearSystem(mat) {
    var n = mat.length;
    for (var i = 0; i < n; i++) {
        // Find max in the i-th column (ignoring i - 1 first rows)
        var maxRow = i;
        var maxEl = Math.abs(mat[i][i]);
        for (var r = i + 1; r < n; r++) {
            var absValue = Math.abs(mat[r][i]);
            if (absValue > maxEl) {
                maxEl = absValue;
                maxRow = r;
            }
        }
        if (maxEl === 0) {
            return null; // matrix is singular
        }
        // Swap max row with i-th (current) row
        var tmp = mat[maxRow];
        mat[maxRow] = mat[i];
        mat[i] = tmp;
        // Subtract the i-th row to make all the remaining rows 0 in the i-th column
        for (var j = i + 1; j < n; j++) {
            var coef = -mat[j][i] / mat[i][i];
            for (var k = i; k < n + 1; k++) {
                if (i == k) {
                    mat[j][k] = 0;
                }
                else {
                    mat[j][k] += coef * mat[i][k];
                }
            }
        }
    }
    // Solve Ax=b for upper triangular matrix A (mat)
    var x = new Array(n);
    for (var l = n - 1; l >= 0; l--) {
        x[l] = mat[l][n] / mat[l][l];
        for (var m = l - 1; m >= 0; m--) {
            mat[m][n] -= mat[m][l] * x[l];
        }
    }
    return x;
}
/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */
function toDegrees(angleInRadians) {
    return (angleInRadians * 180) / Math.PI;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */
function toRadians(angleInDegrees) {
    return (angleInDegrees * Math.PI) / 180;
}
/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */
function modulo(a, b) {
    var r = a % b;
    return r * b < 0 ? r + b : r;
}
/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */
function lerp(a, b, x) {
    return a + x * (b - a);
}
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "../../node_modules/ol/obj.js":
/*!************************************!*\
  !*** ../../node_modules/ol/obj.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "getValues": () => (/* binding */ getValues),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty)
/* harmony export */ });
/**
 * @module ol/obj
 */
/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function'
    ? Object.assign
    : function (target, var_sources) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var source = arguments[i];
            if (source !== undefined && source !== null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        output[key] = source[key];
                    }
                }
            }
        }
        return output;
    };
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
function clear(object) {
    for (var property in object) {
        delete object[property];
    }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */
var getValues = typeof Object.values === 'function'
    ? Object.values
    : function (object) {
        var values = [];
        for (var property in object) {
            values.push(object[property]);
        }
        return values;
    };
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
function isEmpty(object) {
    var property;
    for (property in object) {
        return false;
    }
    return !property;
}
//# sourceMappingURL=obj.js.map

/***/ }),

/***/ "../../node_modules/ol/proj.js":
/*!*************************************!*\
  !*** ../../node_modules/ol/proj.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "METERS_PER_UNIT": () => (/* reexport safe */ _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.METERS_PER_UNIT),
/* harmony export */   "Projection": () => (/* reexport safe */ _proj_Projection_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "cloneTransform": () => (/* binding */ cloneTransform),
/* harmony export */   "identityTransform": () => (/* binding */ identityTransform),
/* harmony export */   "addProjection": () => (/* binding */ addProjection),
/* harmony export */   "addProjections": () => (/* binding */ addProjections),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getPointResolution": () => (/* binding */ getPointResolution),
/* harmony export */   "addEquivalentProjections": () => (/* binding */ addEquivalentProjections),
/* harmony export */   "addEquivalentTransforms": () => (/* binding */ addEquivalentTransforms),
/* harmony export */   "clearAllProjections": () => (/* binding */ clearAllProjections),
/* harmony export */   "createProjection": () => (/* binding */ createProjection),
/* harmony export */   "createTransformFromCoordinateTransform": () => (/* binding */ createTransformFromCoordinateTransform),
/* harmony export */   "addCoordinateTransforms": () => (/* binding */ addCoordinateTransforms),
/* harmony export */   "fromLonLat": () => (/* binding */ fromLonLat),
/* harmony export */   "toLonLat": () => (/* binding */ toLonLat),
/* harmony export */   "equivalent": () => (/* binding */ equivalent),
/* harmony export */   "getTransformFromProjections": () => (/* binding */ getTransformFromProjections),
/* harmony export */   "getTransform": () => (/* binding */ getTransform),
/* harmony export */   "transform": () => (/* binding */ transform),
/* harmony export */   "transformExtent": () => (/* binding */ transformExtent),
/* harmony export */   "transformWithProjections": () => (/* binding */ transformWithProjections),
/* harmony export */   "setUserProjection": () => (/* binding */ setUserProjection),
/* harmony export */   "clearUserProjection": () => (/* binding */ clearUserProjection),
/* harmony export */   "getUserProjection": () => (/* binding */ getUserProjection),
/* harmony export */   "useGeographic": () => (/* binding */ useGeographic),
/* harmony export */   "toUserCoordinate": () => (/* binding */ toUserCoordinate),
/* harmony export */   "fromUserCoordinate": () => (/* binding */ fromUserCoordinate),
/* harmony export */   "toUserExtent": () => (/* binding */ toUserExtent),
/* harmony export */   "fromUserExtent": () => (/* binding */ fromUserExtent),
/* harmony export */   "createSafeCoordinateTransform": () => (/* binding */ createSafeCoordinateTransform),
/* harmony export */   "addCommon": () => (/* binding */ addCommon)
/* harmony export */ });
/* harmony import */ var _proj_Projection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proj/Projection.js */ "../../node_modules/ol/proj/Projection.js");
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proj/Units.js */ "../../node_modules/ol/proj/Units.js");
/* harmony import */ var _proj_epsg3857_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./proj/epsg3857.js */ "../../node_modules/ol/proj/epsg3857.js");
/* harmony import */ var _proj_epsg4326_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./proj/epsg4326.js */ "../../node_modules/ol/proj/epsg4326.js");
/* harmony import */ var _proj_projections_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./proj/projections.js */ "../../node_modules/ol/proj/projections.js");
/* harmony import */ var _proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./proj/transforms.js */ "../../node_modules/ol/proj/transforms.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extent.js */ "../../node_modules/ol/extent.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math.js */ "../../node_modules/ol/math.js");
/* harmony import */ var _sphere_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sphere.js */ "../../node_modules/ol/sphere.js");
/* harmony import */ var _coordinate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./coordinate.js */ "../../node_modules/ol/coordinate.js");
/**
 * @module ol/proj
 */
/**
 * The ol/proj module stores:
 * * a list of {@link module:ol/proj/Projection}
 * objects, one for each projection supported by the application
 * * a list of transform functions needed to convert coordinates in one projection
 * into another.
 *
 * The static functions are the methods used to maintain these.
 * Each transform function can handle not only simple coordinate pairs, but also
 * large arrays of coordinates such as vector geometries.
 *
 * When loaded, the library adds projection objects for EPSG:4326 (WGS84
 * geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
 * for example by Bing Maps or OpenStreetMap), together with the relevant
 * transform functions.
 *
 * Additional transforms may be added by using the http://proj4js.org/
 * library (version 2.2 or later). You can use the full build supplied by
 * Proj4js, or create a custom build to support those projections you need; see
 * the Proj4js website for how to do this. You also need the Proj4js definitions
 * for the required projections. These definitions can be obtained from
 * https://epsg.io/, and are a JS function, so can be loaded in a script
 * tag (as in the examples) or pasted into your application.
 *
 * After all required projection definitions are added to proj4's registry (by
 * using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
 * package. Existing transforms are not changed by this function. See
 * examples/wms-image-custom-proj for an example of this.
 *
 * Additional projection definitions can be registered with `proj4.defs()` any
 * time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
 * know in advance what projections are needed, you can initially load minimal
 * support and then load whichever are requested.
 *
 * Note that Proj4js does not support projection extents. If you want to add
 * one for creating default tile grids, you can add it after the Projection
 * object has been created with `setExtent`, for example,
 * `get('EPSG:1234').setExtent(extent)`.
 *
 * In addition to Proj4js support, any transform functions can be added with
 * {@link module:ol/proj~addCoordinateTransforms}. To use this, you must first create
 * a {@link module:ol/proj/Projection} object for the new projection and add it with
 * {@link module:ol/proj~addProjection}. You can then add the forward and inverse
 * functions with {@link module:ol/proj~addCoordinateTransforms}. See
 * examples/wms-custom-proj for an example of this.
 *
 * Note that if no transforms are needed and you only need to define the
 * projection, just add a {@link module:ol/proj/Projection} with
 * {@link module:ol/proj~addProjection}. See examples/wms-no-proj for an example of
 * this.
 */










/**
 * A projection as {@link module:ol/proj/Projection}, SRS identifier
 * string or undefined.
 * @typedef {Projection|string|undefined} ProjectionLike
 * @api
 */
/**
 * A transform function accepts an array of input coordinate values, an optional
 * output array, and an optional dimension (default should be 2).  The function
 * transforms the input coordinate values, populates the output array, and
 * returns the output array.
 *
 * @typedef {function(Array<number>, Array<number>=, number=): Array<number>} TransformFunction
 * @api
 */


/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Output coordinate array (new array, same coordinate
 *     values).
 */
function cloneTransform(input, opt_output, opt_dimension) {
    var output;
    if (opt_output !== undefined) {
        for (var i = 0, ii = input.length; i < ii; ++i) {
            opt_output[i] = input[i];
        }
        output = opt_output;
    }
    else {
        output = input.slice();
    }
    return output;
}
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Input coordinate array (same array as input).
 */
function identityTransform(input, opt_output, opt_dimension) {
    if (opt_output !== undefined && input !== opt_output) {
        for (var i = 0, ii = input.length; i < ii; ++i) {
            opt_output[i] = input[i];
        }
        input = opt_output;
    }
    return input;
}
/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {Projection} projection Projection instance.
 * @api
 */
function addProjection(projection) {
    (0,_proj_projections_js__WEBPACK_IMPORTED_MODULE_2__.add)(projection.getCode(), projection);
    (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(projection, projection, cloneTransform);
}
/**
 * @param {Array<Projection>} projections Projections.
 */
function addProjections(projections) {
    projections.forEach(addProjection);
}
/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {Projection} Projection object, or null if not in list.
 * @api
 */
function get(projectionLike) {
    return typeof projectionLike === 'string'
        ? (0,_proj_projections_js__WEBPACK_IMPORTED_MODULE_2__.get)(/** @type {string} */ (projectionLike))
        : /** @type {Projection} */ (projectionLike) || null;
}
/**
 * Get the resolution of the point in degrees or distance units.
 * For projections with degrees as the unit this will simply return the
 * provided resolution. For other projections the point resolution is
 * by default estimated by transforming the 'point' pixel to EPSG:4326,
 * measuring its width and height on the normal sphere,
 * and taking the average of the width and height.
 * A custom function can be provided for a specific projection, either
 * by setting the `getPointResolution` option in the
 * {@link module:ol/proj/Projection~Projection} constructor or by using
 * {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
 * projection object.
 * @param {ProjectionLike} projection The projection.
 * @param {number} resolution Nominal resolution in projection units.
 * @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
 * @param {import("./proj/Units.js").default=} opt_units Units to get the point resolution in.
 * Default is the projection's units.
 * @return {number} Point resolution.
 * @api
 */
function getPointResolution(projection, resolution, point, opt_units) {
    projection = get(projection);
    var pointResolution;
    var getter = projection.getPointResolutionFunc();
    if (getter) {
        pointResolution = getter(resolution, point);
        if (opt_units && opt_units !== projection.getUnits()) {
            var metersPerUnit = projection.getMetersPerUnit();
            if (metersPerUnit) {
                pointResolution =
                    (pointResolution * metersPerUnit) / _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.METERS_PER_UNIT[opt_units];
            }
        }
    }
    else {
        var units = projection.getUnits();
        if ((units == _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.default.DEGREES && !opt_units) || opt_units == _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.default.DEGREES) {
            pointResolution = resolution;
        }
        else {
            // Estimate point resolution by transforming the center pixel to EPSG:4326,
            // measuring its width and height on the normal sphere, and taking the
            // average of the width and height.
            var toEPSG4326_1 = getTransformFromProjections(projection, get('EPSG:4326'));
            if (toEPSG4326_1 === identityTransform && units !== _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.default.DEGREES) {
                // no transform is available
                pointResolution = resolution * projection.getMetersPerUnit();
            }
            else {
                var vertices = [
                    point[0] - resolution / 2,
                    point[1],
                    point[0] + resolution / 2,
                    point[1],
                    point[0],
                    point[1] - resolution / 2,
                    point[0],
                    point[1] + resolution / 2,
                ];
                vertices = toEPSG4326_1(vertices, vertices, 2);
                var width = (0,_sphere_js__WEBPACK_IMPORTED_MODULE_4__.getDistance)(vertices.slice(0, 2), vertices.slice(2, 4));
                var height = (0,_sphere_js__WEBPACK_IMPORTED_MODULE_4__.getDistance)(vertices.slice(4, 6), vertices.slice(6, 8));
                pointResolution = (width + height) / 2;
            }
            var metersPerUnit = opt_units
                ? _proj_Units_js__WEBPACK_IMPORTED_MODULE_0__.METERS_PER_UNIT[opt_units]
                : projection.getMetersPerUnit();
            if (metersPerUnit !== undefined) {
                pointResolution /= metersPerUnit;
            }
        }
    }
    return pointResolution;
}
/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array<Projection>} projections Projections.
 * @api
 */
function addEquivalentProjections(projections) {
    addProjections(projections);
    projections.forEach(function (source) {
        projections.forEach(function (destination) {
            if (source !== destination) {
                (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(source, destination, cloneTransform);
            }
        });
    });
}
/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array<Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array<Projection>} projections2 Projections with equal
 *     meaning.
 * @param {TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */
function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
    projections1.forEach(function (projection1) {
        projections2.forEach(function (projection2) {
            (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(projection1, projection2, forwardTransform);
            (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(projection2, projection1, inverseTransform);
        });
    });
}
/**
 * Clear all cached projections and transforms.
 */
function clearAllProjections() {
    (0,_proj_projections_js__WEBPACK_IMPORTED_MODULE_2__.clear)();
    (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.clear)();
}
/**
 * @param {Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {Projection} Projection.
 */
function createProjection(projection, defaultCode) {
    if (!projection) {
        return get(defaultCode);
    }
    else if (typeof projection === 'string') {
        return get(projection);
    }
    else {
        return /** @type {Projection} */ (projection);
    }
}
/**
 * Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
 * function.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
 *     transform.
 * @return {TransformFunction} Transform function.
 */
function createTransformFromCoordinateTransform(coordTransform) {
    return (
    /**
     * @param {Array<number>} input Input.
     * @param {Array<number>=} opt_output Output.
     * @param {number=} opt_dimension Dimension.
     * @return {Array<number>} Output.
     */
    function (input, opt_output, opt_dimension) {
        var length = input.length;
        var dimension = opt_dimension !== undefined ? opt_dimension : 2;
        var output = opt_output !== undefined ? opt_output : new Array(length);
        for (var i = 0; i < length; i += dimension) {
            var point = coordTransform([input[i], input[i + 1]]);
            output[i] = point[0];
            output[i + 1] = point[1];
            for (var j = dimension - 1; j >= 2; --j) {
                output[i + j] = input[i + j];
            }
        }
        return output;
    });
}
/**
 * Registers coordinate transform functions to convert coordinates between the
 * source projection and the destination projection.
 * The forward and inverse functions convert coordinate pairs; this function
 * converts these into the functions used internally which also handle
 * extents and coordinate arrays.
 *
 * @param {ProjectionLike} source Source projection.
 * @param {ProjectionLike} destination Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} forward The forward transform
 *     function (that is, from the source projection to the destination
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} inverse The inverse transform
 *     function (that is, from the destination projection to the source
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @api
 */
function addCoordinateTransforms(source, destination, forward, inverse) {
    var sourceProj = get(source);
    var destProj = get(destination);
    (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(sourceProj, destProj, createTransformFromCoordinateTransform(forward));
    (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.add)(destProj, sourceProj, createTransformFromCoordinateTransform(inverse));
}
/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate as longitude and latitude, i.e.
 *     an array with longitude as 1st and latitude as 2nd element.
 * @param {ProjectionLike=} opt_projection Target projection. The
 *     default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate projected to the target projection.
 * @api
 */
function fromLonLat(coordinate, opt_projection) {
    return transform(coordinate, 'EPSG:4326', opt_projection !== undefined ? opt_projection : 'EPSG:3857');
}
/**
 * Transforms a coordinate to longitude/latitude.
 * @param {import("./coordinate.js").Coordinate} coordinate Projected coordinate.
 * @param {ProjectionLike=} opt_projection Projection of the coordinate.
 *     The default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate as longitude and latitude, i.e. an array
 *     with longitude as 1st and latitude as 2nd element.
 * @api
 */
function toLonLat(coordinate, opt_projection) {
    var lonLat = transform(coordinate, opt_projection !== undefined ? opt_projection : 'EPSG:3857', 'EPSG:4326');
    var lon = lonLat[0];
    if (lon < -180 || lon > 180) {
        lonLat[0] = (0,_math_js__WEBPACK_IMPORTED_MODULE_5__.modulo)(lon + 180, 360) - 180;
    }
    return lonLat;
}
/**
 * Checks if two projections are the same, that is every coordinate in one
 * projection does represent the same geographic point as the same coordinate in
 * the other projection.
 *
 * @param {Projection} projection1 Projection 1.
 * @param {Projection} projection2 Projection 2.
 * @return {boolean} Equivalent.
 * @api
 */
function equivalent(projection1, projection2) {
    if (projection1 === projection2) {
        return true;
    }
    var equalUnits = projection1.getUnits() === projection2.getUnits();
    if (projection1.getCode() === projection2.getCode()) {
        return equalUnits;
    }
    else {
        var transformFunc = getTransformFromProjections(projection1, projection2);
        return transformFunc === cloneTransform && equalUnits;
    }
}
/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {Projection} sourceProjection Source Projection object.
 * @param {Projection} destinationProjection Destination Projection
 *     object.
 * @return {TransformFunction} Transform function.
 */
function getTransformFromProjections(sourceProjection, destinationProjection) {
    var sourceCode = sourceProjection.getCode();
    var destinationCode = destinationProjection.getCode();
    var transformFunc = (0,_proj_transforms_js__WEBPACK_IMPORTED_MODULE_3__.get)(sourceCode, destinationCode);
    if (!transformFunc) {
        transformFunc = identityTransform;
    }
    return transformFunc;
}
/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ProjectionLike} source Source.
 * @param {ProjectionLike} destination Destination.
 * @return {TransformFunction} Transform function.
 * @api
 */
function getTransform(source, destination) {
    var sourceProjection = get(source);
    var destinationProjection = get(destination);
    return getTransformFromProjections(sourceProjection, destinationProjection);
}
/**
 * Transforms a coordinate from source projection to destination projection.
 * This returns a new coordinate (and does not modify the original).
 *
 * See {@link module:ol/proj~transformExtent} for extent transformation.
 * See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
 * subclasses for geometry transforms.
 *
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @return {import("./coordinate.js").Coordinate} Coordinate.
 * @api
 */
function transform(coordinate, source, destination) {
    var transformFunc = getTransform(source, destination);
    return transformFunc(coordinate, undefined, coordinate.length);
}
/**
 * Transforms an extent from source projection to destination projection.  This
 * returns a new extent (and does not modify the original).
 *
 * @param {import("./extent.js").Extent} extent The extent to transform.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @param {number=} opt_stops Number of stops per side used for the transform.
 * By default only the corners are used.
 * @return {import("./extent.js").Extent} The transformed extent.
 * @api
 */
function transformExtent(extent, source, destination, opt_stops) {
    var transformFunc = getTransform(source, destination);
    return (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__.applyTransform)(extent, transformFunc, undefined, opt_stops);
}
/**
 * Transforms the given point to the destination projection.
 *
 * @param {import("./coordinate.js").Coordinate} point Point.
 * @param {Projection} sourceProjection Source projection.
 * @param {Projection} destinationProjection Destination projection.
 * @return {import("./coordinate.js").Coordinate} Point.
 */
function transformWithProjections(point, sourceProjection, destinationProjection) {
    var transformFunc = getTransformFromProjections(sourceProjection, destinationProjection);
    return transformFunc(point);
}
/**
 * @type {?Projection}
 */
var userProjection = null;
/**
 * Set the projection for coordinates supplied from and returned by API methods.
 * Note that this method is not yet a part of the stable API.  Support for user
 * projections is not yet complete and should be considered experimental.
 * @param {ProjectionLike} projection The user projection.
 */
function setUserProjection(projection) {
    userProjection = get(projection);
}
/**
 * Clear the user projection if set.  Note that this method is not yet a part of
 * the stable API.  Support for user projections is not yet complete and should
 * be considered experimental.
 */
function clearUserProjection() {
    userProjection = null;
}
/**
 * Get the projection for coordinates supplied from and returned by API methods.
 * Note that this method is not yet a part of the stable API.  Support for user
 * projections is not yet complete and should be considered experimental.
 * @returns {?Projection} The user projection (or null if not set).
 */
function getUserProjection() {
    return userProjection;
}
/**
 * Use geographic coordinates (WGS-84 datum) in API methods.  Note that this
 * method is not yet a part of the stable API.  Support for user projections is
 * not yet complete and should be considered experimental.
 */
function useGeographic() {
    setUserProjection('EPSG:4326');
}
/**
 * Return a coordinate transformed into the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} sourceProjection The input coordinate projection.
 * @returns {Array<number>} The input coordinate in the user projection.
 */
function toUserCoordinate(coordinate, sourceProjection) {
    if (!userProjection) {
        return coordinate;
    }
    return transform(coordinate, sourceProjection, userProjection);
}
/**
 * Return a coordinate transformed from the user projection.  If no user projection
 * is set, the original coordinate is returned.
 * @param {Array<number>} coordinate Input coordinate.
 * @param {ProjectionLike} destProjection The destination projection.
 * @returns {Array<number>} The input coordinate transformed.
 */
function fromUserCoordinate(coordinate, destProjection) {
    if (!userProjection) {
        return coordinate;
    }
    return transform(coordinate, userProjection, destProjection);
}
/**
 * Return an extent transformed into the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} sourceProjection The input extent projection.
 * @returns {import("./extent.js").Extent} The input extent in the user projection.
 */
function toUserExtent(extent, sourceProjection) {
    if (!userProjection) {
        return extent;
    }
    return transformExtent(extent, sourceProjection, userProjection);
}
/**
 * Return an extent transformed from the user projection.  If no user projection
 * is set, the original extent is returned.
 * @param {import("./extent.js").Extent} extent Input extent.
 * @param {ProjectionLike} destProjection The destination projection.
 * @returns {import("./extent.js").Extent} The input extent transformed.
 */
function fromUserExtent(extent, destProjection) {
    if (!userProjection) {
        return extent;
    }
    return transformExtent(extent, userProjection, destProjection);
}
/**
 * Creates a safe coordinate transform function from a coordinate transform function.
 * "Safe" means that it can handle wrapping of x-coordinates for global projections,
 * and that coordinates exceeding the source projection validity extent's range will be
 * clamped to the validity range.
 * @param {Projection} sourceProj Source projection.
 * @param {Projection} destProj Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} transform Transform function (source to destiation).
 * @return {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} Safe transform function (source to destiation).
 */
function createSafeCoordinateTransform(sourceProj, destProj, transform) {
    return function (coord) {
        var sourceX = coord[0];
        var sourceY = coord[1];
        var transformed, worldsAway;
        if (sourceProj.canWrapX()) {
            var sourceExtent = sourceProj.getExtent();
            var sourceExtentWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__.getWidth)(sourceExtent);
            worldsAway = (0,_coordinate_js__WEBPACK_IMPORTED_MODULE_7__.getWorldsAway)(coord, sourceProj, sourceExtentWidth);
            if (worldsAway) {
                // Move x to the real world
                sourceX = sourceX - worldsAway * sourceExtentWidth;
            }
            sourceX = (0,_math_js__WEBPACK_IMPORTED_MODULE_5__.clamp)(sourceX, sourceExtent[0], sourceExtent[2]);
            sourceY = (0,_math_js__WEBPACK_IMPORTED_MODULE_5__.clamp)(sourceY, sourceExtent[1], sourceExtent[3]);
            transformed = transform([sourceX, sourceY]);
        }
        else {
            transformed = transform(coord);
        }
        if (worldsAway && destProj.canWrapX()) {
            // Move transformed coordinate back to the offset world
            transformed[0] += worldsAway * (0,_extent_js__WEBPACK_IMPORTED_MODULE_6__.getWidth)(destProj.getExtent());
        }
        return transformed;
    };
}
/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `clearAllProjections()` is called (e.g. in tests).
 */
function addCommon() {
    // Add transformations that don't alter coordinates to convert within set of
    // projections with equal meaning.
    addEquivalentProjections(_proj_epsg3857_js__WEBPACK_IMPORTED_MODULE_8__.PROJECTIONS);
    addEquivalentProjections(_proj_epsg4326_js__WEBPACK_IMPORTED_MODULE_9__.PROJECTIONS);
    // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
    // coordinates and back.
    addEquivalentTransforms(_proj_epsg4326_js__WEBPACK_IMPORTED_MODULE_9__.PROJECTIONS, _proj_epsg3857_js__WEBPACK_IMPORTED_MODULE_8__.PROJECTIONS, _proj_epsg3857_js__WEBPACK_IMPORTED_MODULE_8__.fromEPSG4326, _proj_epsg3857_js__WEBPACK_IMPORTED_MODULE_8__.toEPSG4326);
}
addCommon();
//# sourceMappingURL=proj.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/Projection.js":
/*!************************************************!*\
  !*** ../../node_modules/ol/proj/Projection.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Units_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Units.js */ "../../node_modules/ol/proj/Units.js");
/**
 * @module ol/proj/Projection
 */

/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").default|string} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link module:ol/proj/Units~METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `{number}` view resolution and an `{import("../coordinate.js").Coordinate}` as arguments, and returns
 * the `{number}` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj#getPointResolution} function will be used.
 */
/**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj~get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4~register} function.
 *
 * @api
 */
var Projection = /** @class */ (function () {
    /**
     * @param {Options} options Projection options.
     */
    function Projection(options) {
        /**
         * @private
         * @type {string}
         */
        this.code_ = options.code;
        /**
         * Units of projected coordinates. When set to `TILE_PIXELS`, a
         * `this.extent_` and `this.worldExtent_` must be configured properly for each
         * tile.
         * @private
         * @type {import("./Units.js").default}
         */
        this.units_ = /** @type {import("./Units.js").default} */ (options.units);
        /**
         * Validity extent of the projection in projected coordinates. For projections
         * with `TILE_PIXELS` units, this is the extent of the tile in
         * tile pixel space.
         * @private
         * @type {import("../extent.js").Extent}
         */
        this.extent_ = options.extent !== undefined ? options.extent : null;
        /**
         * Extent of the world in EPSG:4326. For projections with
         * `TILE_PIXELS` units, this is the extent of the tile in
         * projected coordinate space.
         * @private
         * @type {import("../extent.js").Extent}
         */
        this.worldExtent_ =
            options.worldExtent !== undefined ? options.worldExtent : null;
        /**
         * @private
         * @type {string}
         */
        this.axisOrientation_ =
            options.axisOrientation !== undefined ? options.axisOrientation : 'enu';
        /**
         * @private
         * @type {boolean}
         */
        this.global_ = options.global !== undefined ? options.global : false;
        /**
         * @private
         * @type {boolean}
         */
        this.canWrapX_ = !!(this.global_ && this.extent_);
        /**
         * @private
         * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
         */
        this.getPointResolutionFunc_ = options.getPointResolution;
        /**
         * @private
         * @type {import("../tilegrid/TileGrid.js").default}
         */
        this.defaultTileGrid_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        this.metersPerUnit_ = options.metersPerUnit;
    }
    /**
     * @return {boolean} The projection is suitable for wrapping the x-axis
     */
    Projection.prototype.canWrapX = function () {
        return this.canWrapX_;
    };
    /**
     * Get the code for this projection, e.g. 'EPSG:4326'.
     * @return {string} Code.
     * @api
     */
    Projection.prototype.getCode = function () {
        return this.code_;
    };
    /**
     * Get the validity extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    Projection.prototype.getExtent = function () {
        return this.extent_;
    };
    /**
     * Get the units of this projection.
     * @return {import("./Units.js").default} Units.
     * @api
     */
    Projection.prototype.getUnits = function () {
        return this.units_;
    };
    /**
     * Get the amount of meters per unit of this projection.  If the projection is
     * not configured with `metersPerUnit` or a units identifier, the return is
     * `undefined`.
     * @return {number|undefined} Meters.
     * @api
     */
    Projection.prototype.getMetersPerUnit = function () {
        return this.metersPerUnit_ || _Units_js__WEBPACK_IMPORTED_MODULE_0__.METERS_PER_UNIT[this.units_];
    };
    /**
     * Get the world extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    Projection.prototype.getWorldExtent = function () {
        return this.worldExtent_;
    };
    /**
     * Get the axis orientation of this projection.
     * Example values are:
     * enu - the default easting, northing, elevation.
     * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
     *     or south orientated transverse mercator.
     * wnu - westing, northing, up - some planetary coordinate systems have
     *     "west positive" coordinate systems
     * @return {string} Axis orientation.
     * @api
     */
    Projection.prototype.getAxisOrientation = function () {
        return this.axisOrientation_;
    };
    /**
     * Is this projection a global projection which spans the whole world?
     * @return {boolean} Whether the projection is global.
     * @api
     */
    Projection.prototype.isGlobal = function () {
        return this.global_;
    };
    /**
     * Set if the projection is a global projection which spans the whole world
     * @param {boolean} global Whether the projection is global.
     * @api
     */
    Projection.prototype.setGlobal = function (global) {
        this.global_ = global;
        this.canWrapX_ = !!(global && this.extent_);
    };
    /**
     * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
     */
    Projection.prototype.getDefaultTileGrid = function () {
        return this.defaultTileGrid_;
    };
    /**
     * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
     */
    Projection.prototype.setDefaultTileGrid = function (tileGrid) {
        this.defaultTileGrid_ = tileGrid;
    };
    /**
     * Set the validity extent for this projection.
     * @param {import("../extent.js").Extent} extent Extent.
     * @api
     */
    Projection.prototype.setExtent = function (extent) {
        this.extent_ = extent;
        this.canWrapX_ = !!(this.global_ && extent);
    };
    /**
     * Set the world extent for this projection.
     * @param {import("../extent.js").Extent} worldExtent World extent
     *     [minlon, minlat, maxlon, maxlat].
     * @api
     */
    Projection.prototype.setWorldExtent = function (worldExtent) {
        this.worldExtent_ = worldExtent;
    };
    /**
     * Set the getPointResolution function (see {@link module:ol/proj~getPointResolution}
     * for this projection.
     * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
     * @api
     */
    Projection.prototype.setGetPointResolution = function (func) {
        this.getPointResolutionFunc_ = func;
    };
    /**
     * Get the custom point resolution function for this projection (if set).
     * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
     * resolution function (if set).
     */
    Projection.prototype.getPointResolutionFunc = function () {
        return this.getPointResolutionFunc_;
    };
    return Projection;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Projection);
//# sourceMappingURL=Projection.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/Units.js":
/*!*******************************************!*\
  !*** ../../node_modules/ol/proj/Units.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "METERS_PER_UNIT": () => (/* binding */ METERS_PER_UNIT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ol/proj/Units
 */
/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 * @enum {string}
 */
var Units = {
    /**
     * Degrees
     * @api
     */
    DEGREES: 'degrees',
    /**
     * Feet
     * @api
     */
    FEET: 'ft',
    /**
     * Meters
     * @api
     */
    METERS: 'm',
    /**
     * Pixels
     * @api
     */
    PIXELS: 'pixels',
    /**
     * Tile Pixels
     * @api
     */
    TILE_PIXELS: 'tile-pixels',
    /**
     * US Feet
     * @api
     */
    USFEET: 'us-ft',
};
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */
var METERS_PER_UNIT = {};
// use the radius of the Normal sphere
METERS_PER_UNIT[Units.DEGREES] = (2 * Math.PI * 6370997) / 360;
METERS_PER_UNIT[Units.FEET] = 0.3048;
METERS_PER_UNIT[Units.METERS] = 1;
METERS_PER_UNIT[Units.USFEET] = 1200 / 3937;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Units);
//# sourceMappingURL=Units.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/epsg3857.js":
/*!**********************************************!*\
  !*** ../../node_modules/ol/proj/epsg3857.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RADIUS": () => (/* binding */ RADIUS),
/* harmony export */   "HALF_SIZE": () => (/* binding */ HALF_SIZE),
/* harmony export */   "EXTENT": () => (/* binding */ EXTENT),
/* harmony export */   "WORLD_EXTENT": () => (/* binding */ WORLD_EXTENT),
/* harmony export */   "MAX_SAFE_Y": () => (/* binding */ MAX_SAFE_Y),
/* harmony export */   "PROJECTIONS": () => (/* binding */ PROJECTIONS),
/* harmony export */   "fromEPSG4326": () => (/* binding */ fromEPSG4326),
/* harmony export */   "toEPSG4326": () => (/* binding */ toEPSG4326)
/* harmony export */ });
/* harmony import */ var _Projection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Projection.js */ "../../node_modules/ol/proj/Projection.js");
/* harmony import */ var _Units_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Units.js */ "../../node_modules/ol/proj/Units.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "../../node_modules/ol/math.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/proj/epsg3857
 */



/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * @const
 * @type {number}
 */
var HALF_SIZE = Math.PI * RADIUS;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
var WORLD_EXTENT = [-180, -85, 180, 85];
/**
 * Maximum safe value in y direction
 * @const
 * @type {number}
 */
var MAX_SAFE_Y = RADIUS * Math.log(Math.tan(Math.PI / 2));
/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */
var EPSG3857Projection = /** @class */ (function (_super) {
    __extends(EPSG3857Projection, _super);
    /**
     * @param {string} code Code.
     */
    function EPSG3857Projection(code) {
        return _super.call(this, {
            code: code,
            units: _Units_js__WEBPACK_IMPORTED_MODULE_0__.default.METERS,
            extent: EXTENT,
            global: true,
            worldExtent: WORLD_EXTENT,
            getPointResolution: function (resolution, point) {
                return resolution / (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cosh)(point[1] / RADIUS);
            },
        }) || this;
    }
    return EPSG3857Projection;
}(_Projection_js__WEBPACK_IMPORTED_MODULE_2__.default));
/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
var PROJECTIONS = [
    new EPSG3857Projection('EPSG:3857'),
    new EPSG3857Projection('EPSG:102100'),
    new EPSG3857Projection('EPSG:102113'),
    new EPSG3857Projection('EPSG:900913'),
    new EPSG3857Projection('http://www.opengis.net/gml/srs/epsg.xml#3857'),
];
/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
function fromEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    for (var i = 0; i < length; i += dimension) {
        output[i] = (HALF_SIZE * input[i]) / 180;
        var y = RADIUS * Math.log(Math.tan((Math.PI * (+input[i + 1] + 90)) / 360));
        if (y > MAX_SAFE_Y) {
            y = MAX_SAFE_Y;
        }
        else if (y < -MAX_SAFE_Y) {
            y = -MAX_SAFE_Y;
        }
        output[i + 1] = y;
    }
    return output;
}
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
function toEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    for (var i = 0; i < length; i += dimension) {
        output[i] = (180 * input[i]) / HALF_SIZE;
        output[i + 1] =
            (360 * Math.atan(Math.exp(input[i + 1] / RADIUS))) / Math.PI - 90;
    }
    return output;
}
//# sourceMappingURL=epsg3857.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/epsg4326.js":
/*!**********************************************!*\
  !*** ../../node_modules/ol/proj/epsg4326.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RADIUS": () => (/* binding */ RADIUS),
/* harmony export */   "EXTENT": () => (/* binding */ EXTENT),
/* harmony export */   "METERS_PER_UNIT": () => (/* binding */ METERS_PER_UNIT),
/* harmony export */   "PROJECTIONS": () => (/* binding */ PROJECTIONS)
/* harmony export */ });
/* harmony import */ var _Projection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Projection.js */ "../../node_modules/ol/proj/Projection.js");
/* harmony import */ var _Units_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Units.js */ "../../node_modules/ol/proj/Units.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/proj/epsg4326
 */


/**
 * Semi-major radius of the WGS84 ellipsoid.
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {import("../extent.js").Extent}
 */
var EXTENT = [-180, -90, 180, 90];
/**
 * @const
 * @type {number}
 */
var METERS_PER_UNIT = (Math.PI * RADIUS) / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */
var EPSG4326Projection = /** @class */ (function (_super) {
    __extends(EPSG4326Projection, _super);
    /**
     * @param {string} code Code.
     * @param {string=} opt_axisOrientation Axis orientation.
     */
    function EPSG4326Projection(code, opt_axisOrientation) {
        return _super.call(this, {
            code: code,
            units: _Units_js__WEBPACK_IMPORTED_MODULE_0__.default.DEGREES,
            extent: EXTENT,
            axisOrientation: opt_axisOrientation,
            global: true,
            metersPerUnit: METERS_PER_UNIT,
            worldExtent: EXTENT,
        }) || this;
    }
    return EPSG4326Projection;
}(_Projection_js__WEBPACK_IMPORTED_MODULE_1__.default));
/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
var PROJECTIONS = [
    new EPSG4326Projection('CRS:84'),
    new EPSG4326Projection('EPSG:4326', 'neu'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:1.3:CRS84'),
    new EPSG4326Projection('urn:ogc:def:crs:OGC:2:84'),
    new EPSG4326Projection('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'),
];
//# sourceMappingURL=epsg4326.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/projections.js":
/*!*************************************************!*\
  !*** ../../node_modules/ol/proj/projections.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "add": () => (/* binding */ add)
/* harmony export */ });
/**
 * @module ol/proj/projections
 */
/**
 * @type {Object<string, import("./Projection.js").default>}
 */
var cache = {};
/**
 * Clear the projections cache.
 */
function clear() {
    cache = {};
}
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */
function get(code) {
    return (cache[code] ||
        cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, 'EPSG:$3')] ||
        null);
}
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */
function add(code, projection) {
    cache[code] = projection;
}
//# sourceMappingURL=projections.js.map

/***/ }),

/***/ "../../node_modules/ol/proj/transforms.js":
/*!************************************************!*\
  !*** ../../node_modules/ol/proj/transforms.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "get": () => (/* binding */ get)
/* harmony export */ });
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj.js */ "../../node_modules/ol/obj.js");
/**
 * @module ol/proj/transforms
 */

/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */
var transforms = {};
/**
 * Clear the transform cache.
 */
function clear() {
    transforms = {};
}
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */
function add(source, destination, transformFn) {
    var sourceCode = source.getCode();
    var destinationCode = destination.getCode();
    if (!(sourceCode in transforms)) {
        transforms[sourceCode] = {};
    }
    transforms[sourceCode][destinationCode] = transformFn;
}
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */
function remove(source, destination) {
    var sourceCode = source.getCode();
    var destinationCode = destination.getCode();
    var transform = transforms[sourceCode][destinationCode];
    delete transforms[sourceCode][destinationCode];
    if ((0,_obj_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(transforms[sourceCode])) {
        delete transforms[sourceCode];
    }
    return transform;
}
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */
function get(sourceCode, destinationCode) {
    var transform;
    if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
        transform = transforms[sourceCode][destinationCode];
    }
    return transform;
}
//# sourceMappingURL=transforms.js.map

/***/ }),

/***/ "../../node_modules/ol/size.js":
/*!*************************************!*\
  !*** ../../node_modules/ol/size.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buffer": () => (/* binding */ buffer),
/* harmony export */   "hasArea": () => (/* binding */ hasArea),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "toSize": () => (/* binding */ toSize)
/* harmony export */ });
/**
 * @module ol/size
 */
/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */
/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The buffered size.
 */
function buffer(size, num, opt_size) {
    if (opt_size === undefined) {
        opt_size = [0, 0];
    }
    opt_size[0] = size[0] + 2 * num;
    opt_size[1] = size[1] + 2 * num;
    return opt_size;
}
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */
function hasArea(size) {
    return size[0] > 0 && size[1] > 0;
}
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The scaled size.
 */
function scale(size, ratio, opt_size) {
    if (opt_size === undefined) {
        opt_size = [0, 0];
    }
    opt_size[0] = (size[0] * ratio + 0.5) | 0;
    opt_size[1] = (size[1] * ratio + 0.5) | 0;
    return opt_size;
}
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} Size.
 * @api
 */
function toSize(size, opt_size) {
    if (Array.isArray(size)) {
        return size;
    }
    else {
        if (opt_size === undefined) {
            opt_size = [size, size];
        }
        else {
            opt_size[0] = size;
            opt_size[1] = size;
        }
        return opt_size;
    }
}
//# sourceMappingURL=size.js.map

/***/ }),

/***/ "../../node_modules/ol/sphere.js":
/*!***************************************!*\
  !*** ../../node_modules/ol/sphere.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_RADIUS": () => (/* binding */ DEFAULT_RADIUS),
/* harmony export */   "getDistance": () => (/* binding */ getDistance),
/* harmony export */   "getLength": () => (/* binding */ getLength),
/* harmony export */   "getArea": () => (/* binding */ getArea),
/* harmony export */   "offset": () => (/* binding */ offset)
/* harmony export */ });
/* harmony import */ var _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geom/GeometryType.js */ "../../node_modules/ol/geom/GeometryType.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "../../node_modules/ol/math.js");
/**
 * @module ol/sphere
 */


/**
 * Object literal with options for the {@link getLength} or {@link getArea}
 * functions.
 * @typedef {Object} SphereMetricOptions
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857']
 * Projection of the  geometry.  By default, the geometry is assumed to be in
 * Web Mercator.
 * @property {number} [radius=6371008.8] Sphere radius.  By default, the
 * [mean Earth radius](https://en.wikipedia.org/wiki/Earth_radius#Mean_radius)
 * for the WGS84 ellipsoid is used.
 */
/**
 * The mean Earth radius (1/3 * (2a + b)) for the WGS84 ellipsoid.
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
 * @type {number}
 */
var DEFAULT_RADIUS = 6371008.8;
/**
 * Get the great circle distance (in meters) between two geographic coordinates.
 * @param {Array} c1 Starting coordinate.
 * @param {Array} c2 Ending coordinate.
 * @param {number=} opt_radius The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {number} The great circle distance between the points (in meters).
 * @api
 */
function getDistance(c1, c2, opt_radius) {
    var radius = opt_radius || DEFAULT_RADIUS;
    var lat1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(c1[1]);
    var lat2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(c2[1]);
    var deltaLatBy2 = (lat2 - lat1) / 2;
    var deltaLonBy2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(c2[0] - c1[0]) / 2;
    var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
        Math.sin(deltaLonBy2) *
            Math.sin(deltaLonBy2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */
function getLengthInternal(coordinates, radius) {
    var length = 0;
    for (var i = 0, ii = coordinates.length; i < ii - 1; ++i) {
        length += getDistance(coordinates[i], coordinates[i + 1], radius);
    }
    return length;
}
/**
 * Get the spherical length of a geometry.  This length is the sum of the
 * great circle distances between coordinates.  For polygons, the length is
 * the sum of all rings.  For points, the length is zero.  For multi-part
 * geometries, the length is the sum of the length of each part.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions=} opt_options Options for the
 * length calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 * You can change this by providing a `projection` option.
 * @return {number} The spherical length (in meters).
 * @api
 */
function getLength(geometry, opt_options) {
    var options = opt_options || {};
    var radius = options.radius || DEFAULT_RADIUS;
    var projection = options.projection || 'EPSG:3857';
    var type = geometry.getType();
    if (type !== _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.GEOMETRY_COLLECTION) {
        geometry = geometry.clone().transform(projection, 'EPSG:4326');
    }
    var length = 0;
    var coordinates, coords, i, ii, j, jj;
    switch (type) {
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.POINT:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_POINT: {
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.LINE_STRING:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.LINEAR_RING: {
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ (geometry).getCoordinates();
            length = getLengthInternal(coordinates, radius);
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_LINE_STRING:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.POLYGON: {
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ (geometry).getCoordinates();
            for (i = 0, ii = coordinates.length; i < ii; ++i) {
                length += getLengthInternal(coordinates[i], radius);
            }
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_POLYGON: {
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ (geometry).getCoordinates();
            for (i = 0, ii = coordinates.length; i < ii; ++i) {
                coords = coordinates[i];
                for (j = 0, jj = coords.length; j < jj; ++j) {
                    length += getLengthInternal(coords[j], radius);
                }
            }
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.GEOMETRY_COLLECTION: {
            var geometries = /** @type {import("./geom/GeometryCollection.js").default} */ (geometry).getGeometries();
            for (i = 0, ii = geometries.length; i < ii; ++i) {
                length += getLength(geometries[i], opt_options);
            }
            break;
        }
        default: {
            throw new Error('Unsupported geometry type: ' + type);
        }
    }
    return length;
}
/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs-new.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */
function getAreaInternal(coordinates, radius) {
    var area = 0;
    var len = coordinates.length;
    var x1 = coordinates[len - 1][0];
    var y1 = coordinates[len - 1][1];
    for (var i = 0; i < len; i++) {
        var x2 = coordinates[i][0];
        var y2 = coordinates[i][1];
        area +=
            (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(x2 - x1) *
                (2 + Math.sin((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(y1)) + Math.sin((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(y2)));
        x1 = x2;
        y1 = y2;
    }
    return (area * radius * radius) / 2.0;
}
/**
 * Get the spherical area of a geometry.  This is the area (in meters) assuming
 * that polygon edges are segments of great circles on a sphere.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions=} opt_options Options for the area
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical area (in square meters).
 * @api
 */
function getArea(geometry, opt_options) {
    var options = opt_options || {};
    var radius = options.radius || DEFAULT_RADIUS;
    var projection = options.projection || 'EPSG:3857';
    var type = geometry.getType();
    if (type !== _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.GEOMETRY_COLLECTION) {
        geometry = geometry.clone().transform(projection, 'EPSG:4326');
    }
    var area = 0;
    var coordinates, coords, i, ii, j, jj;
    switch (type) {
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.POINT:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_POINT:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.LINE_STRING:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_LINE_STRING:
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.LINEAR_RING: {
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.POLYGON: {
            coordinates = /** @type {import("./geom/Polygon.js").default} */ (geometry).getCoordinates();
            area = Math.abs(getAreaInternal(coordinates[0], radius));
            for (i = 1, ii = coordinates.length; i < ii; ++i) {
                area -= Math.abs(getAreaInternal(coordinates[i], radius));
            }
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_POLYGON: {
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ (geometry).getCoordinates();
            for (i = 0, ii = coordinates.length; i < ii; ++i) {
                coords = coordinates[i];
                area += Math.abs(getAreaInternal(coords[0], radius));
                for (j = 1, jj = coords.length; j < jj; ++j) {
                    area -= Math.abs(getAreaInternal(coords[j], radius));
                }
            }
            break;
        }
        case _geom_GeometryType_js__WEBPACK_IMPORTED_MODULE_1__.default.GEOMETRY_COLLECTION: {
            var geometries = /** @type {import("./geom/GeometryCollection.js").default} */ (geometry).getGeometries();
            for (i = 0, ii = geometries.length; i < ii; ++i) {
                area += getArea(geometries[i], opt_options);
            }
            break;
        }
        default: {
            throw new Error('Unsupported geometry type: ' + type);
        }
    }
    return area;
}
/**
 * Returns the coordinate at the given distance and bearing from `c1`.
 *
 * @param {import("./coordinate.js").Coordinate} c1 The origin point (`[lon, lat]` in degrees).
 * @param {number} distance The great-circle distance between the origin
 *     point and the target point.
 * @param {number} bearing The bearing (in radians).
 * @param {number=} opt_radius The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {import("./coordinate.js").Coordinate} The target point.
 */
function offset(c1, distance, bearing, opt_radius) {
    var radius = opt_radius || DEFAULT_RADIUS;
    var lat1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(c1[1]);
    var lon1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toRadians)(c1[0]);
    var dByR = distance / radius;
    var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) +
        Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
    var lon = lon1 +
        Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
    return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toDegrees)(lon), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.toDegrees)(lat)];
}
//# sourceMappingURL=sphere.js.map

/***/ }),

/***/ "../../node_modules/ol/string.js":
/*!***************************************!*\
  !*** ../../node_modules/ol/string.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "padNumber": () => (/* binding */ padNumber),
/* harmony export */   "compareVersions": () => (/* binding */ compareVersions)
/* harmony export */ });
/**
 * @module ol/string
 */
/**
 * @param {number} number Number to be formatted
 * @param {number} width The desired width
 * @param {number=} opt_precision Precision of the output string (i.e. number of decimal places)
 * @returns {string} Formatted string
 */
function padNumber(number, width, opt_precision) {
    var numberString = opt_precision !== undefined ? number.toFixed(opt_precision) : '' + number;
    var decimal = numberString.indexOf('.');
    decimal = decimal === -1 ? numberString.length : decimal;
    return decimal > width
        ? numberString
        : new Array(1 + width - decimal).join('0') + numberString;
}
/**
 * Adapted from https://github.com/omichelsen/compare-versions/blob/master/index.js
 * @param {string|number} v1 First version
 * @param {string|number} v2 Second version
 * @returns {number} Value
 */
function compareVersions(v1, v2) {
    var s1 = ('' + v1).split('.');
    var s2 = ('' + v2).split('.');
    for (var i = 0; i < Math.max(s1.length, s2.length); i++) {
        var n1 = parseInt(s1[i] || '0', 10);
        var n2 = parseInt(s2[i] || '0', 10);
        if (n1 > n2) {
            return 1;
        }
        if (n2 > n1) {
            return -1;
        }
    }
    return 0;
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "../../node_modules/ol/tilecoord.js":
/*!******************************************!*\
  !*** ../../node_modules/ol/tilecoord.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOrUpdate": () => (/* binding */ createOrUpdate),
/* harmony export */   "getKeyZXY": () => (/* binding */ getKeyZXY),
/* harmony export */   "getKey": () => (/* binding */ getKey),
/* harmony export */   "fromKey": () => (/* binding */ fromKey),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "withinExtentAndZ": () => (/* binding */ withinExtentAndZ)
/* harmony export */ });
/**
 * @module ol/tilecoord
 */
/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 * @typedef {Array<number>} TileCoord
 * @api
 */
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord=} opt_tileCoord Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
function createOrUpdate(z, x, y, opt_tileCoord) {
    if (opt_tileCoord !== undefined) {
        opt_tileCoord[0] = z;
        opt_tileCoord[1] = x;
        opt_tileCoord[2] = y;
        return opt_tileCoord;
    }
    else {
        return [z, x, y];
    }
}
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */
function getKeyZXY(z, x, y) {
    return z + '/' + x + '/' + y;
}
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */
function getKey(tileCoord) {
    return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */
function fromKey(key) {
    return key.split('/').map(Number);
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */
function hash(tileCoord) {
    return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */
function withinExtentAndZ(tileCoord, tileGrid) {
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];
    if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
        return false;
    }
    var tileRange = tileGrid.getFullTileRange(z);
    if (!tileRange) {
        return true;
    }
    else {
        return tileRange.containsXY(x, y);
    }
}
//# sourceMappingURL=tilecoord.js.map

/***/ }),

/***/ "../../node_modules/ol/tilegrid.js":
/*!*****************************************!*\
  !*** ../../node_modules/ol/tilegrid.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getForProjection": () => (/* binding */ getForProjection),
/* harmony export */   "wrapX": () => (/* binding */ wrapX),
/* harmony export */   "createForExtent": () => (/* binding */ createForExtent),
/* harmony export */   "createXYZ": () => (/* binding */ createXYZ),
/* harmony export */   "createForProjection": () => (/* binding */ createForProjection),
/* harmony export */   "extentFromProjection": () => (/* binding */ extentFromProjection)
/* harmony export */ });
/* harmony import */ var _extent_Corner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extent/Corner.js */ "../../node_modules/ol/extent/Corner.js");
/* harmony import */ var _tilegrid_TileGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tilegrid/TileGrid.js */ "../../node_modules/ol/tilegrid/TileGrid.js");
/* harmony import */ var _proj_Units_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./proj/Units.js */ "../../node_modules/ol/proj/Units.js");
/* harmony import */ var _tilegrid_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tilegrid/common.js */ "../../node_modules/ol/tilegrid/common.js");
/* harmony import */ var _proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proj.js */ "../../node_modules/ol/proj.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extent.js */ "../../node_modules/ol/extent.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./size.js */ "../../node_modules/ol/size.js");
/**
 * @module ol/tilegrid
 */







/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */
function getForProjection(projection) {
    var tileGrid = projection.getDefaultTileGrid();
    if (!tileGrid) {
        tileGrid = createForProjection(projection);
        projection.setDefaultTileGrid(tileGrid);
    }
    return tileGrid;
}
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */
function wrapX(tileGrid, tileCoord, projection) {
    var z = tileCoord[0];
    var center = tileGrid.getTileCoordCenter(tileCoord);
    var projectionExtent = extentFromProjection(projection);
    if (!(0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.containsCoordinate)(projectionExtent, center)) {
        var worldWidth = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.getWidth)(projectionExtent);
        var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
        center[0] += worldWidth * worldsAway;
        return tileGrid.getTileCoordForCoordAndZ(center, z);
    }
    else {
        return tileCoord;
    }
}
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default=} opt_corner Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
    var corner = opt_corner !== undefined ? opt_corner : _extent_Corner_js__WEBPACK_IMPORTED_MODULE_2__.default.TOP_LEFT;
    var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
    return new _tilegrid_TileGrid_js__WEBPACK_IMPORTED_MODULE_3__.default({
        extent: extent,
        origin: (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.getCorner)(extent, corner),
        resolutions: resolutions,
        tileSize: opt_tileSize,
    });
}
/**
 * @typedef {Object} XYZOptions
 * @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
 * top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
 * at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
 * @property {number} [maxResolution] Resolution at level zero.
 * @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
 * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
 */
/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 * @param {XYZOptions=} opt_options Tile grid options.
 * @return {!TileGrid} Tile grid instance.
 * @api
 */
function createXYZ(opt_options) {
    var xyzOptions = opt_options || {};
    var extent = xyzOptions.extent || (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__.get)('EPSG:3857').getExtent();
    var gridOptions = {
        extent: extent,
        minZoom: xyzOptions.minZoom,
        tileSize: xyzOptions.tileSize,
        resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution),
    };
    return new _tilegrid_TileGrid_js__WEBPACK_IMPORTED_MODULE_3__.default(gridOptions);
}
/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {number=} opt_maxResolution Resolution at level zero.
 * @return {!Array<number>} Resolutions array.
 */
function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
    var maxZoom = opt_maxZoom !== undefined ? opt_maxZoom : _tilegrid_common_js__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_MAX_ZOOM;
    var height = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.getHeight)(extent);
    var width = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.getWidth)(extent);
    var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(opt_tileSize !== undefined ? opt_tileSize : _tilegrid_common_js__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_TILE_SIZE);
    var maxResolution = opt_maxResolution > 0
        ? opt_maxResolution
        : Math.max(width / tileSize[0], height / tileSize[1]);
    var length = maxZoom + 1;
    var resolutions = new Array(length);
    for (var z = 0; z < length; ++z) {
        resolutions[z] = maxResolution / Math.pow(2, z);
    }
    return resolutions;
}
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default=} opt_corner Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
    var extent = extentFromProjection(projection);
    return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */
function extentFromProjection(projection) {
    projection = (0,_proj_js__WEBPACK_IMPORTED_MODULE_0__.get)(projection);
    var extent = projection.getExtent();
    if (!extent) {
        var half = (180 * _proj_js__WEBPACK_IMPORTED_MODULE_0__.METERS_PER_UNIT[_proj_Units_js__WEBPACK_IMPORTED_MODULE_6__.default.DEGREES]) / projection.getMetersPerUnit();
        extent = (0,_extent_js__WEBPACK_IMPORTED_MODULE_1__.createOrUpdate)(-half, -half, half, half);
    }
    return extent;
}
//# sourceMappingURL=tilegrid.js.map

/***/ }),

/***/ "../../node_modules/ol/tilegrid/TileGrid.js":
/*!**************************************************!*\
  !*** ../../node_modules/ol/tilegrid/TileGrid.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TileRange_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TileRange.js */ "../../node_modules/ol/TileRange.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common.js */ "../../node_modules/ol/tilegrid/common.js");
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../asserts.js */ "../../node_modules/ol/asserts.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../math.js */ "../../node_modules/ol/math.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extent.js */ "../../node_modules/ol/extent.js");
/* harmony import */ var _tilecoord_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tilecoord.js */ "../../node_modules/ol/tilecoord.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../array.js */ "../../node_modules/ol/array.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../size.js */ "../../node_modules/ol/size.js");
/**
 * @module ol/tilegrid/TileGrid
 */








/**
 * @private
 * @type {import("../tilecoord.js").TileCoord}
 */
var tmpTileCoord = [0, 0, 0];
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */
/**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */
var TileGrid = /** @class */ (function () {
    /**
     * @param {Options} options Tile grid options.
     */
    function TileGrid(options) {
        /**
         * @protected
         * @type {number}
         */
        this.minZoom = options.minZoom !== undefined ? options.minZoom : 0;
        /**
         * @private
         * @type {!Array<number>}
         */
        this.resolutions_ = options.resolutions;
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.assert)((0,_array_js__WEBPACK_IMPORTED_MODULE_1__.isSorted)(this.resolutions_, function (a, b) {
            return b - a;
        }, true), 17); // `resolutions` must be sorted in descending order
        // check if we've got a consistent zoom factor and origin
        var zoomFactor;
        if (!options.origins) {
            for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
                if (!zoomFactor) {
                    zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
                }
                else {
                    if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
                        zoomFactor = undefined;
                        break;
                    }
                }
            }
        }
        /**
         * @private
         * @type {number|undefined}
         */
        this.zoomFactor_ = zoomFactor;
        /**
         * @protected
         * @type {number}
         */
        this.maxZoom = this.resolutions_.length - 1;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        this.origin_ = options.origin !== undefined ? options.origin : null;
        /**
         * @private
         * @type {Array<import("../coordinate.js").Coordinate>}
         */
        this.origins_ = null;
        if (options.origins !== undefined) {
            this.origins_ = options.origins;
            (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.assert)(this.origins_.length == this.resolutions_.length, 20); // Number of `origins` and `resolutions` must be equal
        }
        var extent = options.extent;
        if (extent !== undefined && !this.origin_ && !this.origins_) {
            this.origin_ = (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__.getTopLeft)(extent);
        }
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.assert)((!this.origin_ && this.origins_) || (this.origin_ && !this.origins_), 18); // Either `origin` or `origins` must be configured, never both
        /**
         * @private
         * @type {Array<number|import("../size.js").Size>}
         */
        this.tileSizes_ = null;
        if (options.tileSizes !== undefined) {
            this.tileSizes_ = options.tileSizes;
            (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.assert)(this.tileSizes_.length == this.resolutions_.length, 19); // Number of `tileSizes` and `resolutions` must be equal
        }
        /**
         * @private
         * @type {number|import("../size.js").Size}
         */
        this.tileSize_ =
            options.tileSize !== undefined
                ? options.tileSize
                : !this.tileSizes_
                    ? _common_js__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_TILE_SIZE
                    : null;
        (0,_asserts_js__WEBPACK_IMPORTED_MODULE_0__.assert)((!this.tileSize_ && this.tileSizes_) ||
            (this.tileSize_ && !this.tileSizes_), 22); // Either `tileSize` or `tileSizes` must be configured, never both
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        this.extent_ = extent !== undefined ? extent : null;
        /**
         * @private
         * @type {Array<import("../TileRange.js").default>}
         */
        this.fullTileRanges_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        this.tmpSize_ = [0, 0];
        if (options.sizes !== undefined) {
            this.fullTileRanges_ = options.sizes.map(function (size, z) {
                var tileRange = new _TileRange_js__WEBPACK_IMPORTED_MODULE_4__.default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
                if (extent) {
                    var restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
                    tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
                    tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
                    tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
                    tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
                }
                return tileRange;
            }, this);
        }
        else if (extent) {
            this.calculateTileRanges_(extent);
        }
    }
    /**
     * Call a function with each tile coordinate for a given extent and zoom level.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} zoom Integer zoom level.
     * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
     * @api
     */
    TileGrid.prototype.forEachTileCoord = function (extent, zoom, callback) {
        var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
        for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
            for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
                callback([zoom, i, j]);
            }
        }
    };
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
     * @param {import("../TileRange.js").default=} opt_tileRange Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
     * @return {boolean} Callback succeeded.
     */
    TileGrid.prototype.forEachTileCoordParentTileRange = function (tileCoord, callback, opt_tileRange, opt_extent) {
        var tileRange, x, y;
        var tileCoordExtent = null;
        var z = tileCoord[0] - 1;
        if (this.zoomFactor_ === 2) {
            x = tileCoord[1];
            y = tileCoord[2];
        }
        else {
            tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
        }
        while (z >= this.minZoom) {
            if (this.zoomFactor_ === 2) {
                x = Math.floor(x / 2);
                y = Math.floor(y / 2);
                tileRange = (0,_TileRange_js__WEBPACK_IMPORTED_MODULE_4__.createOrUpdate)(x, x, y, y, opt_tileRange);
            }
            else {
                tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
            }
            if (callback(z, tileRange)) {
                return true;
            }
            --z;
        }
        return false;
    };
    /**
     * Get the extent for this tile grid, if it was configured.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    TileGrid.prototype.getExtent = function () {
        return this.extent_;
    };
    /**
     * Get the maximum zoom level for the grid.
     * @return {number} Max zoom.
     * @api
     */
    TileGrid.prototype.getMaxZoom = function () {
        return this.maxZoom;
    };
    /**
     * Get the minimum zoom level for the grid.
     * @return {number} Min zoom.
     * @api
     */
    TileGrid.prototype.getMinZoom = function () {
        return this.minZoom;
    };
    /**
     * Get the origin for the grid at the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {import("../coordinate.js").Coordinate} Origin.
     * @api
     */
    TileGrid.prototype.getOrigin = function (z) {
        if (this.origin_) {
            return this.origin_;
        }
        else {
            return this.origins_[z];
        }
    };
    /**
     * Get the resolution for the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {number} Resolution.
     * @api
     */
    TileGrid.prototype.getResolution = function (z) {
        return this.resolutions_[z];
    };
    /**
     * Get the list of resolutions for the tile grid.
     * @return {Array<number>} Resolutions.
     * @api
     */
    TileGrid.prototype.getResolutions = function () {
        return this.resolutions_;
    };
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileRange.js").default=} opt_tileRange Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    TileGrid.prototype.getTileCoordChildTileRange = function (tileCoord, opt_tileRange, opt_extent) {
        if (tileCoord[0] < this.maxZoom) {
            if (this.zoomFactor_ === 2) {
                var minX = tileCoord[1] * 2;
                var minY = tileCoord[2] * 2;
                return (0,_TileRange_js__WEBPACK_IMPORTED_MODULE_4__.createOrUpdate)(minX, minX + 1, minY, minY + 1, opt_tileRange);
            }
            var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
            return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
        }
        return null;
    };
    /**
     * Get the extent for a tile range.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} tileRange Tile range.
     * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
     * @return {import("../extent.js").Extent} Extent.
     */
    TileGrid.prototype.getTileRangeExtent = function (z, tileRange, opt_extent) {
        var origin = this.getOrigin(z);
        var resolution = this.getResolution(z);
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(this.getTileSize(z), this.tmpSize_);
        var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
        var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
        var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
        var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
        return (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
    };
    /**
     * Get a tile range for the given extent and integer zoom level.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default=} opt_tileRange Temporary tile range object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    TileGrid.prototype.getTileRangeForExtentAndZ = function (extent, z, opt_tileRange) {
        var tileCoord = tmpTileCoord;
        this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tileCoord);
        var minX = tileCoord[1];
        var minY = tileCoord[2];
        this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tileCoord);
        return (0,_TileRange_js__WEBPACK_IMPORTED_MODULE_4__.createOrUpdate)(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
    };
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {import("../coordinate.js").Coordinate} Tile center.
     */
    TileGrid.prototype.getTileCoordCenter = function (tileCoord) {
        var origin = this.getOrigin(tileCoord[0]);
        var resolution = this.getResolution(tileCoord[0]);
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
        return [
            origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution,
            origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution,
        ];
    };
    /**
     * Get the extent of a tile coordinate.
     *
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../extent.js").Extent=} opt_extent Temporary extent object.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    TileGrid.prototype.getTileCoordExtent = function (tileCoord, opt_extent) {
        var origin = this.getOrigin(tileCoord[0]);
        var resolution = this.getResolution(tileCoord[0]);
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
        var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
        var minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
        var maxX = minX + tileSize[0] * resolution;
        var maxY = minY + tileSize[1] * resolution;
        return (0,_extent_js__WEBPACK_IMPORTED_MODULE_2__.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
    };
    /**
     * Get the tile coordinate for the given map coordinate and resolution.  This
     * method considers that coordinates that intersect tile boundaries should be
     * assigned the higher tile coordinate.
     *
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    TileGrid.prototype.getTileCoordForCoordAndResolution = function (coordinate, resolution, opt_tileCoord) {
        return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
    };
    /**
     * Note that this method should not be called for resolutions that correspond
     * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} resolution Resolution (for a non-integer zoom level).
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    TileGrid.prototype.getTileCoordForXYAndResolution_ = function (x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
        var z = this.getZForResolution(resolution);
        var scale = resolution / this.getResolution(z);
        var origin = this.getOrigin(z);
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(this.getTileSize(z), this.tmpSize_);
        var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
        var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
        var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
        var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
        var tileCoordX = (scale * xFromOrigin) / tileSize[0];
        var tileCoordY = (scale * yFromOrigin) / tileSize[1];
        if (reverseIntersectionPolicy) {
            tileCoordX = Math.ceil(tileCoordX) - 1;
            tileCoordY = Math.ceil(tileCoordY) - 1;
        }
        else {
            tileCoordX = Math.floor(tileCoordX);
            tileCoordY = Math.floor(tileCoordY);
        }
        return (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_6__.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    /**
     * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
     * they should have separate implementations.  This method is for integer zoom
     * levels.  The other method should only be called for resolutions corresponding
     * to non-integer zoom levels.
     * @param {number} x Map x coordinate.
     * @param {number} y Map y coordinate.
     * @param {number} z Integer zoom level.
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    TileGrid.prototype.getTileCoordForXYAndZ_ = function (x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
        var origin = this.getOrigin(z);
        var resolution = this.getResolution(z);
        var tileSize = (0,_size_js__WEBPACK_IMPORTED_MODULE_5__.toSize)(this.getTileSize(z), this.tmpSize_);
        var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
        var adjustY = reverseIntersectionPolicy ? 0.5 : 0;
        var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
        var yFromOrigin = Math.floor((origin[1] - y) / resolution + adjustY);
        var tileCoordX = xFromOrigin / tileSize[0];
        var tileCoordY = yFromOrigin / tileSize[1];
        if (reverseIntersectionPolicy) {
            tileCoordX = Math.ceil(tileCoordX) - 1;
            tileCoordY = Math.ceil(tileCoordY) - 1;
        }
        else {
            tileCoordX = Math.floor(tileCoordX);
            tileCoordY = Math.floor(tileCoordY);
        }
        return (0,_tilecoord_js__WEBPACK_IMPORTED_MODULE_6__.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
    };
    /**
     * Get a tile coordinate given a map coordinate and zoom level.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} z Zoom level.
     * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    TileGrid.prototype.getTileCoordForCoordAndZ = function (coordinate, z, opt_tileCoord) {
        return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
    };
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {number} Tile resolution.
     */
    TileGrid.prototype.getTileCoordResolution = function (tileCoord) {
        return this.resolutions_[tileCoord[0]];
    };
    /**
     * Get the tile size for a zoom level. The type of the return value matches the
     * `tileSize` or `tileSizes` that the tile grid was configured with. To always
     * get an `import("../size.js").Size`, run the result through `import("../size.js").Size.toSize()`.
     * @param {number} z Z.
     * @return {number|import("../size.js").Size} Tile size.
     * @api
     */
    TileGrid.prototype.getTileSize = function (z) {
        if (this.tileSize_) {
            return this.tileSize_;
        }
        else {
            return this.tileSizes_[z];
        }
    };
    /**
     * @param {number} z Zoom level.
     * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
     */
    TileGrid.prototype.getFullTileRange = function (z) {
        if (!this.fullTileRanges_) {
            return this.extent_
                ? this.getTileRangeForExtentAndZ(this.extent_, z)
                : null;
        }
        else {
            return this.fullTileRanges_[z];
        }
    };
    /**
     * @param {number} resolution Resolution.
     * @param {number=} opt_direction If 0, the nearest resolution will be used.
     *     If 1, the nearest lower resolution will be used. If -1, the nearest
     *     higher resolution will be used. Default is 0.
     * @return {number} Z.
     * @api
     */
    TileGrid.prototype.getZForResolution = function (resolution, opt_direction) {
        var z = (0,_array_js__WEBPACK_IMPORTED_MODULE_1__.linearFindNearest)(this.resolutions_, resolution, opt_direction || 0);
        return (0,_math_js__WEBPACK_IMPORTED_MODULE_7__.clamp)(z, this.minZoom, this.maxZoom);
    };
    /**
     * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
     * @private
     */
    TileGrid.prototype.calculateTileRanges_ = function (extent) {
        var length = this.resolutions_.length;
        var fullTileRanges = new Array(length);
        for (var z = this.minZoom; z < length; ++z) {
            fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
        }
        this.fullTileRanges_ = fullTileRanges;
    };
    return TileGrid;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TileGrid);
//# sourceMappingURL=TileGrid.js.map

/***/ }),

/***/ "../../node_modules/ol/tilegrid/common.js":
/*!************************************************!*\
  !*** ../../node_modules/ol/tilegrid/common.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_MAX_ZOOM": () => (/* binding */ DEFAULT_MAX_ZOOM),
/* harmony export */   "DEFAULT_TILE_SIZE": () => (/* binding */ DEFAULT_TILE_SIZE)
/* harmony export */ });
/**
 * @module ol/tilegrid/common
 */
/**
 * Default maximum zoom for default tile grids.
 * @type {number}
 */
var DEFAULT_MAX_ZOOM = 42;
/**
 * Default tile size.
 * @type {number}
 */
var DEFAULT_TILE_SIZE = 256;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "../../node_modules/ol/util.js":
/*!*************************************!*\
  !*** ../../node_modules/ol/util.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abstract": () => (/* binding */ abstract),
/* harmony export */   "getUid": () => (/* binding */ getUid),
/* harmony export */   "VERSION": () => (/* binding */ VERSION)
/* harmony export */ });
/**
 * @module ol/util
 */
/**
 * @return {?} Any return.
 */
function abstract() {
    return /** @type {?} */ ((function () {
        throw new Error('Unimplemented abstract method.');
    })());
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */
function getUid(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */
var VERSION = '6.5.0';
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../../node_modules/proj4/lib/Point.js":
/*!*********************************************!*\
  !*** ../../node_modules/proj4/lib/Point.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mgrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mgrs */ "../../node_modules/mgrs/mgrs.js");


function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0.0;
  } else if(typeof x === 'object') {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0.0;
  } else if (typeof x === 'string' && typeof y === 'undefined') {
    var coords = x.split(',');
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0.0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0.0;
  }
  console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
}

Point.fromMGRS = function(mgrsStr) {
  return new Point((0,mgrs__WEBPACK_IMPORTED_MODULE_0__.toPoint)(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return (0,mgrs__WEBPACK_IMPORTED_MODULE_0__.forward)([this.x, this.y], accuracy);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);


/***/ }),

/***/ "../../node_modules/proj4/lib/Proj.js":
/*!********************************************!*\
  !*** ../../node_modules/proj4/lib/Proj.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parseCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseCode */ "../../node_modules/proj4/lib/parseCode.js");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extend */ "../../node_modules/proj4/lib/extend.js");
/* harmony import */ var _projections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projections */ "../../node_modules/proj4/lib/projections.js");
/* harmony import */ var _deriveConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deriveConstants */ "../../node_modules/proj4/lib/deriveConstants.js");
/* harmony import */ var _constants_Datum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants/Datum */ "../../node_modules/proj4/lib/constants/Datum.js");
/* harmony import */ var _datum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datum */ "../../node_modules/proj4/lib/datum.js");
/* harmony import */ var _match__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./match */ "../../node_modules/proj4/lib/match.js");
/* harmony import */ var _nadgrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nadgrid */ "../../node_modules/proj4/lib/nadgrid.js");









function Projection(srsCode,callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function(error){
    if(error){
      throw error;
    }
  };
  var json = (0,_parseCode__WEBPACK_IMPORTED_MODULE_0__.default)(srsCode);
  if(typeof json !== 'object'){
    callback(srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if(!ourProj){
    callback(srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== 'none') {
    var datumDef = (0,_match__WEBPACK_IMPORTED_MODULE_6__.default)(_constants_Datum__WEBPACK_IMPORTED_MODULE_4__.default, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.k0 = json.k0 || 1.0;
  json.axis = json.axis || 'enu';
  json.ellps = json.ellps || 'wgs84';
  json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this

  var sphere_ = (0,_deriveConstants__WEBPACK_IMPORTED_MODULE_3__.sphere)(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = (0,_deriveConstants__WEBPACK_IMPORTED_MODULE_3__.eccentricity)(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = (0,_nadgrid__WEBPACK_IMPORTED_MODULE_7__.getNadgrids)(json.nadgrids);
  var datumObj = json.datum || (0,_datum__WEBPACK_IMPORTED_MODULE_5__.default)(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2,
    nadgrids);

  (0,_extend__WEBPACK_IMPORTED_MODULE_1__.default)(this, json); // transfer everything over from the projection because we don't know what we'll need
  (0,_extend__WEBPACK_IMPORTED_MODULE_1__.default)(this, ourProj); // transfer all the methods from the projection

  // copy the 4 things over we calulated in deriveConstants.sphere
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;

  // copy the 3 things we calculated in deriveConstants.eccentricity
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;

  // add in the datum object
  this.datum = datumObj;

  // init the projection
  this.init();

  // legecy callback from back in the day when it went to spatialreference.org
  callback(null, this);

}
Projection.projections = _projections__WEBPACK_IMPORTED_MODULE_2__.default;
Projection.projections.start();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Projection);


/***/ }),

/***/ "../../node_modules/proj4/lib/adjust_axis.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/adjust_axis.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(crs, denorm, point) {
  var xin = point.x,
    yin = point.y,
    zin = point.z || 0.0;
  var v, t, i;
  var out = {};
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === undefined) {
      continue;
    }
    if (i === 0) {
      v = xin;
      if ("ew".indexOf(crs.axis[i]) !== -1) {
        t = 'x';
      } else {
        t = 'y';
      }

    }
    else if (i === 1) {
      v = yin;
      if ("ns".indexOf(crs.axis[i]) !== -1) {
        t = 'y';
      } else {
        t = 'x';
      }
    }
    else {
      v = zin;
      t = 'z';
    }
    switch (crs.axis[i]) {
    case 'e':
      out[t] = v;
      break;
    case 'w':
      out[t] = -v;
      break;
    case 'n':
      out[t] = v;
      break;
    case 's':
      out[t] = -v;
      break;
    case 'u':
      if (point[t] !== undefined) {
        out.z = v;
      }
      break;
    case 'd':
      if (point[t] !== undefined) {
        out.z = -v;
      }
      break;
    default:
      //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
      return null;
    }
  }
  return out;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/checkSanity.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/checkSanity.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
function checkCoord(num) {
  if (typeof Number.isFinite === 'function') {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError('coordinates must be finite numbers');
  }
  if (typeof num !== 'number' || num !== num || !isFinite(num)) {
    throw new TypeError('coordinates must be finite numbers');
  }
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/adjust_lat.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/common/adjust_lat.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _sign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign */ "../../node_modules/proj4/lib/common/sign.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (Math.abs(x) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) ? x : (x - ((0,_sign__WEBPACK_IMPORTED_MODULE_1__.default)(x) * Math.PI));
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/adjust_lon.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/common/adjust_lon.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _sign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign */ "../../node_modules/proj4/lib/common/sign.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (Math.abs(x) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI) ? x : (x - ((0,_sign__WEBPACK_IMPORTED_MODULE_1__.default)(x) * _constants_values__WEBPACK_IMPORTED_MODULE_0__.TWO_PI));
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/adjust_zone.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/common/adjust_zone.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(zone, lon) {
  if (zone === undefined) {
    zone = Math.floor(((0,_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon) + Math.PI) * 30 / Math.PI) + 1;

    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/asinhy.js":
/*!*****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/asinhy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hypot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hypot */ "../../node_modules/proj4/lib/common/hypot.js");
/* harmony import */ var _log1py__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log1py */ "../../node_modules/proj4/lib/common/log1py.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var y = Math.abs(x);
  y = (0,_log1py__WEBPACK_IMPORTED_MODULE_1__.default)(y * (1 + y / ((0,_hypot__WEBPACK_IMPORTED_MODULE_0__.default)(1, y) + 1)));

  return x < 0 ? -y : y;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/asinz.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/asinz.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  if (Math.abs(x) > 1) {
    x = (x > 1) ? 1 : -1;
  }
  return Math.asin(x);
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/clens.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/clens.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;

  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }

  return Math.sin(arg_r) * hr;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/clens_cmplx.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/common/clens_cmplx.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sinh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sinh */ "../../node_modules/proj4/lib/common/sinh.js");
/* harmony import */ var _cosh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cosh */ "../../node_modules/proj4/lib/common/cosh.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = (0,_sinh__WEBPACK_IMPORTED_MODULE_0__.default)(arg_i);
  var cosh_arg_i = (0,_cosh__WEBPACK_IMPORTED_MODULE_1__.default)(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;

  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }

  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;

  return [r * hr - i * hi, r * hi + i * hr];
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/cosh.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/cosh.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/e0fn.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/e0fn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/e1fn.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/e1fn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/e2fn.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/e2fn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (0.05859375 * x * x * (1 + 0.75 * x));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/e3fn.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/e3fn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return (x * x * x * (35 / 3072));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/gN.js":
/*!*************************************************!*\
  !*** ../../node_modules/proj4/lib/common/gN.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/gatg.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/gatg.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(pp, B) {
  var cos_2B = 2 * Math.cos(2 * B);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h;

  while (--i >= 0) {
    h = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h;
  }

  return (B + h * Math.sin(2 * B));
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/hypot.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/hypot.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);

  return a * Math.sqrt(1 + Math.pow(b, 2));
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/imlfn.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/imlfn.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;

  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
  return NaN;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/iqsfnz.js":
/*!*****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/iqsfnz.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
    if (q < 0) {
      return (-1 * _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI);
    }
    else {
      return _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    }
  }
  //var phi = 0.5* q/(1-eccent*eccent);
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
  return NaN;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/log1py.js":
/*!*****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/log1py.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var y = 1 + x;
  var z = y - 1;

  return z === 0 ? x : x * Math.log(y) / z;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/mlfn.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/mlfn.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e0, e1, e2, e3, phi) {
  return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/msfnz.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/msfnz.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / (Math.sqrt(1 - con * con));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/phi2z.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/phi2z.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }
  //console.log("phi2z has NoConvergence");
  return -9999;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/pj_enfn.js":
/*!******************************************************!*\
  !*** ../../node_modules/proj4/lib/common/pj_enfn.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.01302083333333333333;
var C48 = 0.00712076822916666666;
var C66 = 0.36458333333333333333;
var C68 = 0.00569661458333333333;
var C88 = 0.3076171875;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/pj_inv_mlfn.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/common/pj_inv_mlfn.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pj_mlfn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pj_mlfn */ "../../node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");



var MAX_ITER = 20;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) { /* rarely goes over 2 iterations */
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
    //phi -= t * (t * Math.sqrt(t)) * k;
    t = ((0,_pj_mlfn__WEBPACK_IMPORTED_MODULE_0__.default)(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      return phi;
    }
  }
  //..reportError("cass:pj_inv_mlfn: Convergence error");
  return phi;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/common/pj_mlfn.js":
/*!******************************************************!*\
  !*** ../../node_modules/proj4/lib/common/pj_mlfn.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/qsfnz.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/qsfnz.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(eccent, sinphi) {
  var con;
  if (eccent > 1.0e-7) {
    con = eccent * sinphi;
    return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
  }
  else {
    return (2 * sinphi);
  }
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/sign.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/sign.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x<0 ? -1 : 1;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/sinh.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/sinh.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/srat.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/common/srat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(esinp, exp) {
  return (Math.pow((1 - esinp) / (1 + esinp), exp));
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/toPoint.js":
/*!******************************************************!*\
  !*** ../../node_modules/proj4/lib/common/toPoint.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array){
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length>2) {
    out.z = array[2];
  }
  if (array.length>3) {
    out.m = array[3];
  }
  return out;
}

/***/ }),

/***/ "../../node_modules/proj4/lib/common/tsfnz.js":
/*!****************************************************!*\
  !*** ../../node_modules/proj4/lib/common/tsfnz.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow(((1 - con) / (1 + con)), com);
  return (Math.tan(0.5 * (_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - phi)) / con);
}


/***/ }),

/***/ "../../node_modules/proj4/lib/constants/Datum.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/constants/Datum.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ exports)
/* harmony export */ });
var exports = {};

exports.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};

exports.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};

exports.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};

exports.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};

exports.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};

exports.potsdam = {
  towgs84: "606.0,23.0,413.0",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};

exports.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};

exports.hermannskogel = {
  towgs84: "653.0,-212.0,449.0",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};

exports.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};

exports.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};

exports.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};

exports.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};

exports.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};

exports.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: 'bessel',
  datumName: 'S-JTSK (Ferro)'
};

exports.beduaram = {
  towgs84: '-106,-87,188',
  ellipse: 'clrk80',
  datumName: 'Beduaram'
};

exports.gunung_segara = {
  towgs84: '-403,684,41',
  ellipse: 'bessel',
  datumName: 'Gunung Segara Jakarta'
};

exports.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};


/***/ }),

/***/ "../../node_modules/proj4/lib/constants/Ellipsoid.js":
/*!***********************************************************!*\
  !*** ../../node_modules/proj4/lib/constants/Ellipsoid.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ exports),
/* harmony export */   "WGS84": () => (/* binding */ WGS84)
/* harmony export */ });
var exports = {};

exports.MERIT = {
  a: 6378137.0,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};

exports.SGS85 = {
  a: 6378136.0,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};

exports.GRS80 = {
  a: 6378137.0,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};

exports.IAU76 = {
  a: 6378140.0,
  rf: 298.257,
  ellipseName: "IAU 1976"
};

exports.airy = {
  a: 6377563.396,
  b: 6356256.910,
  ellipseName: "Airy 1830"
};

exports.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};

exports.NWL9D = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};

exports.mod_airy = {
  a: 6377340.189,
  b: 6356034.446,
  ellipseName: "Modified Airy"
};

exports.andrae = {
  a: 6377104.43,
  rf: 300.0,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};

exports.aust_SA = {
  a: 6378160.0,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};

exports.GRS67 = {
  a: 6378160.0,
  rf: 298.2471674270,
  ellipseName: "GRS 67(IUGG 1967)"
};

exports.bessel = {
  a: 6377397.155,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};

exports.bess_nam = {
  a: 6377483.865,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};

exports.clrk66 = {
  a: 6378206.4,
  b: 6356583.8,
  ellipseName: "Clarke 1866"
};

exports.clrk80 = {
  a: 6378249.145,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};

exports.clrk58 = {
  a: 6378293.645208759,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};

exports.CPM = {
  a: 6375738.7,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};

exports.delmbr = {
  a: 6376428.0,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};

exports.engelis = {
  a: 6378136.05,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};

exports.evrst30 = {
  a: 6377276.345,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};

exports.evrst48 = {
  a: 6377304.063,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};

exports.evrst56 = {
  a: 6377301.243,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};

exports.evrst69 = {
  a: 6377295.664,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};

exports.evrstSS = {
  a: 6377298.556,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};

exports.fschr60 = {
  a: 6378166.0,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};

exports.fschr60m = {
  a: 6378155.0,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};

exports.fschr68 = {
  a: 6378150.0,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};

exports.helmert = {
  a: 6378200.0,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};

exports.hough = {
  a: 6378270.0,
  rf: 297.0,
  ellipseName: "Hough"
};

exports.intl = {
  a: 6378388.0,
  rf: 297.0,
  ellipseName: "International 1909 (Hayford)"
};

exports.kaula = {
  a: 6378163.0,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};

exports.lerch = {
  a: 6378139.0,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};

exports.mprts = {
  a: 6397300.0,
  rf: 191.0,
  ellipseName: "Maupertius 1738"
};

exports.new_intl = {
  a: 6378157.5,
  b: 6356772.2,
  ellipseName: "New International 1967"
};

exports.plessis = {
  a: 6376523.0,
  rf: 6355863.0,
  ellipseName: "Plessis 1817 (France)"
};

exports.krass = {
  a: 6378245.0,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};

exports.SEasia = {
  a: 6378155.0,
  b: 6356773.3205,
  ellipseName: "Southeast Asia"
};

exports.walbeck = {
  a: 6376896.0,
  b: 6355834.8467,
  ellipseName: "Walbeck"
};

exports.WGS60 = {
  a: 6378165.0,
  rf: 298.3,
  ellipseName: "WGS 60"
};

exports.WGS66 = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "WGS 66"
};

exports.WGS7 = {
  a: 6378135.0,
  rf: 298.26,
  ellipseName: "WGS 72"
};

var WGS84 = exports.WGS84 = {
  a: 6378137.0,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};

exports.sphere = {
  a: 6370997.0,
  b: 6370997.0,
  ellipseName: "Normal Sphere (r=6370997)"
};


/***/ }),

/***/ "../../node_modules/proj4/lib/constants/PrimeMeridian.js":
/*!***************************************************************!*\
  !*** ../../node_modules/proj4/lib/constants/PrimeMeridian.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ exports)
/* harmony export */ });
var exports = {};


exports.greenwich = 0.0; //"0dE",
exports.lisbon = -9.131906111111; //"9d07'54.862\"W",
exports.paris = 2.337229166667; //"2d20'14.025\"E",
exports.bogota = -74.080916666667; //"74d04'51.3\"W",
exports.madrid = -3.687938888889; //"3d41'16.58\"W",
exports.rome = 12.452333333333; //"12d27'8.4\"E",
exports.bern = 7.439583333333; //"7d26'22.5\"E",
exports.jakarta = 106.807719444444; //"106d48'27.79\"E",
exports.ferro = -17.666666666667; //"17d40'W",
exports.brussels = 4.367975; //"4d22'4.71\"E",
exports.stockholm = 18.058277777778; //"18d3'29.8\"E",
exports.athens = 23.7163375; //"23d42'58.815\"E",
exports.oslo = 10.722916666667; //"10d43'22.5\"E"


/***/ }),

/***/ "../../node_modules/proj4/lib/constants/units.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/constants/units.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ft: {to_meter: 0.3048},
  'us-ft': {to_meter: 1200 / 3937}
});


/***/ }),

/***/ "../../node_modules/proj4/lib/constants/values.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/constants/values.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PJD_3PARAM": () => (/* binding */ PJD_3PARAM),
/* harmony export */   "PJD_7PARAM": () => (/* binding */ PJD_7PARAM),
/* harmony export */   "PJD_GRIDSHIFT": () => (/* binding */ PJD_GRIDSHIFT),
/* harmony export */   "PJD_WGS84": () => (/* binding */ PJD_WGS84),
/* harmony export */   "PJD_NODATUM": () => (/* binding */ PJD_NODATUM),
/* harmony export */   "SRS_WGS84_SEMIMAJOR": () => (/* binding */ SRS_WGS84_SEMIMAJOR),
/* harmony export */   "SRS_WGS84_SEMIMINOR": () => (/* binding */ SRS_WGS84_SEMIMINOR),
/* harmony export */   "SRS_WGS84_ESQUARED": () => (/* binding */ SRS_WGS84_ESQUARED),
/* harmony export */   "SEC_TO_RAD": () => (/* binding */ SEC_TO_RAD),
/* harmony export */   "HALF_PI": () => (/* binding */ HALF_PI),
/* harmony export */   "SIXTH": () => (/* binding */ SIXTH),
/* harmony export */   "RA4": () => (/* binding */ RA4),
/* harmony export */   "RA6": () => (/* binding */ RA6),
/* harmony export */   "EPSLN": () => (/* binding */ EPSLN),
/* harmony export */   "D2R": () => (/* binding */ D2R),
/* harmony export */   "R2D": () => (/* binding */ R2D),
/* harmony export */   "FORTPI": () => (/* binding */ FORTPI),
/* harmony export */   "TWO_PI": () => (/* binding */ TWO_PI),
/* harmony export */   "SPI": () => (/* binding */ SPI)
/* harmony export */ });
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4; // WGS84 or equivalent
var PJD_NODATUM = 5; // WGS84 or equivalent
var SRS_WGS84_SEMIMAJOR = 6378137.0;  // only used in grid shift transforms
var SRS_WGS84_SEMIMINOR = 6356752.314;  // only used in grid shift transforms
var SRS_WGS84_ESQUARED = 0.0066943799901413165; // only used in grid shift transforms
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
var HALF_PI = Math.PI/2;
// ellipoid pj_set_ell.c
var SIXTH = 0.1666666666666666667;
/* 1/6 */
var RA4 = 0.04722222222222222222;
/* 17/360 */
var RA6 = 0.02215608465608465608;
var EPSLN = 1.0e-10;
// you'd think you could use Number.EPSILON above but that makes
// Mollweide get into an infinate loop.

var D2R = 0.01745329251994329577;
var R2D = 57.29577951308232088;
var FORTPI = Math.PI/4;
var TWO_PI = Math.PI * 2;
// SPI is slightly greater than Math.PI, so values that exceed the -180..180
// degree range by a tiny amount don't get wrapped. This prevents points that
// have drifted from their original location along the 180th meridian (due to
// floating point error) from changing their sign.
var SPI = 3.14159265359;


/***/ }),

/***/ "../../node_modules/proj4/lib/core.js":
/*!********************************************!*\
  !*** ../../node_modules/proj4/lib/core.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Proj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Proj */ "../../node_modules/proj4/lib/Proj.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "../../node_modules/proj4/lib/transform.js");


var wgs84 = (0,_Proj__WEBPACK_IMPORTED_MODULE_0__.default)('WGS84');

function transformer(from, to, coords) {
  var transformedArray, out, keys;
  if (Array.isArray(coords)) {
    transformedArray = (0,_transform__WEBPACK_IMPORTED_MODULE_1__.default)(from, to, coords) || {x: NaN, y: NaN};
    if (coords.length > 2) {
      if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
        if (typeof transformedArray.z === 'number') {
          return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
        } else {
          return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
        }
      } else {
        return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
      }
    } else {
      return [transformedArray.x, transformedArray.y];
    }
  } else {
    out = (0,_transform__WEBPACK_IMPORTED_MODULE_1__.default)(from, to, coords);
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return out;
    }
    keys.forEach(function (key) {
      if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
        if (key === 'x' || key === 'y' || key === 'z') {
          return;
        }
      } else {
        if (key === 'x' || key === 'y') {
          return;
        }
      }
      out[key] = coords[key];
    });
    return out;
  }
}

function checkProj(item) {
  if (item instanceof _Proj__WEBPACK_IMPORTED_MODULE_0__.default) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return (0,_Proj__WEBPACK_IMPORTED_MODULE_0__.default)(item);
}

function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === 'undefined') {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      forward: function (coords) {
        return transformer(fromProj, toProj, coords);
      },
      inverse: function (coords) {
        return transformer(toProj, fromProj, coords);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proj4);

/***/ }),

/***/ "../../node_modules/proj4/lib/datum.js":
/*!*********************************************!*\
  !*** ../../node_modules/proj4/lib/datum.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");


function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
  var out = {};

  if (datumCode === undefined || datumCode === 'none') {
    out.datum_type = _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_NODATUM;
  } else {
    out.datum_type = _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_WGS84;
  }

  if (datum_params) {
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM;
        out.datum_params[3] *= _constants_values__WEBPACK_IMPORTED_MODULE_0__.SEC_TO_RAD;
        out.datum_params[4] *= _constants_values__WEBPACK_IMPORTED_MODULE_0__.SEC_TO_RAD;
        out.datum_params[5] *= _constants_values__WEBPACK_IMPORTED_MODULE_0__.SEC_TO_RAD;
        out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
      }
    }
  }

  if (nadgrids) {
    out.datum_type = _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a; //datum object also uses these values
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (datum);


/***/ }),

/***/ "../../node_modules/proj4/lib/datumUtils.js":
/*!**************************************************!*\
  !*** ../../node_modules/proj4/lib/datumUtils.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareDatums": () => (/* binding */ compareDatums),
/* harmony export */   "geodeticToGeocentric": () => (/* binding */ geodeticToGeocentric),
/* harmony export */   "geocentricToGeodetic": () => (/* binding */ geocentricToGeodetic),
/* harmony export */   "geocentricToWgs84": () => (/* binding */ geocentricToWgs84),
/* harmony export */   "geocentricFromWgs84": () => (/* binding */ geocentricFromWgs84)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");


function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false; // false, datums are not equal
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
    // the tolerance for es is to ensure that GRS80 and WGS84
    // are considered identical
    return false;
  } else if (source.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
  } else if (source.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
  } else {
    return true; // datums are equal
  }
} // cs_compare_datums()

/*
 * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
 * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
 * according to the current ellipsoid parameters.
 *
 *    Latitude  : Geodetic latitude in radians                     (input)
 *    Longitude : Geodetic longitude in radians                    (input)
 *    Height    : Geodetic height, in meters                       (input)
 *    X         : Calculated Geocentric X coordinate, in meters    (output)
 *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
 *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
 *
 */
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0; //Z value not always supplied

  var Rn; /*  Earth radius at location  */
  var Sin_Lat; /*  Math.sin(Latitude)  */
  var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
  var Cos_Lat; /*  Math.cos(Latitude)  */

  /*
   ** Don't blow up if Latitude is just a little out of the value
   ** range as it may just be a rounding issue.  Also removed longitude
   ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
   */
  if (Latitude < -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI && Latitude > -1.001 * _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) {
    Latitude = -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
  } else if (Latitude > _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI && Latitude < 1.001 * _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) {
    Latitude = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
  } else if (Latitude < -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) {
    /* Latitude out of range */
    //..reportError('geocent:lat out of range:' + Latitude);
    return { x: -Infinity, y: -Infinity, z: p.z };
  } else if (Latitude > _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) {
    /* Latitude out of range */
    return { x: Infinity, y: Infinity, z: p.z };
  }

  if (Longitude > Math.PI) {
    Longitude -= (2 * Math.PI);
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: ((Rn * (1 - es)) + Height) * Sin_Lat
  };
} // cs_geodetic_to_geocentric()

function geocentricToGeodetic(p, es, a, b) {
  /* local defintions and variables */
  /* end-criterium of loop, accuracy of sin(Latitude) */
  var genau = 1e-12;
  var genau2 = (genau * genau);
  var maxiter = 30;

  var P; /* distance between semi-minor axis and location */
  var RR; /* distance between center and location */
  var CT; /* sin of geocentric latitude */
  var ST; /* cos of geocentric latitude */
  var RX;
  var RK;
  var RN; /* Earth radius at location */
  var CPHI0; /* cos of start or old geodetic latitude in iterations */
  var SPHI0; /* sin of start or old geodetic latitude in iterations */
  var CPHI; /* cos of searched geodetic latitude */
  var SPHI; /* sin of searched geodetic latitude */
  var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
  var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

  var X = p.x;
  var Y = p.y;
  var Z = p.z ? p.z : 0.0; //Z value not always supplied
  var Longitude;
  var Latitude;
  var Height;

  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z * Z);

  /*      special cases for latitude and longitude */
  if (P / a < genau) {

    /*  special case, if P=0. (X=0., Y=0.) */
    Longitude = 0.0;

    /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
     *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
    if (RR / a < genau) {
      Latitude = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
      Height = -b;
      return {
        x: p.x,
        y: p.y,
        z: p.z
      };
    }
  } else {
    /*  ellipsoidal (geodetic) longitude
     *  interval: -PI < Longitude <= +PI */
    Longitude = Math.atan2(Y, X);
  }

  /* --------------------------------------------------------------
   * Following iterative algorithm was developped by
   * "Institut for Erdmessung", University of Hannover, July 1988.
   * Internet: www.ife.uni-hannover.de
   * Iterative computation of CPHI,SPHI and Height.
   * Iteration of CPHI and SPHI to 10**-12 radian resp.
   * 2*10**-7 arcsec.
   * --------------------------------------------------------------
   */
  CT = Z / RR;
  ST = P / RR;
  RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
  CPHI0 = ST * (1.0 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;

  /* loop to find sin(Latitude) resp. Latitude
   * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
  do {
    iter++;
    RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

    /*  ellipsoidal (geodetic) height */
    Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

    RK = es * RN / (RN + Height);
    RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
    CPHI = ST * (1.0 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  }
  while (SDPHI * SDPHI > genau2 && iter < maxiter);

  /*      ellipsoidal (geodetic) latitude */
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
} // cs_geocentric_to_geodetic()

/****************************************************************/
// pj_geocentic_to_wgs84( p )
//  p = point to transform in geocentric coordinates (x,y,z)


/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
function geocentricToWgs84(p, datum_type, datum_params) {

  if (datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM) {
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2],
    };
  } else if (datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
} // cs_geocentric_to_wgs84

/****************************************************************/
// pj_geocentic_from_wgs84()
//  coordinate system definition,
//  point to transform in geocentric coordinates (x,y,z)
function geocentricFromWgs84(p, datum_type, datum_params) {

  if (datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM) {
    //if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2],
    };

  } else if (datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    //if( x[io] === HUGE_VAL )
    //    continue;

    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  } //cs_geocentric_from_wgs84()
}


/***/ }),

/***/ "../../node_modules/proj4/lib/datum_transform.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/datum_transform.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "applyGridShift": () => (/* binding */ applyGridShift)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _datumUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datumUtils */ "../../node_modules/proj4/lib/datumUtils.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");




function checkParams(type) {
  return (type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM || type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(source, dest, point) {
  // Short cut if the datums are identical.
  if ((0,_datumUtils__WEBPACK_IMPORTED_MODULE_1__.compareDatums)(source, dest)) {
    return point; // in this case, zero is sucess,
    // whereas cs_compare_datums returns 1 to indicate TRUE
    // confusing, should fix this
  }

  // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
  if (source.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_NODATUM || dest.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_NODATUM) {
    return point;
  }

  // If this datum requires grid shifts, then apply it to geodetic coordinates.
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return undefined;
    }
    source_a = _constants_values__WEBPACK_IMPORTED_MODULE_0__.SRS_WGS84_SEMIMAJOR;
    source_es = _constants_values__WEBPACK_IMPORTED_MODULE_0__.SRS_WGS84_ESQUARED;
  }

  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_GRIDSHIFT) {
    dest_a = _constants_values__WEBPACK_IMPORTED_MODULE_0__.SRS_WGS84_SEMIMAJOR;
    dest_b = _constants_values__WEBPACK_IMPORTED_MODULE_0__.SRS_WGS84_SEMIMINOR;
    dest_es = _constants_values__WEBPACK_IMPORTED_MODULE_0__.SRS_WGS84_ESQUARED;
  }

  // Do we need to go through geocentric coordinates?
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
    return point;
  }

  // Convert to geocentric coordinates.
  point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_1__.geodeticToGeocentric)(point, source_es, source_a);
  // Convert between datums
  if (checkParams(source.datum_type)) {
    point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_1__.geocentricToWgs84)(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_1__.geocentricFromWgs84)(point, dest.datum_type, dest.datum_params);
  }
  point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_1__.geocentricToGeodetic)(point, dest_es, dest_a, dest_b);

  if (dest.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return undefined;
    }
  }

  return point;
}

function applyGridShift(source, inverse, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log('Grid shift grids not found');
    return -1;
  }
  var input = {x: -point.x, y: point.y};
  var output = {x: Number.NaN, y: Number.NaN};
  var onlyMandatoryGrids = false;
  var attemptedGrids = [];
  for (var i = 0; i < source.grids.length; i++) {
    var grid = source.grids[i];
    attemptedGrids.push(grid.name);
    if (grid.isNull) {
      output = input;
      break;
    }
    onlyMandatoryGrids = grid.mandatory;
    if (grid.grid === null) {
      if (grid.mandatory) {
        console.log("Unable to find mandatory grid '" + grid.name + "'");
        return -1;
      }
      continue;
    }
    var subgrid = grid.grid.subgrids[0];
    // skip tables that don't match our point at all
    var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
    var minX = subgrid.ll[0] - epsilon;
    var minY = subgrid.ll[1] - epsilon;
    var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
    var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
    if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x ) {
      continue;
    }
    output = applySubgridShift(input, inverse, subgrid);
    if (!isNaN(output.x)) {
      break;
    }
  }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '"+
      -input.x * _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D + " " + input.y * _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}

function applySubgridShift(pin, inverse, ct) {
  var val = {x: Number.NaN, y: Number.NaN};
  if (isNaN(pin.x)) { return val; }
  var tb = {x: pin.x, y: pin.y};
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i = 9, tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = {x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y)};
      t.x += dif.x;
      t.y += dif.y;
    } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}

function nadInterpolate(pin, ct) {
  var t = {x: pin.x / ct.del[0], y: pin.y / ct.del[1]};
  var indx = {x: Math.floor(t.x), y: Math.floor(t.y)};
  var frct = {x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y};
  var val= {x: Number.NaN, y: Number.NaN};
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = (indx.y * ct.lim[0]) + indx.x;
  var f00 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx++;
  var f10= {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx += ct.lim[0];
  var f11 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx--;
  var f01 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  var m11 = frct.x * frct.y, m10 = frct.x * (1.0 - frct.y),
    m00 = (1.0 - frct.x) * (1.0 - frct.y), m01 = (1.0 - frct.x) * frct.y;
  val.x = (m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x);
  val.y = (m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y);
  return val;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/defs.js":
/*!********************************************!*\
  !*** ../../node_modules/proj4/lib/defs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "../../node_modules/proj4/lib/global.js");
/* harmony import */ var _projString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projString */ "../../node_modules/proj4/lib/projString.js");
/* harmony import */ var wkt_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wkt-parser */ "../../node_modules/wkt-parser/index.js");




function defs(name) {
  /*global console*/
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === 'string') {
      if (def.charAt(0) === '+') {
        defs[name] = (0,_projString__WEBPACK_IMPORTED_MODULE_1__.default)(arguments[1]);
      }
      else {
        defs[name] = (0,wkt_parser__WEBPACK_IMPORTED_MODULE_2__.default)(arguments[1]);
      }
    } else {
      defs[name] = def;
    }
  }
  else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          defs.apply(that, v);
        }
        else {
          defs(v);
        }
      });
    }
    else if (typeof name === 'string') {
      if (name in defs) {
        return defs[name];
      }
    }
    else if ('EPSG' in name) {
      defs['EPSG:' + name.EPSG] = name;
    }
    else if ('ESRI' in name) {
      defs['ESRI:' + name.ESRI] = name;
    }
    else if ('IAU2000' in name) {
      defs['IAU2000:' + name.IAU2000] = name;
    }
    else {
      console.log(name);
    }
    return;
  }


}
(0,_global__WEBPACK_IMPORTED_MODULE_0__.default)(defs);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defs);


/***/ }),

/***/ "../../node_modules/proj4/lib/deriveConstants.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/deriveConstants.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eccentricity": () => (/* binding */ eccentricity),
/* harmony export */   "sphere": () => (/* binding */ sphere)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _constants_Ellipsoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants/Ellipsoid */ "../../node_modules/proj4/lib/constants/Ellipsoid.js");
/* harmony import */ var _match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./match */ "../../node_modules/proj4/lib/match.js");




function eccentricity(a, b, rf, R_A) {
  var a2 = a * a; // used in geocentric
  var b2 = b * b; // used in geocentric
  var es = (a2 - b2) / a2; // e ^ 2
  var e = 0;
  if (R_A) {
    a *= 1 - es * (_constants_values__WEBPACK_IMPORTED_MODULE_0__.SIXTH + es * (_constants_values__WEBPACK_IMPORTED_MODULE_0__.RA4 + es * _constants_values__WEBPACK_IMPORTED_MODULE_0__.RA6));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es); // eccentricity
  }
  var ep2 = (a2 - b2) / b2; // used in geocentric
  return {
    es: es,
    e: e,
    ep2: ep2
  };
}
function sphere(a, b, rf, ellps, sphere) {
  if (!a) { // do we have an ellipsoid?
    var ellipse = (0,_match__WEBPACK_IMPORTED_MODULE_2__.default)(_constants_Ellipsoid__WEBPACK_IMPORTED_MODULE_1__.default, ellps);
    if (!ellipse) {
      ellipse = _constants_Ellipsoid__WEBPACK_IMPORTED_MODULE_1__.WGS84;
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }

  if (rf && !b) {
    b = (1.0 - 1.0 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    sphere = true;
    b = a;
  }
  return {
    a: a,
    b: b,
    rf: rf,
    sphere: sphere
  };
}


/***/ }),

/***/ "../../node_modules/proj4/lib/extend.js":
/*!**********************************************!*\
  !*** ../../node_modules/proj4/lib/extend.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== undefined) {
      destination[property] = value;
    }
  }
  return destination;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/global.js":
/*!**********************************************!*\
  !*** ../../node_modules/proj4/lib/global.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(defs) {
  defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

  defs.WGS84 = defs['EPSG:4326'];
  defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
  defs.GOOGLE = defs['EPSG:3857'];
  defs['EPSG:900913'] = defs['EPSG:3857'];
  defs['EPSG:102113'] = defs['EPSG:3857'];
}


/***/ }),

/***/ "../../node_modules/proj4/lib/index.js":
/*!*********************************************!*\
  !*** ../../node_modules/proj4/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "../../node_modules/proj4/lib/core.js");
/* harmony import */ var _Proj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Proj */ "../../node_modules/proj4/lib/Proj.js");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Point */ "../../node_modules/proj4/lib/Point.js");
/* harmony import */ var _common_toPoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/toPoint */ "../../node_modules/proj4/lib/common/toPoint.js");
/* harmony import */ var _defs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defs */ "../../node_modules/proj4/lib/defs.js");
/* harmony import */ var _nadgrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nadgrid */ "../../node_modules/proj4/lib/nadgrid.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transform */ "../../node_modules/proj4/lib/transform.js");
/* harmony import */ var mgrs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mgrs */ "../../node_modules/mgrs/mgrs.js");
/* harmony import */ var _projs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../projs */ "../../node_modules/proj4/projs.js");










_core__WEBPACK_IMPORTED_MODULE_0__.default.defaultDatum = 'WGS84'; //default datum
_core__WEBPACK_IMPORTED_MODULE_0__.default.Proj = _Proj__WEBPACK_IMPORTED_MODULE_1__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.WGS84 = new _core__WEBPACK_IMPORTED_MODULE_0__.default.Proj('WGS84');
_core__WEBPACK_IMPORTED_MODULE_0__.default.Point = _Point__WEBPACK_IMPORTED_MODULE_2__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.toPoint = _common_toPoint__WEBPACK_IMPORTED_MODULE_3__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.defs = _defs__WEBPACK_IMPORTED_MODULE_4__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.nadgrid = _nadgrid__WEBPACK_IMPORTED_MODULE_5__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.transform = _transform__WEBPACK_IMPORTED_MODULE_6__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.mgrs = mgrs__WEBPACK_IMPORTED_MODULE_7__.default;
_core__WEBPACK_IMPORTED_MODULE_0__.default.version = '__VERSION__';
(0,_projs__WEBPACK_IMPORTED_MODULE_8__.default)(_core__WEBPACK_IMPORTED_MODULE_0__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_core__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "../../node_modules/proj4/lib/match.js":
/*!*********************************************!*\
  !*** ../../node_modules/proj4/lib/match.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ match)
/* harmony export */ });
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
  if (obj[key]) {
    return obj[key];
  }
  var keys = Object.keys(obj);
  var lkey = key.toLowerCase().replace(ignoredChar, '');
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, '');
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}


/***/ }),

/***/ "../../node_modules/proj4/lib/nadgrid.js":
/*!***********************************************!*\
  !*** ../../node_modules/proj4/lib/nadgrid.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ nadgrid),
/* harmony export */   "getNadgrids": () => (/* binding */ getNadgrids)
/* harmony export */ });
/**
 * Resources for details of NTv2 file formats:
 * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
 * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
 */

var loadedNadgrids = {};

/**
 * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
 * as an ArrayBuffer.
 */
function nadgrid(key, data) {
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  if (header.nSubgrids > 1) {
    console.log('Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored');
  }
  var subgrids = readSubgrids(view, header, isLittleEndian);
  var nadgrid = {header: header, subgrids: subgrids};
  loadedNadgrids[key] = nadgrid;
  return nadgrid;
}

/**
 * Given a proj4 value for nadgrids, return an array of loaded grids
 */
function getNadgrids(nadgrids) {
  // Format details: http://proj.maptools.org/gen_parms.html
  if (nadgrids === undefined) { return null; }
  var grids = nadgrids.split(',');
  return grids.map(parseNadgridString);
}

function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === '@';
  if (optional) {
    value = value.slice(1);
  }
  if (value === 'null') {
    return {name: 'null', mandatory: !optional, grid: null, isNull: true};
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}

function secondsToRadians(seconds) {
  return (seconds / 3600) * Math.PI / 180;
}

function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
  }
  return true;
}

function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian),
  };
}

function decodeString(view, start, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
}

function readSubgrids(view, header, isLittleEndian) {
  var gridOffset = 176;
  var grids = [];
  for (var i = 0; i < header.nSubgrids; i++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
    var lngColumnCount = Math.round(
      1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
    var latColumnCount = Math.round(
      1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
    // Proj4 operates on radians whereas the coordinates are in seconds in the grid
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
  }
  return grids;
}

function mapNodes(nodes) {
  return nodes.map(function (r) {return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];});
}

function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}

function readGridNodes(view, offset, gridHeader, isLittleEndian) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  var gridShiftRecords = [];
  for (var i = 0; i < gridHeader.gridNodeCount; i++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
      latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
      longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian),
    };
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/parseCode.js":
/*!*************************************************!*\
  !*** ../../node_modules/proj4/lib/parseCode.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defs */ "../../node_modules/proj4/lib/defs.js");
/* harmony import */ var wkt_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wkt-parser */ "../../node_modules/wkt-parser/index.js");
/* harmony import */ var _projString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projString */ "../../node_modules/proj4/lib/projString.js");
/* harmony import */ var _match__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./match */ "../../node_modules/proj4/lib/match.js");




function testObj(code){
  return typeof code === 'string';
}
function testDef(code){
  return code in _defs__WEBPACK_IMPORTED_MODULE_0__.default;
}
var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
function testWKT(code){
  return codeWords.some(function (word) {
    return code.indexOf(word) > -1;
  });
}
var codes = ['3857', '900913', '3785', '102113'];
function checkMercator(item) {
  var auth = (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(item, 'authority');
  if (!auth) {
    return;
  }
  var code = (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(auth, 'epsg');
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(item, 'extension');
  if (!ext) {
    return;
  }
  return (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(ext, 'proj4');
}
function testProj(code){
  return code[0] === '+';
}
function parse(code){
  if (testObj(code)) {
    //check to see if this is a WKT string
    if (testDef(code)) {
      return _defs__WEBPACK_IMPORTED_MODULE_0__.default[code];
    }
    if (testWKT(code)) {
      var out = (0,wkt_parser__WEBPACK_IMPORTED_MODULE_1__.default)(code);
      // test of spetial case, due to this being a very common and often malformed
      if (checkMercator(out)) {
        return _defs__WEBPACK_IMPORTED_MODULE_0__.default["EPSG:3857"];
      }
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        return (0,_projString__WEBPACK_IMPORTED_MODULE_2__.default)(maybeProjStr);
      }
      return out;
    }
    if (testProj(code)) {
      return (0,_projString__WEBPACK_IMPORTED_MODULE_2__.default)(code);
    }
  }else{
    return code;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);


/***/ }),

/***/ "../../node_modules/proj4/lib/projString.js":
/*!**************************************************!*\
  !*** ../../node_modules/proj4/lib/projString.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _constants_PrimeMeridian__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants/PrimeMeridian */ "../../node_modules/proj4/lib/constants/PrimeMeridian.js");
/* harmony import */ var _constants_units__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/units */ "../../node_modules/proj4/lib/constants/units.js");
/* harmony import */ var _match__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./match */ "../../node_modules/proj4/lib/match.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(defData) {
  var self = {};
  var paramObj = defData.split('+').map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(p, a) {
    var split = a.split('=');
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params = {
    proj: 'projName',
    datum: 'datumCode',
    rf: function(v) {
      self.rf = parseFloat(v);
    },
    lat_0: function(v) {
      self.lat0 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lat_1: function(v) {
      self.lat1 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lat_2: function(v) {
      self.lat2 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lat_ts: function(v) {
      self.lat_ts = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lon_0: function(v) {
      self.long0 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lon_1: function(v) {
      self.long1 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    lon_2: function(v) {
      self.long2 = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    alpha: function(v) {
      self.alpha = parseFloat(v) * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    gamma: function(v) {
      self.rectified_grid_angle = parseFloat(v);
    },
    lonc: function(v) {
      self.longc = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    x_0: function(v) {
      self.x0 = parseFloat(v);
    },
    y_0: function(v) {
      self.y0 = parseFloat(v);
    },
    k_0: function(v) {
      self.k0 = parseFloat(v);
    },
    k: function(v) {
      self.k0 = parseFloat(v);
    },
    a: function(v) {
      self.a = parseFloat(v);
    },
    b: function(v) {
      self.b = parseFloat(v);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v) {
      self.zone = parseInt(v, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    towgs84: function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a);
      });
    },
    to_meter: function(v) {
      self.to_meter = parseFloat(v);
    },
    units: function(v) {
      self.units = v;
      var unit = (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(_constants_units__WEBPACK_IMPORTED_MODULE_2__.default, v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function(v) {
      self.from_greenwich = v * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    pm: function(v) {
      var pm = (0,_match__WEBPACK_IMPORTED_MODULE_3__.default)(_constants_PrimeMeridian__WEBPACK_IMPORTED_MODULE_1__.default, v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    },
    nadgrids: function(v) {
      if (v === '@null') {
        self.datumCode = 'none';
      }
      else {
        self.nadgrids = v;
      }
    },
    axis: function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    },
    approx: function() {
      self.approx = true;
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params) {
      paramOutname = params[paramName];
      if (typeof paramOutname === 'function') {
        paramOutname(paramVal);
      }
      else {
        self[paramOutname] = paramVal;
      }
    }
    else {
      self[paramName] = paramVal;
    }
  }
  if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
}


/***/ }),

/***/ "../../node_modules/proj4/lib/projections.js":
/*!***************************************************!*\
  !*** ../../node_modules/proj4/lib/projections.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projections_merc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projections/merc */ "../../node_modules/proj4/lib/projections/merc.js");
/* harmony import */ var _projections_longlat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projections/longlat */ "../../node_modules/proj4/lib/projections/longlat.js");


var projs = [_projections_merc__WEBPACK_IMPORTED_MODULE_0__.default, _projections_longlat__WEBPACK_IMPORTED_MODULE_1__.default];
var names = {};
var projStore = [];

function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names[n.toLowerCase()] = len;
  });
  return this;
}



function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names[n] !== 'undefined' && projStore[names[n]]) {
    return projStore[names[n]];
  }
}

function start() {
  projs.forEach(add);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  start: start,
  add: add,
  get: get
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/aea.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/aea.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "phi1z": () => (/* binding */ phi1z),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_qsfnz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/qsfnz */ "../../node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");






function init() {

  if (Math.abs(this.lat1 + this.lat2) < _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);

  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e3, this.sin_po, this.cos_po);
  this.qs1 = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e3, this.sin_po, this.cos_po);
  this.qs2 = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e3, this.sin_po, this.cos_po);

  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e3, this.sin_po, this.cos_po);

  if (Math.abs(this.lat1 - this.lat2) > _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  }
  else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);

  var qs = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e3, this.sin_phi, this.cos_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh1, qs, con, theta, lon, lat;

  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  }
  else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }

  lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(theta / this.ns0 + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
}

/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_3__.default)(0.5 * qs);
  if (eccent < _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
    return phi;
  }

  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}

var names = ["Albers_Conic_Equal_Area", "Albers", "aea"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  phi1z: phi1z
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/aeqd.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/aeqd.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_mlfn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/mlfn */ "../../node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var _common_e0fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/e0fn */ "../../node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var _common_e1fn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/e1fn */ "../../node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var _common_e2fn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/e2fn */ "../../node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var _common_e3fn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/e3fn */ "../../node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var _common_gN__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/gN */ "../../node_modules/proj4/lib/common/gN.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var _common_imlfn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/imlfn */ "../../node_modules/proj4/lib/common/imlfn.js");














function init() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
}

function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //North Pole case
      p.x = this.x0 + this.a * (_constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (_constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI - lat) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //South Pole case
      p.x = this.x0 + this.a * (_constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (_constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI + lat) * Math.cos(dlon);
      return p;
    }
    else {
      //default case
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c ? c / Math.sin(c) : 1;
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  }
  else {
    e0 = (0,_common_e0fn__WEBPACK_IMPORTED_MODULE_3__.default)(this.es);
    e1 = (0,_common_e1fn__WEBPACK_IMPORTED_MODULE_4__.default)(this.es);
    e2 = (0,_common_e2fn__WEBPACK_IMPORTED_MODULE_5__.default)(this.es);
    e3 = (0,_common_e3fn__WEBPACK_IMPORTED_MODULE_6__.default)(this.es);
    if (Math.abs(this.sin_p12 - 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //North Pole case
      Mlp = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI);
      Ml = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //South Pole case
      Mlp = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI);
      Ml = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    }
    else {
      //Default case
      tanphi = sinphi / cosphi;
      Nl1 = (0,_common_gN__WEBPACK_IMPORTED_MODULE_7__.default)(this.a, this.e, this.sin_p12);
      Nl = (0,_common_gN__WEBPACK_IMPORTED_MODULE_7__.default)(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else if (Math.abs(Math.abs(Az) - Math.PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H;
      Hs = H * H;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p.x = this.x0 + c * Math.sin(Az);
      p.y = this.y0 + c * Math.cos(Az);
      return p;
    }
  }


}

function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > (2 * _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI * this.a)) {
      return;
    }
    z = rh / this.a;

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      lat = this.lat0;
    }
    else {
      lat = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_8__.default)(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      con = Math.abs(this.lat0) - _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI;
      if (Math.abs(con) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
        if (this.lat0 >= 0) {
          lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2(p.x, - p.y));
        }
        else {
          lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 - Math.atan2(-p.x, p.y));
        }
      }
      else {
        /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
        lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    e0 = (0,_common_e0fn__WEBPACK_IMPORTED_MODULE_3__.default)(this.es);
    e1 = (0,_common_e1fn__WEBPACK_IMPORTED_MODULE_4__.default)(this.es);
    e2 = (0,_common_e2fn__WEBPACK_IMPORTED_MODULE_5__.default)(this.es);
    e3 = (0,_common_e3fn__WEBPACK_IMPORTED_MODULE_6__.default)(this.es);
    if (Math.abs(this.sin_p12 - 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //North pole case
      Mlp = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = Mlp - rh;
      lat = (0,_common_imlfn__WEBPACK_IMPORTED_MODULE_9__.default)(M / this.a, e0, e1, e2, e3);
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2(p.x, - 1 * p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      //South pole case
      Mlp = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(e0, e1, e2, e3, _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = rh - Mlp;

      lat = (0,_common_imlfn__WEBPACK_IMPORTED_MODULE_9__.default)(M / this.a, e0, e1, e2, e3);
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2(p.x, p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      //default case
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      Az = Math.atan2(p.x, p.y);
      N1 = (0,_common_gN__WEBPACK_IMPORTED_MODULE_7__.default)(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A = -tmp * tmp / (1 - this.es);
      B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D = rh / N1;
      Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
      F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      sinpsi = Math.sin(psi);
      lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
      p.x = lon;
      p.y = lat;
      return p;
    }
  }

}

var names = ["Azimuthal_Equidistant", "aeqd"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/cass.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/cass.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_mlfn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/mlfn */ "../../node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var _common_e0fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/e0fn */ "../../node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var _common_e1fn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/e1fn */ "../../node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var _common_e2fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/e2fn */ "../../node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var _common_e3fn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/e3fn */ "../../node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var _common_gN__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/gN */ "../../node_modules/proj4/lib/common/gN.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_adjust_lat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/adjust_lat */ "../../node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var _common_imlfn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/imlfn */ "../../node_modules/proj4/lib/common/imlfn.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");











function init() {
  if (!this.sphere) {
    this.e0 = (0,_common_e0fn__WEBPACK_IMPORTED_MODULE_1__.default)(this.es);
    this.e1 = (0,_common_e1fn__WEBPACK_IMPORTED_MODULE_2__.default)(this.es);
    this.e2 = (0,_common_e2fn__WEBPACK_IMPORTED_MODULE_3__.default)(this.es);
    this.e3 = (0,_common_e3fn__WEBPACK_IMPORTED_MODULE_4__.default)(this.es);
    this.ml0 = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_0__.default)(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}

/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__.default)(lam - this.long0);

  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  }
  else {
    //ellipsoid
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = (0,_common_gN__WEBPACK_IMPORTED_MODULE_5__.default)(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_0__.default)(this.e0, this.e1, this.e2, this.e3, phi);

    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


  }

  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;

  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  }
  else {
    /* ellipsoid */
    var ml1 = this.ml0 / this.a + y;
    var phi1 = (0,_common_imlfn__WEBPACK_IMPORTED_MODULE_8__.default)(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - _constants_values__WEBPACK_IMPORTED_MODULE_9__.HALF_PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_9__.EPSLN) {
      p.x = this.long0;
      p.y = _constants_values__WEBPACK_IMPORTED_MODULE_9__.HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = (0,_common_gN__WEBPACK_IMPORTED_MODULE_5__.default)(this.a, this.e, Math.sin(phi1));

    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

  }

  p.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__.default)(lam + this.long0);
  p.y = (0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_7__.default)(phi);
  return p;

}

var names = ["Cassini", "Cassini_Soldner", "cass"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/cea.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/cea.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_qsfnz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/qsfnz */ "../../node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_iqsfnz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/iqsfnz */ "../../node_modules/proj4/lib/common/iqsfnz.js");





/*
  reference:
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
function init() {
  //no-op
  if (!this.sphere) {
    this.k0 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_2__.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}

/* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  /* Forward equations
      -----------------*/
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  }
  else {
    var qs = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }

  p.x = x;
  p.y = y;
  return p;
}

/* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;

  if (this.sphere) {
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
    lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
  }
  else {
    lat = (0,_common_iqsfnz__WEBPACK_IMPORTED_MODULE_3__.default)(this.e, 2 * p.y * this.k0 / this.a);
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + p.x / (this.a * this.k0));
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["cea"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/eqc.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/eqc.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_adjust_lat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lat */ "../../node_modules/proj4/lib/common/adjust_lat.js");



function init() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

  this.rc = Math.cos(this.lat_ts);
}

// forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  var dlat = (0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_1__.default)(lat - this.lat0);
  p.x = this.x0 + (this.a * dlon * this.rc);
  p.y = this.y0 + (this.a * dlat);
  return p;
}

// inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {

  var x = p.x;
  var y = p.y;

  p.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + ((x - this.x0) / (this.a * this.rc)));
  p.y = (0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_1__.default)(this.lat0 + ((y - this.y0) / (this.a)));
  return p;
}

var names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/eqdc.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/eqdc.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_e0fn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/e0fn */ "../../node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var _common_e1fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/e1fn */ "../../node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var _common_e2fn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/e2fn */ "../../node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var _common_e3fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/e3fn */ "../../node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_mlfn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/mlfn */ "../../node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_adjust_lat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/adjust_lat */ "../../node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var _common_imlfn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/imlfn */ "../../node_modules/proj4/lib/common/imlfn.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");











function init() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < _constants_values__WEBPACK_IMPORTED_MODULE_9__.EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = (0,_common_e0fn__WEBPACK_IMPORTED_MODULE_0__.default)(this.es);
  this.e1 = (0,_common_e1fn__WEBPACK_IMPORTED_MODULE_1__.default)(this.es);
  this.e2 = (0,_common_e2fn__WEBPACK_IMPORTED_MODULE_2__.default)(this.es);
  this.e3 = (0,_common_e3fn__WEBPACK_IMPORTED_MODULE_3__.default)(this.es);

  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);

  this.ms1 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_4__.default)(this.e, this.sinphi, this.cosphi);
  this.ml1 = (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_5__.default)(this.e0, this.e1, this.e2, this.e3, this.lat1);

  if (Math.abs(this.lat1 - this.lat2) < _constants_values__WEBPACK_IMPORTED_MODULE_9__.EPSLN) {
    this.ns = this.sinphi;
  }
  else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_4__.default)(this.e, this.sinphi, this.cosphi);
    this.ml2 = (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_5__.default)(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_5__.default)(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}

/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;

  /* Forward equations
      -----------------*/
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  }
  else {
    var ml = (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_5__.default)(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__.default)(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }

  if (this.sphere) {
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__.default)(this.long0 + theta / this.ns);
    lat = (0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_7__.default)(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    var ml = this.g - rh1 / this.a;
    lat = (0,_common_imlfn__WEBPACK_IMPORTED_MODULE_8__.default)(ml, this.e0, this.e1, this.e2, this.e3);
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_6__.default)(this.long0 + theta / this.ns);
    p.x = lon;
    p.y = lat;
    return p;
  }

}

var names = ["Equidistant_Conic", "eqdc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/etmerc.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/etmerc.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projections_tmerc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projections/tmerc */ "../../node_modules/proj4/lib/projections/tmerc.js");
/* harmony import */ var _common_sinh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/sinh */ "../../node_modules/proj4/lib/common/sinh.js");
/* harmony import */ var _common_hypot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/hypot */ "../../node_modules/proj4/lib/common/hypot.js");
/* harmony import */ var _common_asinhy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/asinhy */ "../../node_modules/proj4/lib/common/asinhy.js");
/* harmony import */ var _common_gatg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/gatg */ "../../node_modules/proj4/lib/common/gatg.js");
/* harmony import */ var _common_clens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/clens */ "../../node_modules/proj4/lib/common/clens.js");
/* harmony import */ var _common_clens_cmplx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/clens_cmplx */ "../../node_modules/proj4/lib/common/clens_cmplx.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
// Heavily based on this etmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js










function init() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    // When '+approx' is set, use tmerc instead
    _projections_tmerc__WEBPACK_IMPORTED_MODULE_0__.default.init.apply(this);
    this.forward = _projections_tmerc__WEBPACK_IMPORTED_MODULE_0__.default.forward;
    this.inverse = _projections_tmerc__WEBPACK_IMPORTED_MODULE_0__.default.inverse;
  }

  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];

  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;

  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
  this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);

  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

  this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);

  var Z = (0,_common_gatg__WEBPACK_IMPORTED_MODULE_4__.default)(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z + (0,_common_clens__WEBPACK_IMPORTED_MODULE_5__.default)(this.gtu, 2 * Z));
}

function forward(p) {
  var Ce = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_7__.default)(p.x - this.long0);
  var Cn = p.y;

  Cn = (0,_common_gatg__WEBPACK_IMPORTED_MODULE_4__.default)(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);

  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, (0,_common_hypot__WEBPACK_IMPORTED_MODULE_2__.default)(sin_Cn, cos_Cn * cos_Ce));
  Ce = (0,_common_asinhy__WEBPACK_IMPORTED_MODULE_3__.default)(Math.tan(Ce));

  var tmp = (0,_common_clens_cmplx__WEBPACK_IMPORTED_MODULE_6__.default)(this.gtu, 2 * Cn, 2 * Ce);

  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];

  var x;
  var y;

  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  }
  else {
    x = Infinity;
    y = Infinity;
  }

  p.x = x;
  p.y = y;

  return p;
}

function inverse(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);

  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;

  var lon;
  var lat;

  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = (0,_common_clens_cmplx__WEBPACK_IMPORTED_MODULE_6__.default)(this.utg, 2 * Cn, 2 * Ce);

    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan((0,_common_sinh__WEBPACK_IMPORTED_MODULE_1__.default)(Ce));

    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);

    Cn = Math.atan2(sin_Cn * cos_Ce, (0,_common_hypot__WEBPACK_IMPORTED_MODULE_2__.default)(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_7__.default)(Ce + this.long0);
    lat = (0,_common_gatg__WEBPACK_IMPORTED_MODULE_4__.default)(this.cgb, Cn);
  }
  else {
    lon = Infinity;
    lat = Infinity;
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/gauss.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/gauss.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_srat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/srat */ "../../node_modules/proj4/lib/common/srat.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");

var MAX_ITER = 20;


function init() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + _constants_values__WEBPACK_IMPORTED_MODULE_1__.FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + _constants_values__WEBPACK_IMPORTED_MODULE_1__.FORTPI), this.C) * (0,_common_srat__WEBPACK_IMPORTED_MODULE_0__.default)(this.e * sphi, this.ratexp));
}

function forward(p) {
  var lon = p.x;
  var lat = p.y;

  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + _constants_values__WEBPACK_IMPORTED_MODULE_1__.FORTPI), this.C) * (0,_common_srat__WEBPACK_IMPORTED_MODULE_0__.default)(this.e * Math.sin(lat), this.ratexp)) - _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI;
  p.x = this.C * lon;
  return p;
}

function inverse(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + _constants_values__WEBPACK_IMPORTED_MODULE_1__.FORTPI) / this.K, 1 / this.C);
  for (var i = MAX_ITER; i > 0; --i) {
    lat = 2 * Math.atan(num * (0,_common_srat__WEBPACK_IMPORTED_MODULE_0__.default)(this.e * Math.sin(p.y), - 0.5 * this.e)) - _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  /* convergence failed */
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["gauss"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/geocent.js":
/*!***********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/geocent.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _datumUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../datumUtils */ "../../node_modules/proj4/lib/datumUtils.js");


function init() {
    this.name = 'geocent';

}

function forward(p) {
    var point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_0__.geodeticToGeocentric)(p, this.es, this.a);
    return point;
}

function inverse(p) {
    var point = (0,_datumUtils__WEBPACK_IMPORTED_MODULE_0__.geocentricToGeodetic)(p, this.es, this.a, this.b);
    return point;
}

var names = ["Geocentric", 'geocentric', "geocent", "Geocent"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    init: init,
    forward: forward,
    inverse: inverse,
    names: names
});

/***/ }),

/***/ "../../node_modules/proj4/lib/projections/gnom.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/gnom.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");




/*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
function init() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  // Approximation for projecting points to the horizon (infinity)
  this.infinity_dist = 1000 * this.a;
  this.rc = 1;
}

/* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= _constants_values__WEBPACK_IMPORTED_MODULE_2__.EPSLN)) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  }
  else {

    // Point is in the opposing hemisphere and is unprojectable
    // We still need to return a reasonable point, so we project
    // to infinity, on a bearing
    // equivalent to the northern hemisphere equivalent
    // This is a reasonable approximation for short shapes and lines that
    // straddle the horizon.

    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh; /* Rho */
  var sinc, cosc;
  var c;
  var lon, lat;

  /* Inverse equations
      -----------------*/
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;

  if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);

    lat = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_1__.default)(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + lon);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["gnom"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/krovak.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/krovak.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");


function init() {
  this.a = 6377397.155;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  /* if scale not set default to 0.9999 */
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448; /* 45 */
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}

/* ellipsoid */
/* calculate xy from lat/lon */
/* Constants, identical to inverse transform function */
function forward(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  /* Transformation */
  gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;

  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return (p);
}

/* calculate lat/lon from xy */
function inverse(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;

  /* Transformation */
  /* revert y, x*/
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 0.0000000001) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }

  return (p);
}

var names = ["Krovak", "krovak"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/laea.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/laea.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S_POLE": () => (/* binding */ S_POLE),
/* harmony export */   "N_POLE": () => (/* binding */ N_POLE),
/* harmony export */   "EQUIT": () => (/* binding */ EQUIT),
/* harmony export */   "OBLIQ": () => (/* binding */ OBLIQ),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_qsfnz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/qsfnz */ "../../node_modules/proj4/lib/common/qsfnz.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");






/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

var S_POLE = 1;

var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;

/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
function init() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  }
  else if (Math.abs(t) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    this.mode = this.EQUIT;
  }
  else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;

    this.qp = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
    case this.N_POLE:
      this.dd = 1;
      break;
    case this.S_POLE:
      this.dd = 1;
      break;
    case this.EQUIT:
      this.rq = Math.sqrt(0.5 * this.qp);
      this.dd = 1 / this.rq;
      this.xmf = 1;
      this.ymf = 0.5 * this.qp;
      break;
    case this.OBLIQ:
      this.rq = Math.sqrt(0.5 * this.qp);
      sinphi = Math.sin(this.lat0);
      this.sinb1 = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, sinphi) / this.qp;
      this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
      this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
      this.ymf = (this.xmf = this.rq) / this.dd;
      this.xmf *= this.dd;
      break;
    }
  }
  else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;

  lam = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(lam - this.long0);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
        return null;
      }
      y = _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI - phi * 0.5;
      y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  }
  else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = (0,_common_qsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
    case this.OBLIQ:
      b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
      break;
    case this.EQUIT:
      b = 1 + cosb * coslam;
      break;
    case this.N_POLE:
      b = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + phi;
      q = this.qp - q;
      break;
    case this.S_POLE:
      b = phi - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
      q = this.qp + q;
      break;
    }
    if (Math.abs(b) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      return null;
    }
    switch (this.mode) {
    case this.OBLIQ:
    case this.EQUIT:
      b = Math.sqrt(2 / b);
      if (this.mode === this.OBLIQ) {
        y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
      }
      else {
        y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
      }
      x = this.xmf * b * cosb * sinlam;
      break;
    case this.N_POLE:
    case this.S_POLE:
      if (q >= 0) {
        x = (b = Math.sqrt(q)) * sinlam;
        y = coslam * ((this.mode === this.S_POLE) ? b : -b);
      }
      else {
        x = y = 0;
      }
      break;
    }
  }

  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0,
      rh, sinz = 0;

    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
    case this.EQUIT:
      phi = (Math.abs(rh) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) ? 0 : Math.asin(y * sinz / rh);
      x *= sinz;
      y = cosz * rh;
      break;
    case this.OBLIQ:
      phi = (Math.abs(rh) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
      x *= sinz * this.cosph0;
      y = (cosz - Math.sin(phi) * this.sinph0) * rh;
      break;
    case this.N_POLE:
      y = -y;
      phi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - phi;
      break;
    case this.S_POLE:
      phi -= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
      break;
    }
    lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
  }
  else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= (sCe = Math.sin(sCe));
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      }
      else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = (x * x + y * y);
      if (!q) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }

  p.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_2__.default)(this.long0 + lam);
  p.y = phi;
  return p;
}

/* determine latitude from authalic latitude */
var P00 = 0.33333333333333333333;

var P01 = 0.17222222222222222222;
var P02 = 0.10257936507936507936;
var P10 = 0.06388888888888888888;
var P11 = 0.06640211640211640211;
var P20 = 0.01641501294219154443;

function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}

function authlat(beta, APA) {
  var t = beta + beta;
  return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
}

var names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  S_POLE: S_POLE,
  N_POLE: N_POLE,
  EQUIT: EQUIT,
  OBLIQ: OBLIQ
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/lcc.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/lcc.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_tsfnz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/tsfnz */ "../../node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var _common_sign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/sign */ "../../node_modules/proj4/lib/common/sign.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_phi2z__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/phi2z */ "../../node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");






function init() {

  // array of:  r_maj,r_min,lat1,lat2,c_lon,c_lat,false_east,false_north
  //double c_lat;                   /* center latitude                      */
  //double c_lon;                   /* center longitude                     */
  //double lat1;                    /* first standard parallel              */
  //double lat2;                    /* second standard parallel             */
  //double r_maj;                   /* major axis                           */
  //double r_min;                   /* minor axis                           */
  //double false_east;              /* x offset in meters                   */
  //double false_north;             /* y offset in meters                   */

  if (!this.lat2) {
    this.lat2 = this.lat1;
  } //if lat2 is not defined
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) {
    return;
  }

  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);

  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, sin1, cos1);
  var ts1 = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, this.lat1, sin1);

  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, sin2, cos2);
  var ts2 = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, this.lat2, sin2);

  var ts0 = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, this.lat0, Math.sin(this.lat0));

  if (Math.abs(this.lat1 - this.lat2) > _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  }
  else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}

// Lambert Conformal conic forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {

  var lon = p.x;
  var lat = p.y;

  // singular cases :
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) {
    lat = (0,_common_sign__WEBPACK_IMPORTED_MODULE_2__.default)(lat) * (_constants_values__WEBPACK_IMPORTED_MODULE_5__.HALF_PI - 2 * _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN);
  }

  var con = Math.abs(Math.abs(lat) - _constants_values__WEBPACK_IMPORTED_MODULE_5__.HALF_PI);
  var ts, rh1;
  if (con > _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) {
    ts = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_1__.default)(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  }
  else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__.default)(lon - this.long0);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

  return p;
}

// Lambert Conformal Conic inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {

  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = (this.rh - (p.y - this.y0) / this.k0);
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2((con * x), (con * y));
  }
  if ((rh1 !== 0) || (this.ns > 0)) {
    con = 1 / this.ns;
    ts = Math.pow((rh1 / (this.a * this.f0)), con);
    lat = (0,_common_phi2z__WEBPACK_IMPORTED_MODULE_4__.default)(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  else {
    lat = -_constants_values__WEBPACK_IMPORTED_MODULE_5__.HALF_PI;
  }
  lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__.default)(theta / this.ns + this.long0);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc"
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/longlat.js":
/*!***********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/longlat.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ identity),
/* harmony export */   "inverse": () => (/* binding */ identity),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function init() {
  //no-op for longlat
}

function identity(pt) {
  return pt;
}


var names = ["longlat", "identity"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: identity,
  inverse: identity,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/merc.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/merc.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_tsfnz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/tsfnz */ "../../node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var _common_phi2z__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/phi2z */ "../../node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");






function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if(!('x0' in this)){
    this.x0 = 0;
  }
  if(!('y0' in this)){
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    }
    else {
      this.k0 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }
  else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      }
      else {
        this.k0 = 1;
      }
    }
  }
}

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

function forward(p) {
  var lon = p.x;
  var lat = p.y;
  // convert to radians
  if (lat * _constants_values__WEBPACK_IMPORTED_MODULE_4__.R2D > 90 && lat * _constants_values__WEBPACK_IMPORTED_MODULE_4__.R2D < -90 && lon * _constants_values__WEBPACK_IMPORTED_MODULE_4__.R2D > 180 && lon * _constants_values__WEBPACK_IMPORTED_MODULE_4__.R2D < -180) {
    return null;
  }

  var x, y;
  if (Math.abs(Math.abs(lat) - _constants_values__WEBPACK_IMPORTED_MODULE_4__.HALF_PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
    return null;
  }
  else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(_constants_values__WEBPACK_IMPORTED_MODULE_4__.FORTPI + 0.5 * lat));
    }
    else {
      var sinphi = Math.sin(lat);
      var ts = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_2__.default)(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}

/* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
function inverse(p) {

  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;

  if (this.sphere) {
    lat = _constants_values__WEBPACK_IMPORTED_MODULE_4__.HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  }
  else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = (0,_common_phi2z__WEBPACK_IMPORTED_MODULE_3__.default)(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(this.long0 + x / (this.a * this.k0));

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/mill.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/mill.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");


/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */


/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
function init() {
  //no-op
}

/* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

  p.x = x;
  p.y = y;
  return p;
}

/* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;

  var lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + p.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Miller_Cylindrical", "mill"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/moll.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/moll.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");

function init() {}

/* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
function forward(p) {

  /* Forward equations
      -----------------*/
  var lon = p.x;
  var lat = p.y;

  var delta_lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);

  /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
      break;
    }
  }
  theta /= 2;

  /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
  if (Math.PI / 2 - Math.abs(lat) < _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var theta;
  var arg;

  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);

  /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
  if (lon < (-Math.PI)) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Mollweide", "moll"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/nzmg.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/nzmg.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iterations": () => (/* binding */ iterations),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");


/*
  reference
    Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
    OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
  */

/**
 * iterations: Number of iterations to refine inverse transform.
 *     0 -> km accuracy
 *     1 -> m accuracy -- suitable for most mapping applications
 *     2 -> mm accuracy
 */
var iterations = 1;

function init() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -0.0055161;
  this.A[7] = 0.0026906;
  this.A[8] = -0.001333;
  this.A[9] = 0.00067;
  this.A[10] = -0.00034;

  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 0.003371507;
  this.B_re[3] = -0.001541739;
  this.B_im[3] = 0.041058560;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;

  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -0.007809598;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;

  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 0.007317;
  this.D[7] = 0.01220;
  this.D[8] = 0.00394;
  this.D[9] = -0.0013;
}

/**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
function forward(p) {
  var n;
  var lon = p.x;
  var lat = p.y;

  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;

  // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
  // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
  var d_phi = delta_lat / _constants_values__WEBPACK_IMPORTED_MODULE_0__.SEC_TO_RAD * 1E-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1; // d_phi^0

  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }

  // 2. Calculate theta
  var th_re = d_psi;
  var th_im = d_lambda;

  // 3. Calculate z
  var th_n_re = 1;
  var th_n_im = 0; // theta^0
  var th_n_re1;
  var th_n_im1;

  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }

  // 4. Calculate easting and northing
  p.x = (z_im * this.a) + this.x0;
  p.y = (z_re * this.a) + this.y0;

  return p;
}

/**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
function inverse(p) {
  var n;
  var x = p.x;
  var y = p.y;

  var delta_x = x - this.x0;
  var delta_y = y - this.y0;

  // 1. Calculate z
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;

  // 2a. Calculate theta - first approximation gives km accuracy
  var z_n_re = 1;
  var z_n_im = 0; // z^0
  var z_n_re1;
  var z_n_im1;

  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }

  // 2b. Iterate to refine the accuracy of the calculation
  //        0 iterations gives km accuracy
  //        1 iteration gives m accuracy -- good enough for most mapping applications
  //        2 iterations bives mm accuracy
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;

    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    // Complex division
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }

  // 3. Calculate d_phi              ...                                    // and d_lambda
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1; // d_psi^0

  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }

  // 4. Calculate latitude and longitude
  // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
  var lat = this.lat0 + (d_phi * _constants_values__WEBPACK_IMPORTED_MODULE_0__.SEC_TO_RAD * 1E5);
  var lon = this.long0 + d_lambda;

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["New_Zealand_Map_Grid", "nzmg"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/omerc.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/omerc.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_tsfnz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/tsfnz */ "../../node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_phi2z__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/phi2z */ "../../node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");





var TOL = 1e-7;

function isTypeA(P) {
  var typeAProjections = ['Hotine_Oblique_Mercator','Hotine_Oblique_Mercator_Azimuth_Natural_Origin'];
  var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
  
  return 'no_uoff' in P || 'no_off' in P || typeAProjections.indexOf(projectionName) !== -1;
}


/* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
function init() {  
  var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0,
    gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0, AB;
  
  // only Type A uses the no_off or no_uoff property
  // https://github.com/OSGeo/proj.4/issues/104
  this.no_off = isTypeA(this);
  this.no_rot = 'no_rot' in this;
  
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }

  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }

  if (alp) {
    alpha_c = this.alpha;
  }
  
  if (gam) {
    gamma = (this.rectified_grid_angle * _constants_values__WEBPACK_IMPORTED_MODULE_3__.D2R);
  }
  
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL ||
        Math.abs(con - _constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - _constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI) <= TOL ||
        Math.abs(Math.abs(phi2) - _constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  
  var one_es = 1.0 - this.es;
  com = Math.sqrt(one_es);
  
  if (Math.abs(this.lat0) > _constants_values__WEBPACK_IMPORTED_MODULE_3__.EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D = this.B * com / (cosph0 * Math.sqrt(con));
    F = D * D -1;
    
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    
    this.E = F += D;
    this.E *= Math.pow((0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D = F = 1;
  }
  
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H = Math.pow((0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, phi1, Math.sin(phi1)), this.B);
    L = Math.pow((0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H;
    p = (L - H) / (L + H);
    J = this.E * this.E;
    J = (J - L * H) / (J + L * H);
    con = lam1 - lam2;
    
    if (con < -Math.pi) {
      lam2 -=_constants_values__WEBPACK_IMPORTED_MODULE_3__.TWO_PI;
    } else if (con > Math.pi) {
      lam2 += _constants_values__WEBPACK_IMPORTED_MODULE_3__.TWO_PI;
    }
    
    this.lam0 = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
    gamma0 = Math.atan(2 * Math.sin(this.B * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(lam1 - this.lam0)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
  }
  
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  AB = this.A * this.B;
  
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
    
    if (this.lat0 < 0) {
      this.u_0 = - this.u_0;
    }  
  }
    
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(_constants_values__WEBPACK_IMPORTED_MODULE_3__.FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(_constants_values__WEBPACK_IMPORTED_MODULE_3__.FORTPI + F));
}


/* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
function forward(p) {
  var coords = {};
  var S, T, U, V, W, temp, u, v;
  p.x = p.x - this.lam0;
  
  if (Math.abs(Math.abs(p.y) - _constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI) > _constants_values__WEBPACK_IMPORTED_MODULE_3__.EPSLN) {
    W = this.E / Math.pow((0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_0__.default)(this.e, p.y, Math.sin(p.y)), this.B);
    
    temp = 1 / W;
    S = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V = Math.sin(this.B * p.x);
    U = (S * this.singam - V * this.cosgam) / T;
        
    if (Math.abs(Math.abs(U) - 1.0) < _constants_values__WEBPACK_IMPORTED_MODULE_3__.EPSLN) {
      throw new Error();
    }
    
    v = 0.5 * this.ArB * Math.log((1 - U)/(1 + U));
    temp = Math.cos(this.B * p.x);
    
    if (Math.abs(temp) < TOL) {
      u = this.A * p.x;
    } else {
      u = this.ArB * Math.atan2((S * this.cosgam + V * this.singam), temp);
    }    
  } else {
    v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
    u = this.ArB * p.y;
  }
     
  if (this.no_rot) {
    coords.x = u;
    coords.y = v;
  } else {
    u -= this.u_0;
    coords.x = v * this.cosrot + u * this.sinrot;
    coords.y = u * this.cosrot - v * this.sinrot;
  }
  
  coords.x = (this.a * coords.x + this.x0);
  coords.y = (this.a * coords.y + this.y0);
  
  return coords;
}

function inverse(p) {
  var u, v, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  
  p.x = (p.x - this.x0) * (1.0 / this.a);
  p.y = (p.y - this.y0) * (1.0 / this.a);

  if (this.no_rot) {
    v = p.y;
    u = p.x;
  } else {
    v = p.x * this.cosrot - p.y * this.sinrot;
    u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
  }
  
  Qp = Math.exp(-this.BrA * v);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  
  if (Math.abs(Math.abs(Up) - 1) < _constants_values__WEBPACK_IMPORTED_MODULE_3__.EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -_constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI : _constants_values__WEBPACK_IMPORTED_MODULE_3__.HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = (0,_common_phi2z__WEBPACK_IMPORTED_MODULE_2__.default)(this.e, Math.pow(coords.y, 1 / this.B));
    
    if (coords.y === Infinity) {
      throw new Error();
    }
        
    coords.x = -this.rB * Math.atan2((Sp * this.cosgam - Vp * this.singam), Math.cos(this.BrA * u));
  }
  
  coords.x += this.lam0;
  
  return coords;
}

var names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/ortho.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/ortho.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");




function init() {
  //double temp;      /* temporary variable    */

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
}

/* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g, x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= _constants_values__WEBPACK_IMPORTED_MODULE_2__.EPSLN)) {
    x = this.a * ksp * cosphi * Math.sin(dlon);
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var rh; /* height above ellipsoid      */
  var z; /* angle          */
  var sinz, cosz; /* sin of z and cos of z      */
  var con;
  var lon, lat;
  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_1__.default)(rh / this.a);

  sinz = Math.sin(z);
  cosz = Math.cos(z);

  lon = this.long0;
  if (Math.abs(rh) <= _constants_values__WEBPACK_IMPORTED_MODULE_2__.EPSLN) {
    lat = this.lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_1__.default)(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
  con = Math.abs(this.lat0) - _constants_values__WEBPACK_IMPORTED_MODULE_2__.HALF_PI;
  if (Math.abs(con) <= _constants_values__WEBPACK_IMPORTED_MODULE_2__.EPSLN) {
    if (this.lat0 >= 0) {
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2(p.x, - p.y));
    }
    else {
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 - Math.atan2(-p.x, p.y));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["ortho"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/poly.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/poly.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_e0fn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/e0fn */ "../../node_modules/proj4/lib/common/e0fn.js");
/* harmony import */ var _common_e1fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/e1fn */ "../../node_modules/proj4/lib/common/e1fn.js");
/* harmony import */ var _common_e2fn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/e2fn */ "../../node_modules/proj4/lib/common/e2fn.js");
/* harmony import */ var _common_e3fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/e3fn */ "../../node_modules/proj4/lib/common/e3fn.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_adjust_lat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/adjust_lat */ "../../node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var _common_mlfn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/mlfn */ "../../node_modules/proj4/lib/common/mlfn.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_gN__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/gN */ "../../node_modules/proj4/lib/common/gN.js");










var MAX_ITER = 20;

function init() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
  this.e = Math.sqrt(this.es);
  this.e0 = (0,_common_e0fn__WEBPACK_IMPORTED_MODULE_0__.default)(this.es);
  this.e1 = (0,_common_e1fn__WEBPACK_IMPORTED_MODULE_1__.default)(this.es);
  this.e2 = (0,_common_e2fn__WEBPACK_IMPORTED_MODULE_2__.default)(this.es);
  this.e3 = (0,_common_e3fn__WEBPACK_IMPORTED_MODULE_3__.default)(this.es);
  this.ml0 = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_6__.default)(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
}

/* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__.default)(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    }
    else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * ((0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_5__.default)(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  }
  else {
    if (Math.abs(lat) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    }
    else {
      var nl = (0,_common_gN__WEBPACK_IMPORTED_MODULE_8__.default)(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_6__.default)(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }

  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;

  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__.default)(x / this.a + this.long0);
      lat = 0;
    }
    else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__.default)(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
    }
  }
  else {
    if (Math.abs(y + this.ml0) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
      lat = 0;
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__.default)(this.long0 + x / this.a);
    }
    else {

      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * (0,_common_mlfn__WEBPACK_IMPORTED_MODULE_6__.default)(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= _constants_values__WEBPACK_IMPORTED_MODULE_7__.EPSLN) {
          lat = phi;
          break;
        }
      }

      //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_4__.default)(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Polyconic", "poly"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/qsc.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/qsc.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
// QSC projection rewritten from the original PROJ4
// https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c



/* constants */
var FACE_ENUM = {
    FRONT: 1,
    RIGHT: 2,
    BACK: 3,
    LEFT: 4,
    TOP: 5,
    BOTTOM: 6
};

var AREA_ENUM = {
    AREA_0: 1,
    AREA_1: 2,
    AREA_2: 3,
    AREA_3: 4
};

function init() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";

  /* Determine the cube face from the center of projection. */
  if (this.lat0 >= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI / 2.0) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI / 2.0)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
    this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }

  /* Fill in useful values for the ellipsoid <-> sphere shift
   * described in [LK12]. */
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}

// QSC forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward(p) {
  var xy = {x: 0, y: 0};
  var lat, lon;
  var theta, phi;
  var t, mu;
  /* nu; */
  var area = {value: 0};

  // move lon according to projection's lon
  p.x -= this.long0;

  /* Convert the geodetic latitude to a geocentric latitude.
   * This corresponds to the shift from the ellipsoid to the sphere
   * described in [LK12]. */
  if (this.es !== 0) {//if (P->es != 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }

  /* Convert the input lat, lon into theta, phi as used by QSC.
   * This depends on the cube face and the area on it.
   * For the top and bottom face, we can compute theta and phi
   * directly from phi, lam. For the other faces, we must use
   * unit sphere cartesian coordinates as an intermediate step. */
  lon = p.x; //lon = lp.lam;
  if (this.face === FACE_ENUM.TOP) {
    phi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - lat;
    if (lon >= _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI && lon <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else if (lon > _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI || lon <= -(_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = (lon > 0.0 ? lon - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : lon + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    } else if (lon > -(_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) && lon <= -_constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + lat;
    if (lon >= _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI && lon <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else if (lon < _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI && lon >= -_constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -_constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI && lon >= -(_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = (lon > 0.0 ? -lon + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : -lon - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;

    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +_constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;

    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      /* Impossible */
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }

  /* Compute mu and nu for the area of definition.
   * For mu, see Eq. (3-21) in [OL76], but note the typos:
   * compare with Eq. (3-14). For nu, see Eq. (3-38). */
  mu = Math.atan((12 / _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(_constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI)) - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

  /* Apply the result to the real area. */
  if (area.value === AREA_ENUM.AREA_1) {
    mu += _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI;
  }

  /* Now compute x, y from mu and nu */
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;

  p.x = xy.x;
  p.y = xy.y;
  return p;
}

// QSC inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse(p) {
  var lp = {lam: 0, phi: 0};
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = {value: 0};

  /* de-offset */
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  /* Convert the input x, y to the mu and nu angles as used by QSC.
   * This depends on the area of the cube face. */
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
  } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = (mu < 0.0 ? mu + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : mu - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
  }

  /* Compute phi and theta for the area of definition.
   * The inverse projection is not described in the original paper, but some
   * good hints can be found here (as of 2011-12-14):
   * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
   * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
  t = (_constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI / 12) * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > +1) {
    cosphi = +1;
  }

  /* Apply the result to the real area on the cube face.
   * For the top and bottom face, we can compute phi and lam directly.
   * For the other faces, we must use unit sphere cartesian coordinates
   * as an intermediate step. */
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = (theta < 0.0 ? theta + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : theta - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = (theta < 0.0 ? -theta - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : -theta + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    }
  } else {
    /* Compute phi and lam via cartesian unit sphere coordinates. */
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    /* Rotate q,r,s into the correct area. */
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    /* Rotate q,r,s into the correct cube face. */
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    /* Now compute phi and lam from the unit sphere coordinates. */
    lp.phi = Math.acos(-s) - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -_constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI);
    }
  }

  /* Apply the shift from the sphere to the ellipsoid as described
   * in [LK12]. */
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = (lp.phi < 0 ? 1 : 0);
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }

  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}

/* Helper function for forward projection: compute the theta angle
 * and determine the area number. */
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0.0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI && theta <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else if (theta > _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI || theta <= -(_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + _constants_values__WEBPACK_IMPORTED_MODULE_0__.FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = (theta >= 0.0 ? theta - _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI : theta + _constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI);
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    }
  }
  return theta;
}

/* Helper function: shift the longitude. */
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -_constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI) {
    slon += _constants_values__WEBPACK_IMPORTED_MODULE_0__.TWO_PI;
  } else if (slon > +_constants_values__WEBPACK_IMPORTED_MODULE_0__.SPI) {
    slon -= _constants_values__WEBPACK_IMPORTED_MODULE_0__.TWO_PI;
  }
  return slon;
}

var names = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});



/***/ }),

/***/ "../../node_modules/proj4/lib/projections/robin.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/robin.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
// Robinson projection
// Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
// Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039




var COEFS_X = [
    [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
    [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
    [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
    [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
    [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
    [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
    [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
    [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
    [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
    [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
    [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
    [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
    [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
    [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
    [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
    [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
    [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
    [0.5722, -0.00906601, 0.000182, 6.24051e-06],
    [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
];

var COEFS_Y = [
    [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
    [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
    [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
    [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
    [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
    [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
    [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
    [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
    [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
    [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
    [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
    [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
    [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
    [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
    [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
    [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
    [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
    [0.9761, 0.00616527, -0.000256, -4.2106e-06],
    [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
];

var FXC = 0.8487;
var FYC = 1.3523;
var C1 = _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D/5; // rad to 5-degree interval
var RC1 = 1/C1;
var NODES = 18;

var poly3_val = function(coefs, x) {
    return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};

var poly3_der = function(coefs, x) {
    return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};

function newton_rapshon(f_df, start, max_err, iters) {
    var x = start;
    for (; iters; --iters) {
        var upd = f_df(x);
        x -= upd;
        if (Math.abs(upd) < max_err) {
            break;
        }
    }
    return x;
}

function init() {
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.long0 = this.long0 || 0;
    this.es = 0;
    this.title = this.title || "Robinson";
}

function forward(ll) {
    var lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(ll.x - this.long0);

    var dphi = Math.abs(ll.y);
    var i = Math.floor(dphi * C1);
    if (i < 0) {
        i = 0;
    } else if (i >= NODES) {
        i = NODES - 1;
    }
    dphi = _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D * (dphi - RC1 * i);
    var xy = {
        x: poly3_val(COEFS_X[i], dphi) * lon,
        y: poly3_val(COEFS_Y[i], dphi)
    };
    if (ll.y < 0) {
        xy.y = -xy.y;
    }

    xy.x = xy.x * this.a * FXC + this.x0;
    xy.y = xy.y * this.a * FYC + this.y0;
    return xy;
}

function inverse(xy) {
    var ll = {
        x: (xy.x - this.x0) / (this.a * FXC),
        y: Math.abs(xy.y - this.y0) / (this.a * FYC)
    };

    if (ll.y >= 1) { // pathologic case
        ll.x /= COEFS_X[NODES][0];
        ll.y = xy.y < 0 ? -_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI : _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    } else {
        // find table interval
        var i = Math.floor(ll.y * NODES);
        if (i < 0) {
            i = 0;
        } else if (i >= NODES) {
            i = NODES - 1;
        }
        for (;;) {
            if (COEFS_Y[i][0] > ll.y) {
                --i;
            } else if (COEFS_Y[i+1][0] <= ll.y) {
                ++i;
            } else {
                break;
            }
        }
        // linear interpolation in 5 degree interval
        var coefs = COEFS_Y[i];
        var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
        // find t so that poly3_val(coefs, t) = ll.y
        t = newton_rapshon(function(x) {
            return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
        }, t, _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN, 100);

        ll.x /= poly3_val(COEFS_X[i], t);
        ll.y = (5 * i + t) * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
        if (xy.y < 0) {
            ll.y = -ll.y;
        }
    }

    ll.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(ll.x + this.long0);
    return ll;
}

var names = ["Robinson", "robin"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/sinu.js":
/*!********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/sinu.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _common_adjust_lat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lat */ "../../node_modules/proj4/lib/common/adjust_lat.js");
/* harmony import */ var _common_pj_enfn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/pj_enfn */ "../../node_modules/proj4/lib/common/pj_enfn.js");
/* harmony import */ var _common_pj_mlfn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/pj_mlfn */ "../../node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var _common_pj_inv_mlfn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/pj_inv_mlfn */ "../../node_modules/proj4/lib/common/pj_inv_mlfn.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");



var MAX_ITER = 20;







function init() {
  /* Place parameters in static storage for common use
    -------------------------------------------------*/


  if (!this.sphere) {
    this.en = (0,_common_pj_enfn__WEBPACK_IMPORTED_MODULE_2__.default)(this.es);
  }
  else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }

}

/* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
function forward(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
    -----------------*/
  lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);

  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    }
    else {
      var k = this.n * Math.sin(lat);
      for (var i = MAX_ITER; i; --i) {
        var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V;
        if (Math.abs(V) < _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;

  }
  else {

    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * (0,_common_pj_mlfn__WEBPACK_IMPORTED_MODULE_3__.default)(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }

  p.x = x;
  p.y = y;
  return p;
}

function inverse(p) {
  var lat, temp, lon, s;

  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;

  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_6__.default)((this.m * lat + Math.sin(lat)) / this.n);
    }
    else if (this.n !== 1) {
      lat = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_6__.default)(Math.sin(lat) / this.n);
    }
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon + this.long0);
    lat = (0,_common_adjust_lat__WEBPACK_IMPORTED_MODULE_1__.default)(lat);
  }
  else {
    lat = (0,_common_pj_inv_mlfn__WEBPACK_IMPORTED_MODULE_4__.default)(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < _constants_values__WEBPACK_IMPORTED_MODULE_5__.HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      //temp = this.long0 + p.x / (this.a * Math.cos(lat));
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(temp);
    }
    else if ((s - _constants_values__WEBPACK_IMPORTED_MODULE_5__.EPSLN) < _constants_values__WEBPACK_IMPORTED_MODULE_5__.HALF_PI) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Sinusoidal", "sinu"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/somerc.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/somerc.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */

function init() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}

function forward(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;

  // spheric latitude
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

  // spheric longitude
  var I = this.alpha * (p.x - this.lambda0);

  // psoeudo equatorial rotation
  var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}

function inverse(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;

  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

  var lambda = this.lambda0 + I / this.alpha;

  var S = 0;
  var phy = b;
  var prevPhy = -1000;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 0.0000001) {
    if (++iteration > 20) {
      //...reportError("omercFwdInfinity");
      return;
    }
    //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }

  p.x = lambda;
  p.y = phy;
  return p;
}

var names = ["somerc"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/stere.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/stere.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ssfn_": () => (/* binding */ ssfn_),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_sign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/sign */ "../../node_modules/proj4/lib/common/sign.js");
/* harmony import */ var _common_msfnz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/msfnz */ "../../node_modules/proj4/lib/common/msfnz.js");
/* harmony import */ var _common_tsfnz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/tsfnz */ "../../node_modules/proj4/lib/common/tsfnz.js");
/* harmony import */ var _common_phi2z__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/phi2z */ "../../node_modules/proj4/lib/common/phi2z.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");








function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return (Math.tan(0.5 * (_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
}

function init() {
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      this.k0 = 0.5 * (1 + (0,_common_sign__WEBPACK_IMPORTED_MODULE_1__.default)(this.lat0) * Math.sin(this.lat_ts));
    }
  }
  else {
    if (Math.abs(this.coslat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      if (this.lat0 > 0) {
        //North pole
        //trace('stere:north pole');
        this.con = 1;
      }
      else {
        //South pole
        //trace('stere:south pole');
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      this.k0 = 0.5 * this.cons * (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_2__.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_3__.default)(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = (0,_common_msfnz__WEBPACK_IMPORTED_MODULE_2__.default)(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}

// Stereographic forward equations--mapping lat,long to x,y
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A, X, sinX, cosX, ts, rh;
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(lon - this.long0);

  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN && Math.abs(lat + this.lat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    //case of the origine point
    //trace('stere:this is the origin point');
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    //trace('stere:sphere case');
    A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  }
  else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      ts = (0,_common_tsfnz__WEBPACK_IMPORTED_MODULE_3__.default)(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      //trace(p.toString());
      return p;
    }
    else if (Math.abs(this.sinlat0) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      //Eq
      //trace('stere:equateur');
      A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A * sinX;
    }
    else {
      //other case
      //trace('stere:normal case');
      A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A * cosX * Math.sin(dlon) + this.x0;
  }
  //trace(p.toString());
  return p;
}

//* Stereographic inverse equations--mapping x,y to lat/long
function inverse(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      if (this.lat0 > 0) {
        lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(this.long0 + Math.atan2(p.x, p.y));
      }
    }
    else {
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    if (Math.abs(this.coslat0) <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
      if (rh <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        //trace(p.toString());
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * (0,_common_phi2z__WEBPACK_IMPORTED_MODULE_4__.default)(this.e, ts);
      lon = this.con * (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
    }
    else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
        Chi = this.X0;
      }
      else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_5__.default)(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * (0,_common_phi2z__WEBPACK_IMPORTED_MODULE_4__.default)(this.e, Math.tan(0.5 * (_constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;

  //trace(p.toString());
  return p;

}

var names = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  ssfn_: ssfn_
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/sterea.js":
/*!**********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/sterea.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gauss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gauss */ "../../node_modules/proj4/lib/projections/gauss.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");



function init() {
  _gauss__WEBPACK_IMPORTED_MODULE_0__.default.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}

function forward(p) {
  var sinc, cosc, cosl, k;
  p.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(p.x - this.long0);
  _gauss__WEBPACK_IMPORTED_MODULE_0__.default.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}

function inverse(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;
  if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  _gauss__WEBPACK_IMPORTED_MODULE_0__.default.inverse.apply(this, [p]);
  p.x = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_1__.default)(p.x + this.long0);
  return p;
}

var names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/tmerc.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/tmerc.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_pj_enfn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/pj_enfn */ "../../node_modules/proj4/lib/common/pj_enfn.js");
/* harmony import */ var _common_pj_mlfn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/pj_mlfn */ "../../node_modules/proj4/lib/common/pj_mlfn.js");
/* harmony import */ var _common_pj_inv_mlfn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/pj_inv_mlfn */ "../../node_modules/proj4/lib/common/pj_inv_mlfn.js");
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_sign__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/sign */ "../../node_modules/proj4/lib/common/sign.js");
// Heavily based on this tmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js









function init() {
  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  if (this.es) {
    this.en = (0,_common_pj_enfn__WEBPACK_IMPORTED_MODULE_0__.default)(this.es);
    this.ml0 = (0,_common_pj_mlfn__WEBPACK_IMPORTED_MODULE_1__.default)(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}

/**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
function forward(p) {
  var lon = p.x;
  var lat = p.y;

  var delta_lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__.default)(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);

  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);

    if ((Math.abs(Math.abs(b) - 1)) < _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
      return (93);
    }
    else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);

      if (b >= 1) {
        if ((b - 1) > _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN) {
          return (93);
        }
        else {
          y = 0;
        }
      }
      else {
        y = Math.acos(y);
      }

      if (lat < 0) {
        y = -y;
      }

      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  }
  else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = (0,_common_pj_mlfn__WEBPACK_IMPORTED_MODULE_1__.default)(lat, sin_phi, cos_phi, this.en);

    x = this.a * (this.k0 * al * (1 +
      als / 6 * (1 - t + c +
      als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
      als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
      this.x0;

    y = this.a * (this.k0 * (ml - this.ml0 +
      sin_phi * delta_lon * al / 2 * (1 +
      als / 12 * (5 - t + 9 * c + 4 * cs +
      als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
      als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
      this.y0;
  }

  p.x = x;
  p.y = y;

  return p;
}

/**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
function inverse(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);

  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);

    if (y < 0) {
      lat = -lat;
    }

    if ((g === 0) && (h === 0)) {
      lon = 0;
    }
    else {
      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__.default)(Math.atan2(g, h) + this.long0);
    }
  }
  else { // ellipsoidal form
    con = this.ml0 + y / this.k0;
    phi = (0,_common_pj_inv_mlfn__WEBPACK_IMPORTED_MODULE_2__.default)(con, this.es, this.en);

    if (Math.abs(phi) < _constants_values__WEBPACK_IMPORTED_MODULE_4__.HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > _constants_values__WEBPACK_IMPORTED_MODULE_4__.EPSLN ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;

      lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
        ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
        ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
        ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

      lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_3__.default)(this.long0 + (d * (1 -
        ds / 6 * (1 + 2 * t + c -
        ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
        ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
    }
    else {
      lat = _constants_values__WEBPACK_IMPORTED_MODULE_4__.HALF_PI * (0,_common_sign__WEBPACK_IMPORTED_MODULE_5__.default)(y);
      lon = 0;
    }
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/tpers.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/tpers.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_hypot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/hypot */ "../../node_modules/proj4/lib/common/hypot.js");

var mode = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
};




var params = {
  h:     { def: 100000, num: true },           // default is Karman line, no default in PROJ.7
  azi:   { def: 0, num: true, degrees: true }, // default is North
  tilt:  { def: 0, num: true, degrees: true }, // default is Nadir
  long0: { def: 0, num: true },                // default is Greenwich, conversion to rad is automatic
  lat0:  { def: 0, num: true }                 // default is Equator, conversion to rad is automatic
};

function init() {
  Object.keys(params).forEach(function (p) {
    if (typeof this[p] === "undefined") {
      this[p] = params[p].def;
    } else if (params[p].num && isNaN(this[p])) {
      throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
    } else if (params[p].num) {
      this[p] = parseFloat(this[p]);
    }
    if (params[p].degrees) {
      this[p] = this[p] * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R;
    }
  }.bind(this));

  if (Math.abs((Math.abs(this.lat0) - _constants_values__WEBPACK_IMPORTED_MODULE_0__.HALF_PI)) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }

  this.pn1 = this.h / this.a;  // Normalize relative to the Earth's radius

  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;

  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}

function forward(p) {
  p.x -= this.long0;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var coslam = Math.cos(p.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p.x);

  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }

  // Tilt 
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;

  p.x = x * this.a;
  p.y = y * this.a;
  return p;
}

function inverse(p) {
  p.x /= this.a;
  p.y /= this.a;
  var r = { x: p.x, y: p.y };

  // Un-Tilt
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p.y * this.sw);
  bm = this.pn1 * p.x * yt;
  bq = this.pn1 * p.y * this.cw * yt;
  p.x = bm * this.cg + bq * this.sg;
  p.y = bq * this.cg - bm * this.sg;

  var rh = (0,_common_hypot__WEBPACK_IMPORTED_MODULE_1__.default)(p.x, p.y);
  if (Math.abs(rh) < _constants_values__WEBPACK_IMPORTED_MODULE_0__.EPSLN) {
    r.x = 0;
    r.y = p.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
        p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p.y * sinz / rh);
        p.y = cosz * rh;
        p.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p.y = -p.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p.x, p.y);
  }

  p.x = r.x + this.long0;
  p.y = r.y;
  return p;
}

var names = ["Tilted_Perspective", "tpers"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/utm.js":
/*!*******************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/utm.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dependsOn": () => (/* binding */ dependsOn),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_zone */ "../../node_modules/proj4/lib/common/adjust_zone.js");
/* harmony import */ var _etmerc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./etmerc */ "../../node_modules/proj4/lib/projections/etmerc.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");


var dependsOn = 'etmerc';



function init() {
  var zone = (0,_common_adjust_zone__WEBPACK_IMPORTED_MODULE_0__.default)(this.zone, this.long0);
  if (zone === undefined) {
    throw new Error('unknown utm zone');
  }
  this.lat0 = 0;
  this.long0 =  ((6 * Math.abs(zone)) - 183) * _constants_values__WEBPACK_IMPORTED_MODULE_2__.D2R;
  this.x0 = 500000;
  this.y0 = this.utmSouth ? 10000000 : 0;
  this.k0 = 0.9996;

  _etmerc__WEBPACK_IMPORTED_MODULE_1__.default.init.apply(this);
  this.forward = _etmerc__WEBPACK_IMPORTED_MODULE_1__.default.forward;
  this.inverse = _etmerc__WEBPACK_IMPORTED_MODULE_1__.default.inverse;
}

var names = ["Universal Transverse Mercator System", "utm"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  names: names,
  dependsOn: dependsOn
});


/***/ }),

/***/ "../../node_modules/proj4/lib/projections/vandg.js":
/*!*********************************************************!*\
  !*** ../../node_modules/proj4/lib/projections/vandg.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "forward": () => (/* binding */ forward),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "names": () => (/* binding */ names),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/adjust_lon */ "../../node_modules/proj4/lib/common/adjust_lon.js");
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _common_asinz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/asinz */ "../../node_modules/proj4/lib/common/asinz.js");






/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
function init() {
  //this.R = 6370997; //Radius of earth
  this.R = this.a;
}

function forward(p) {

  var lon = p.x;
  var lat = p.y;

  /* Forward equations
    -----------------*/
  var dlon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(lon - this.long0);
  var x, y;

  if (Math.abs(lat) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = (0,_common_asinz__WEBPACK_IMPORTED_MODULE_2__.default)(2 * Math.abs(lat / Math.PI));
  if ((Math.abs(dlon) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) || (Math.abs(Math.abs(lat) - _constants_values__WEBPACK_IMPORTED_MODULE_1__.HALF_PI) <= _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN)) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    }
    else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    //  return(OK);
  }
  var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);

  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  //con = Math.abs(con / (Math.PI * this.R));
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 + con;
  }
  else {
    //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
function inverse(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;

  /* inverse equations
    -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = ((3 * d) / a1) / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    }
    else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }

  if (Math.abs(xx) < _constants_values__WEBPACK_IMPORTED_MODULE_1__.EPSLN) {
    lon = this.long0;
  }
  else {
    lon = (0,_common_adjust_lon__WEBPACK_IMPORTED_MODULE_0__.default)(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
});


/***/ }),

/***/ "../../node_modules/proj4/lib/transform.js":
/*!*************************************************!*\
  !*** ../../node_modules/proj4/lib/transform.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transform)
/* harmony export */ });
/* harmony import */ var _constants_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/values */ "../../node_modules/proj4/lib/constants/values.js");
/* harmony import */ var _datum_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datum_transform */ "../../node_modules/proj4/lib/datum_transform.js");
/* harmony import */ var _adjust_axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adjust_axis */ "../../node_modules/proj4/lib/adjust_axis.js");
/* harmony import */ var _Proj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Proj */ "../../node_modules/proj4/lib/Proj.js");
/* harmony import */ var _common_toPoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/toPoint */ "../../node_modules/proj4/lib/common/toPoint.js");
/* harmony import */ var _checkSanity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkSanity */ "../../node_modules/proj4/lib/checkSanity.js");







function checkNotWGS(source, dest) {
  return ((source.datum.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM || source.datum.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM) && dest.datumCode !== 'WGS84') || ((dest.datum.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_3PARAM || dest.datum.datum_type === _constants_values__WEBPACK_IMPORTED_MODULE_0__.PJD_7PARAM) && source.datumCode !== 'WGS84');
}

function transform(source, dest, point) {
  var wgs84;
  if (Array.isArray(point)) {
    point = (0,_common_toPoint__WEBPACK_IMPORTED_MODULE_4__.default)(point);
  }
  (0,_checkSanity__WEBPACK_IMPORTED_MODULE_5__.default)(point);
  // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs84 = new _Proj__WEBPACK_IMPORTED_MODULE_3__.default('WGS84');
    point = transform(source, wgs84, point);
    source = wgs84;
  }
  // DGR, 2010/11/12
  if (source.axis !== 'enu') {
    point = (0,_adjust_axis__WEBPACK_IMPORTED_MODULE_2__.default)(source, false, point);
  }
  // Transform source points to long/lat, if they aren't already.
  if (source.projName === 'longlat') {
    point = {
      x: point.x * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R,
      y: point.y * _constants_values__WEBPACK_IMPORTED_MODULE_0__.D2R,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point); // Convert Cartesian to longlat
    if (!point) {
      return;
    }
  }
  // Adjust for the prime meridian if necessary
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }

  // Convert datums if needed, and if possible.
  point = (0,_datum_transform__WEBPACK_IMPORTED_MODULE_1__.default)(source.datum, dest.datum, point);
  if (!point) {
    return;
  }

  // Adjust for the prime meridian if necessary
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }

  if (dest.projName === 'longlat') {
    // convert radians to decimal degrees
    point = {
      x: point.x * _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D,
      y: point.y * _constants_values__WEBPACK_IMPORTED_MODULE_0__.R2D,
      z: point.z || 0
    };
  } else { // else project
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }

  // DGR, 2010/11/12
  if (dest.axis !== 'enu') {
    return (0,_adjust_axis__WEBPACK_IMPORTED_MODULE_2__.default)(dest, true, point);
  }

  return point;
}


/***/ }),

/***/ "../../node_modules/proj4/projs.js":
/*!*****************************************!*\
  !*** ../../node_modules/proj4/projs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_projections_tmerc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/projections/tmerc */ "../../node_modules/proj4/lib/projections/tmerc.js");
/* harmony import */ var _lib_projections_etmerc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/projections/etmerc */ "../../node_modules/proj4/lib/projections/etmerc.js");
/* harmony import */ var _lib_projections_utm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/projections/utm */ "../../node_modules/proj4/lib/projections/utm.js");
/* harmony import */ var _lib_projections_sterea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/projections/sterea */ "../../node_modules/proj4/lib/projections/sterea.js");
/* harmony import */ var _lib_projections_stere__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/projections/stere */ "../../node_modules/proj4/lib/projections/stere.js");
/* harmony import */ var _lib_projections_somerc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/projections/somerc */ "../../node_modules/proj4/lib/projections/somerc.js");
/* harmony import */ var _lib_projections_omerc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/projections/omerc */ "../../node_modules/proj4/lib/projections/omerc.js");
/* harmony import */ var _lib_projections_lcc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/projections/lcc */ "../../node_modules/proj4/lib/projections/lcc.js");
/* harmony import */ var _lib_projections_krovak__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/projections/krovak */ "../../node_modules/proj4/lib/projections/krovak.js");
/* harmony import */ var _lib_projections_cass__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/projections/cass */ "../../node_modules/proj4/lib/projections/cass.js");
/* harmony import */ var _lib_projections_laea__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/projections/laea */ "../../node_modules/proj4/lib/projections/laea.js");
/* harmony import */ var _lib_projections_aea__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/projections/aea */ "../../node_modules/proj4/lib/projections/aea.js");
/* harmony import */ var _lib_projections_gnom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/projections/gnom */ "../../node_modules/proj4/lib/projections/gnom.js");
/* harmony import */ var _lib_projections_cea__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/projections/cea */ "../../node_modules/proj4/lib/projections/cea.js");
/* harmony import */ var _lib_projections_eqc__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/projections/eqc */ "../../node_modules/proj4/lib/projections/eqc.js");
/* harmony import */ var _lib_projections_poly__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/projections/poly */ "../../node_modules/proj4/lib/projections/poly.js");
/* harmony import */ var _lib_projections_nzmg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/projections/nzmg */ "../../node_modules/proj4/lib/projections/nzmg.js");
/* harmony import */ var _lib_projections_mill__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/projections/mill */ "../../node_modules/proj4/lib/projections/mill.js");
/* harmony import */ var _lib_projections_sinu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./lib/projections/sinu */ "../../node_modules/proj4/lib/projections/sinu.js");
/* harmony import */ var _lib_projections_moll__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./lib/projections/moll */ "../../node_modules/proj4/lib/projections/moll.js");
/* harmony import */ var _lib_projections_eqdc__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./lib/projections/eqdc */ "../../node_modules/proj4/lib/projections/eqdc.js");
/* harmony import */ var _lib_projections_vandg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./lib/projections/vandg */ "../../node_modules/proj4/lib/projections/vandg.js");
/* harmony import */ var _lib_projections_aeqd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lib/projections/aeqd */ "../../node_modules/proj4/lib/projections/aeqd.js");
/* harmony import */ var _lib_projections_ortho__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lib/projections/ortho */ "../../node_modules/proj4/lib/projections/ortho.js");
/* harmony import */ var _lib_projections_qsc__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./lib/projections/qsc */ "../../node_modules/proj4/lib/projections/qsc.js");
/* harmony import */ var _lib_projections_robin__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lib/projections/robin */ "../../node_modules/proj4/lib/projections/robin.js");
/* harmony import */ var _lib_projections_geocent__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./lib/projections/geocent */ "../../node_modules/proj4/lib/projections/geocent.js");
/* harmony import */ var _lib_projections_tpers__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./lib/projections/tpers */ "../../node_modules/proj4/lib/projections/tpers.js");




























/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(proj4){
  proj4.Proj.projections.add(_lib_projections_tmerc__WEBPACK_IMPORTED_MODULE_0__.default);
  proj4.Proj.projections.add(_lib_projections_etmerc__WEBPACK_IMPORTED_MODULE_1__.default);
  proj4.Proj.projections.add(_lib_projections_utm__WEBPACK_IMPORTED_MODULE_2__.default);
  proj4.Proj.projections.add(_lib_projections_sterea__WEBPACK_IMPORTED_MODULE_3__.default);
  proj4.Proj.projections.add(_lib_projections_stere__WEBPACK_IMPORTED_MODULE_4__.default);
  proj4.Proj.projections.add(_lib_projections_somerc__WEBPACK_IMPORTED_MODULE_5__.default);
  proj4.Proj.projections.add(_lib_projections_omerc__WEBPACK_IMPORTED_MODULE_6__.default);
  proj4.Proj.projections.add(_lib_projections_lcc__WEBPACK_IMPORTED_MODULE_7__.default);
  proj4.Proj.projections.add(_lib_projections_krovak__WEBPACK_IMPORTED_MODULE_8__.default);
  proj4.Proj.projections.add(_lib_projections_cass__WEBPACK_IMPORTED_MODULE_9__.default);
  proj4.Proj.projections.add(_lib_projections_laea__WEBPACK_IMPORTED_MODULE_10__.default);
  proj4.Proj.projections.add(_lib_projections_aea__WEBPACK_IMPORTED_MODULE_11__.default);
  proj4.Proj.projections.add(_lib_projections_gnom__WEBPACK_IMPORTED_MODULE_12__.default);
  proj4.Proj.projections.add(_lib_projections_cea__WEBPACK_IMPORTED_MODULE_13__.default);
  proj4.Proj.projections.add(_lib_projections_eqc__WEBPACK_IMPORTED_MODULE_14__.default);
  proj4.Proj.projections.add(_lib_projections_poly__WEBPACK_IMPORTED_MODULE_15__.default);
  proj4.Proj.projections.add(_lib_projections_nzmg__WEBPACK_IMPORTED_MODULE_16__.default);
  proj4.Proj.projections.add(_lib_projections_mill__WEBPACK_IMPORTED_MODULE_17__.default);
  proj4.Proj.projections.add(_lib_projections_sinu__WEBPACK_IMPORTED_MODULE_18__.default);
  proj4.Proj.projections.add(_lib_projections_moll__WEBPACK_IMPORTED_MODULE_19__.default);
  proj4.Proj.projections.add(_lib_projections_eqdc__WEBPACK_IMPORTED_MODULE_20__.default);
  proj4.Proj.projections.add(_lib_projections_vandg__WEBPACK_IMPORTED_MODULE_21__.default);
  proj4.Proj.projections.add(_lib_projections_aeqd__WEBPACK_IMPORTED_MODULE_22__.default);
  proj4.Proj.projections.add(_lib_projections_ortho__WEBPACK_IMPORTED_MODULE_23__.default);
  proj4.Proj.projections.add(_lib_projections_qsc__WEBPACK_IMPORTED_MODULE_24__.default);
  proj4.Proj.projections.add(_lib_projections_robin__WEBPACK_IMPORTED_MODULE_25__.default);
  proj4.Proj.projections.add(_lib_projections_geocent__WEBPACK_IMPORTED_MODULE_26__.default);
  proj4.Proj.projections.add(_lib_projections_tpers__WEBPACK_IMPORTED_MODULE_27__.default);
}

/***/ }),

/***/ "../../node_modules/wkt-parser/index.js":
/*!**********************************************!*\
  !*** ../../node_modules/wkt-parser/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "../../node_modules/wkt-parser/parser.js");
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./process */ "../../node_modules/wkt-parser/process.js");
var D2R = 0.01745329251994329577;





function rename(obj, params) {
  var outName = params[0];
  var inName = params[1];
  if (!(outName in obj) && (inName in obj)) {
    obj[outName] = obj[inName];
    if (params.length === 3) {
      obj[outName] = params[2](obj[outName]);
    }
  }
}

function d2r(input) {
  return input * D2R;
}

function cleanWKT(wkt) {
  if (wkt.type === 'GEOGCS') {
    wkt.projName = 'longlat';
  } else if (wkt.type === 'LOCAL_CS') {
    wkt.projName = 'identity';
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === 'object') {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = '';
    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
      var axis = wkt.AXIS[i];
      var descriptor = axis[0].toLowerCase();
      if (descriptor.indexOf('north') !== -1) {
        axisOrder += 'n';
      } else if (descriptor.indexOf('south') !== -1) {
        axisOrder += 's';
      } else if (descriptor.indexOf('east') !== -1) {
        axisOrder += 'e';
      } else if (descriptor.indexOf('west') !== -1) {
        axisOrder += 'w';
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += 'u';
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === 'metre') {
      wkt.units = 'meter';
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === 'GEOGCS') {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === 'GEOGCS') {
    geogcs = wkt;
  }
  if (geogcs) {
    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
    //}
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === 'd_') {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
      wkt.datumCode = 'nzgd49';
    }
    if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
        wkt.sphere = true;
      }
      wkt.datumCode = 'wgs84';
    }
    if (wkt.datumCode.slice(-6) === '_ferro') {
      wkt.datumCode = wkt.datumCode.slice(0, - 6);
    }
    if (wkt.datumCode.slice(-8) === '_jakarta') {
      wkt.datumCode = wkt.datumCode.slice(0, - 8);
    }
    if (~wkt.datumCode.indexOf('belge')) {
      wkt.datumCode = 'rnb72';
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
      if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
        wkt.ellps = 'intl';
      }

      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
    }

    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf('osgb_1936')) {
      wkt.datumCode = 'osgb36';
    }
    if (~wkt.datumCode.indexOf('osni_1952')) {
      wkt.datumCode = 'osni52';
    }
    if (~wkt.datumCode.indexOf('tm65')
      || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
      wkt.datumCode = 'ire65';
    }
    if (wkt.datumCode === 'ch1903+') {
      wkt.datumCode = 'ch1903';
    }
    if (~wkt.datumCode.indexOf('israel')) {
      wkt.datumCode = 'isr93';
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }

  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function(a) {
    return rename(wkt, a);
  };
  var list = [
    ['standard_parallel_1', 'Standard_Parallel_1'],
    ['standard_parallel_2', 'Standard_Parallel_2'],
    ['false_easting', 'False_Easting'],
    ['false_northing', 'False_Northing'],
    ['central_meridian', 'Central_Meridian'],
    ['latitude_of_origin', 'Latitude_Of_Origin'],
    ['latitude_of_origin', 'Central_Parallel'],
    ['scale_factor', 'Scale_Factor'],
    ['k0', 'scale_factor'],
    ['latitude_of_center', 'Latitude_Of_Center'],
    ['latitude_of_center', 'Latitude_of_center'],
    ['lat0', 'latitude_of_center', d2r],
    ['longitude_of_center', 'Longitude_Of_Center'],
    ['longitude_of_center', 'Longitude_of_center'],
    ['longc', 'longitude_of_center', d2r],
    ['x0', 'false_easting', toMeter],
    ['y0', 'false_northing', toMeter],
    ['long0', 'central_meridian', d2r],
    ['lat0', 'latitude_of_origin', d2r],
    ['lat0', 'standard_parallel_1', d2r],
    ['lat1', 'standard_parallel_1', d2r],
    ['lat2', 'standard_parallel_2', d2r],
    ['azimuth', 'Azimuth'],
    ['alpha', 'azimuth', d2r],
    ['srsCode', 'name']
  ];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
  }
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(wkt) {
  var lisp = (0,_parser__WEBPACK_IMPORTED_MODULE_0__.default)(wkt);
  var type = lisp.shift();
  var name = lisp.shift();
  lisp.unshift(['name', name]);
  lisp.unshift(['type', type]);
  var obj = {};
  (0,_process__WEBPACK_IMPORTED_MODULE_1__.sExpr)(lisp, obj);
  cleanWKT(obj);
  return obj;
}


/***/ }),

/***/ "../../node_modules/wkt-parser/parser.js":
/*!***********************************************!*\
  !*** ../../node_modules/wkt-parser/parser.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseString);

var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
// const ignoredChar = /[\s_\-\/\(\)]/g;
function Parser(text) {
  if (typeof text !== 'string') {
    throw new Error('not a string');
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function() {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char)
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function(char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function(char) {
  if (char === ',') {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === ']') {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }

    return;
  }
};
Parser.prototype.number = function(char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function(char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function(char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === '[') {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function(char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = '';
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function() {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
};

function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}


/***/ }),

/***/ "../../node_modules/wkt-parser/process.js":
/*!************************************************!*\
  !*** ../../node_modules/wkt-parser/process.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sExpr": () => (/* binding */ sExpr)
/* harmony export */ });


function mapit(obj, key, value) {
  if (Array.isArray(key)) {
    value.unshift(key);
    key = null;
  }
  var thing = key ? {} : obj;

  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj
  }, thing);
  if (key) {
    obj[key] = out;
  }
}

function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key = v.shift();
  if (key === 'PARAMETER') {
    key = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key] = {};
      sExpr(v[0], obj[key]);
      return;
    }
    obj[key] = v[0];
    return;
  }
  if (!v.length) {
    obj[key] = true;
    return;
  }
  if (key === 'TOWGS84') {
    obj[key] = v;
    return;
  }
  if (key === 'AXIS') {
    if (!(key in obj)) {
      obj[key] = [];
    }
    obj[key].push(v);
    return;
  }
  if (!Array.isArray(key)) {
    obj[key] = {};
  }

  var i;
  switch (key) {
    case 'UNIT':
    case 'PRIMEM':
    case 'VERT_DATUM':
      obj[key] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key]);
      }
      return;
    case 'SPHEROID':
    case 'ELLIPSOID':
      obj[key] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key]);
      }
      return;
    case 'PROJECTEDCRS':
    case 'PROJCRS':
    case 'GEOGCS':
    case 'GEOCCS':
    case 'PROJCS':
    case 'LOCAL_CS':
    case 'GEODCRS':
    case 'GEODETICCRS':
    case 'GEODETICDATUM':
    case 'EDATUM':
    case 'ENGINEERINGDATUM':
    case 'VERT_CS':
    case 'VERTCRS':
    case 'VERTICALCRS':
    case 'COMPD_CS':
    case 'COMPOUNDCRS':
    case 'ENGINEERINGCRS':
    case 'ENGCRS':
    case 'FITTED_CS':
    case 'LOCAL_DATUM':
    case 'DATUM':
      v[0] = ['name', v[0]];
      mapit(obj, key, v);
      return;
    default:
      i = -1;
      while (++i < v.length) {
        if (!Array.isArray(v[i])) {
          return sExpr(v, obj[key]);
        }
      }
      return mapit(obj, key, v);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_ddd_viewer_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/ddd-viewer.esm */ "../../dist/ddd-viewer.esm.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/main.css */ "./styles/main.css");



function initViewer() {
  var dddConfig = {
    "productionTip": false,
    "tileUrlBase": "https://3dsmaps.com/cache/ddd_http/",
    "showDevelLinks": true,
    "analyticsTag": null,
    "sceneGroundLayers": {},
    "sceneMaterials": [{
      "value": "defaultsplat256",
      "text": "Default Set and Splatmaps (256x256)",
      "textures": "default256",
      "splatmap": 256
    }, {
      "value": "defaultsplat512",
      "text": "Default Set and Splatmaps (512x512)",
      "textures": "default512",
      "splatmap": 512
    }, {
      "value": "default256",
      "text": "Default Set (256x256)",
      "textures": "default256",
      "splatmap": null
    }, {
      "value": "default512",
      "text": "Default Set (512x512)",
      "textures": "default512",
      "splatmap": null
    }, {
      "value": "minimal",
      "text": "Minimal Set",
      "textures": "minimal",
      "splatmap": null
    }, {
      "value": null,
      "text": "None",
      "textures": null,
      "splatmap": null
    }],
    "defaultCoords": [-8.723, 42.238],
    "dddHttpApiUrlBase": "https://{{hostname}}:8000/api/",
    "geolocation": false
  };
  var canvas = document.getElementById("ddd-scene");
  var viewerState = new _dist_ddd_viewer_esm__WEBPACK_IMPORTED_MODULE_0__.default.ViewerState(); // this.getViewerState();

  viewerState.positionWGS84 = [-8.723, 42.238, 0];
  viewerState.dddConfig = dddConfig;
  var sceneViewer = new _dist_ddd_viewer_esm__WEBPACK_IMPORTED_MODULE_0__.default.SceneViewer(canvas, viewerState);
  var layerDddOsm3d = new _dist_ddd_viewer_esm__WEBPACK_IMPORTED_MODULE_0__.default.GeoTile3DLayer();
  sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);
}

window.addEventListener("load", function () {
  initViewer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map