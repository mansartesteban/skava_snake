import Observer from "@/Engine/Observer";
import Scene from "./Scene";
import ImplementError from "@/Application/Errors/ImplementError";

const Events = {
  INITIALIZED: "INITIALIZED",
};

class Project {
  scenes = [];
  options = {
    name: "Skava - Snake",
    mountOn: "#app",
    isDev: false,
  };
  loopCallback;
  observer;

  constructor(options) {
    this.options = { ...this.options, ...options };
    this.observer = new Observer(Object.keys(Events));
    setTimeout(this.setup.bind(this), 0);
  }

  addScene(scene, options) {
    scene.createViewer(this.options.mountOn);
    Promise.resolve(scene.setup()).then(() => {
      scene.setupFinished = true;
    });
    this.scenes.push(scene);
  }

  getScene(sceneName) {
    return this.scenes.find((scene) => scene.name === sceneName);
  }

  setup() {
    throw new ImplementError("setup", "Project");
  }

  update(deltaTime, currentTime) {
    this.scenes.forEach((scene) => scene.update(deltaTime, currentTime));
    this.loop(deltaTime, currentTime);
  }
  loop(deltaTime, currentTime) {}
}

export default Project;
