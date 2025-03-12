import Project from "@/Engine/Project";
import SnakeScene from "@snake/Scenes/Game/SnakeScene";

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
