import Scene from "@/engine/Scene";
import Snake from "./snake/Snake";
import SnakeRender from "./snake/SnakeRender";
import Controls from "@/engine/Controls";
import MoveUp from "./commands/MoveUp";
import MoveDown from "./commands/MoveDown";
import MoveLeft from "./commands/MoveLeft";
import MoveRight from "./commands/MoveRight";
import WorldManager from "./WorldManager";
import SnakeOptions from "./snake/SnakeOptions";
import Vector2 from "@/engine/lib/Vector2";
import Eat from "./commands/Eat";
import RGB from "@/engine/lib/RGB";
import Map from "./Map"
import FoodFeeder from "./foods/FoodFeeder"
import EyeRender from "./snake/EyeRender"
import Stop from "./commands/Stop"

class SnakeScene extends Scene {
  snake;
  worldManager;

  lastUpdate = 0;

  setup() {
    this.map = new Map({
      size: 800,
      subdivisions: 20,
    });
    this.map.createTiles()
    this.worldManager = new WorldManager(this.map);
    
    this.snake = new Snake(
        new SnakeOptions({
            size: this.map.tileSize, 
            color: new RGB(0x2e, 0x7c, 0xf6),
        }),
        new SnakeRender(),
        new EyeRender()
    );
    this.add(this.snake);
    
    this.worldManager.add("food-handler", new FoodFeeder(this))

    // this.snake.transform.position = new Vector2(1, 0)
    this.worldManager.get("food-handler").activeFood.transform.position = new Vector2(2, 0)


    this.controls = new Controls();
    this.controls.registerCommand("KeyW", new MoveUp(this.snake));
    this.controls.registerCommand("KeyA", new MoveLeft(this.snake));
    this.controls.registerCommand("KeyS", new MoveDown(this.snake));
    this.controls.registerCommand("KeyD", new MoveRight(this.snake));
    this.controls.registerCommand("Space", new Eat(this.snake));
    this.controls.registerCommand("KeyE", new Stop(this.snake));
  }

  loop(deltaTime, currentTime) {
    this.map.draw(this.viewer)
    let now = performance.now();
    this.controls.update(deltaTime);
  }
}

export default SnakeScene;
