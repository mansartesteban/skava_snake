// Engine imports
import { Project } from "skava-engine/Core";

// Project imports
import SnakeScene from "./Scenes/Game/SnakeScene.js";

class Snake extends Project {
  constructor() {
    super();
  }

  setup() {
    let scene = new SnakeScene();
    this.addScene(scene);
    // let mainMenu = new MainMenu();
    // this.addScene(mainMenu);
  }

  loop(tick) {}
}

export default Snake;
