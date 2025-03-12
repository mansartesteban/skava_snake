import Project from "@/Engine/Project";
import SnakeScene from "./Scenes/Game/SnakeScene";
import MainMenu from "./Scenes/MainMenu/MainMenu";

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
