import Scene from "@/Engine/Scene";
import Snake from "./Snake/Snake";
import SnakeRender from "./Snake/SnakeRender";
import Controls from "@/Engine/Controls";
import MoveUp from "./Commands/MoveUp";
import MoveDown from "./Commands/MoveDown";
import MoveLeft from "./Commands/MoveLeft";
import MoveRight from "./Commands/MoveRight";
import WorldManager from "./WorldManager";
import SnakeOptions from "./Snake/SnakeOptions";
import Vector2 from "@/Engine/Lib/Vector2";
import Eat from "./Commands/Eat";
import RGB from "@/Engine/Lib/RGB";
import Map from "./Map";
import FoodFeeder from "./Foods/FoodFeeder";
import EyeRender from "./Snake/EyeRender";
import Stop from "./Commands/Stop";

class SnakeScene extends Scene {
  snake;
  worldManager;

  lastUpdate = 0;

  setup() {
    this.map = new Map({
      size: 640,
      subdivisions: 12,
    });
    this.map.createTiles();
    this.worldManager = new WorldManager(this.map);

    this.viewer.center()
    this.snake = new Snake();

    this.snake.addComponent(
      new SnakeOptions({
        color: new RGB(0x2e, 0x7c, 0xf6),
        size: this.map.tileSize * 0.75,
        position: new Vector2(0, -1),
      })
    );

    // this.snake2 = new Snake();
    // this.snake2.addComponent(
    //   new SnakeOptions({
    //     color: new RGB(0xde, 0x7c, 0xf6),
    //     size: this.map.tileSize * 0.75,
    //     position: new Vector2(0, 1),
    //   })
    // );

    // this.snake3 = new Snake();
    // this.snake3.addComponent(
    //   new SnakeOptions({
    //     color: new RGB(0x5e, 0xec, 0xf6),
    //     size: this.map.tileSize * 0.75,
    //     position: new Vector2(0, -3),
    //   })
    // );

    // this.snake4 = new Snake();
    // this.snake4.addComponent(
    //   new SnakeOptions({
    //     color: new RGB(0xde, 0x2c, 0x56),
    //     size: this.map.tileSize * 0.75,
    //     position: new Vector2(0, 3),
    //   })
    // );

    this.add(this.snake);
    // this.add(this.snake2);
    // this.add(this.snake3);
    // this.add(this.snake4);

    this.worldManager.add("food-handler", new FoodFeeder(this));

    this.controls = new Controls();
    this.controls.registerCommand(new MoveUp(this.snake).trigger("KeyW"));
    this.controls.registerCommand(new MoveLeft(this.snake).trigger("KeyA"));
    this.controls.registerCommand(new MoveDown(this.snake).trigger("KeyS"));
    this.controls.registerCommand(new MoveRight(this.snake).trigger("KeyD"));

    // this.controls.registerCommand("KeyT", new MoveUp(this.snake3));
    // this.controls.registerCommand("KeyF", new MoveLeft(this.snake3));
    // this.controls.registerCommand("KeyG", new MoveDown(this.snake3));
    // this.controls.registerCommand("KeyH", new MoveRight(this.snake3));

    // this.controls.registerCommand("KeyI", new MoveUp(this.snake2));
    // this.controls.registerCommand("KeyJ", new MoveLeft(this.snake2));
    // this.controls.registerCommand("KeyK", new MoveDown(this.snake2));
    // this.controls.registerCommand("KeyL", new MoveRight(this.snake2));

    // this.controls.registerCommand("ArrowUp", new MoveUp(this.snake4));
    // this.controls.registerCommand("ArrowLeft", new MoveLeft(this.snake4));
    // this.controls.registerCommand("ArrowDown", new MoveDown(this.snake4));
    // this.controls.registerCommand("ArrowRight", new MoveRight(this.snake4));

    this.controls.registerCommand("Space", new Eat(this.snake));
    // this.controls.registerCommand("Space", new Eat(this.snake2));

    this.controls.registerCommand("KeyE", new Stop(this.snake));
    // this.controls.registerCommand("KeyE", new Stop(this.snake2));
  }

  loop(deltaTime, currentTime) {
    this.map.draw(this.viewer);
    let now = performance.now();
    this.controls.update(deltaTime);
  }
}

export default SnakeScene;
