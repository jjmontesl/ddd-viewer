
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';


export default class {

    constructor(sceneViewer) {

        this.sceneViewer = sceneViewer;

        this.queue = [];

        this.current = [];

        this.concurrentTasks = 2;  // 1 on mobile? 2 on PC?

    }

    update() {
        //loadNext();
    }

    processNext() {
        if (this.queue.length < 1) {
            return;
        }

        let task = this.queue.pop();
        this.processTask(task);
    }

    enqueueLoadModel(url, onSuccess, onFailure) {
        this.queue.push({'url': url, 'onSuccess': onSuccess, 'onFailure': onFailure});
        if (this.current.length < this.concurrentTasks) {
            this.processNext();
        }
    }

    processTask(task) {
        let url = task['url'];
        let that = this;
        BABYLON.SceneLoader.ImportMesh(null, '', url, this.sceneViewer.scene,
            function(newMeshes, particleSystems, skeletons) {
                that.processNext();
                task.onSuccess(newMeshes, particleSystems, skeletons);
            },
            function() {
            },
            function(scene, msg, ex) {
                task.onFailure(scene, msg, ex);
                that.processNext();
            }
        );
    }

    //loadResource() {
    //}

}

