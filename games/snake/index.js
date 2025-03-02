import Project from "@/engine/Project"
import SnakeScene from "./scenes/game/SnakeScene"

class Snake extends Project {
    constructor() {
      super();
    }
  
    setup() { 
      let scene = new SnakeScene();
      this.addScene(scene);
    }
  
    loop(tick) {}
  }
  
  export default Snake;
  