import EntityManager from "./EntityManager";
import Vector2 from "./lib/Vector2"
import Viewer2d from "./Viewers/Viewer2d"

class Scene {
  setupFinished = false;

  threeScne;
  name = "";
  entityManager = null;
  viewer;
  #loopHasBeenWarned = false;

  constructor(name) {
    this.name = name;
    this.entityManager = new EntityManager(this);
  }

  createViewer(mountOn, options) {
    let app = document.querySelector(mountOn);
    this.viewer = new Viewer2d(app, {
      size: new Vector2(window.innerWidth, window.innerHeight),
      ...options
    });

    // this.viewer.cameraManager.addCamera("dev", this.createDefaultCamera());
    // this.viewer.cameraManager.activateCamera("dev")
  }
  
  // createDefaultCamera() {
  //   let camera = new PerspectiveCamera(
  //     80,
  //     this.viewer.width / this.viewer.height,
  //     0.1,
  //     100000
  //   );

  //   camera.position.x = 0;
  //   camera.position.y = 100000;
  //   camera.position.z = 0;
  //   camera.lookAt(new Vector3());

  //   this.axisHelper?.render(this.viewer.renderer)
  //   this.axisHelper = new ViewHelper( camera, this.viewer.renderer.domElement );
    
  //   return camera
  // }

  add(entity) {
    entity.scene = this
    this.entityManager.add(entity);
  }

  remove(entityToDelete) {
    this.entityManager.delete(entityToDelete)
  }

  update(deltaTime, currentTime) {
    if (this.setupFinished) {
      this.viewer?.refresh(deltaTime);
      this.loop(deltaTime, currentTime);
      this.entityManager.update(deltaTime, currentTime);
    }
  }

  setup() {
    console.warn(
      `"setup()" method is not implemented on the scene ${this.constructor.name}`
    );
  }
  loop(deltaTime, currentTime) {
    if (!this.#loopHasBeenWarned) {
      this.#loopHasBeenWarned = true;
      console.warn(
        `"loop()" method is not implemented on the scene ${this.constructor.name}`
      );
    }
  }
}

export default Scene;
