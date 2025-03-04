import Observer from "@/Engine/Observer";
import Scene from "./Scene";
import ImplementError from "@/Application/errors/ImplementError";

const Events = {
  INITIALIZED: "INITIALIZED",
};

class Project {
  scenes = [];
  options = {
    name: "Skava - Snake",
    mountOn: "#app",
    isDev: false
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
      scene.setupFinished = true
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
    // TODO Instead of looping over engine loop and potentially execute some objects which are not set-up
    // execute scene if scene "isReady"
    // AH bah apparement c'est déjà ce que je fais ... je suis un boss :p
    this.scenes.forEach((scene) => scene.update(deltaTime, currentTime));
    this.loop(deltaTime, currentTime);
  }
  loop(deltaTime,currentTime) {}
}

export default Project;
