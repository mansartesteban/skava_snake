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
import MoveUpSwipe from "./Commands/MoveUpSwipe";
import MoveLeftSwipe from "./Commands/ChangeDirection";
import MoveDownSwipe from "./Commands/MoveDownSwipe";
import MoveRightSwipe from "./Commands/MoveRightSwipe";
import ChangeDirection from "./Commands/ChangeDirection";
import Card from "@/Engine/UI/UIComponents/Card/Card";
import UIManager from "@/Engine/UI/Core/UIManager";
import Div from "@/Engine/UI/UIComponents/Div/Div";
import UIStyle from "@/Engine/UI/Core/UIStyle";
import Button from "@/Engine/UI/UIComponents/Button/Button";
import Label from "@/Engine/UI/UIComponents/Label/Label";

class SnakeScene extends Scene {
  snake;
  worldManager;

  lastUpdate = 0;

  commands = {};

  setup() {
    this.map = new Map({
      size: Math.min(window.innerWidth / 1.1, 600),
      subdivisions: 12,
    });
    this.map.createTiles();
    this.worldManager = new WorldManager(this.map);

    this.viewer.center();
    this.controls = new Controls();
    this.start();

    this.worldManager.add("food-handler", new FoodFeeder(this));
  }

  attachControls(entity) {
    this.commands.moveup = this.controls.registerCommand(new MoveUp(entity));
    this.commands.moveLeft = this.controls.registerCommand(
      new MoveLeft(entity)
    );
    this.commands.moveDown = this.controls.registerCommand(
      new MoveDown(entity)
    );
    this.commands.moveRight = this.controls.registerCommand(
      new MoveRight(entity)
    );
    this.commands.changeDirection = this.controls.registerCommand(
      new ChangeDirection(entity)
    );
    this.commands.eat = this.controls.registerCommand(new Eat(entity));
    this.commands.stop = this.controls.registerCommand(new Stop(entity));
  }

  start() {
    this.snake = new Snake();

    this.snake.addComponent(
      new SnakeOptions({
        color: new RGB(0x2e, 0x7c, 0xf6),
        size: this.map.tileSize * 0.75,
        position: new Vector2(0, -1),
      })
    );

    this.attachControls(this.snake);

    this.add(this.snake);
  }

  restart() {
    Object.keys(this.commands).forEach((cmd) =>
      this.controls.unregisterCommand(this.commands[cmd])
    );
    this.uiManager.clean();
    this.remove(this.snake);
    this.start();
  }

  gameOver() {
    this.uiManager = new UIManager(this);
    this.uiManager.mainLayout.setStyle({
      align: "center",
    });
    let gameOverScreen = new Card(
      new UIStyle({
        margin: [150, 0, 0, 0],
        height: "40%",
        width: "80%",
        color: new RGB(255, 255, 255, 1),
        shadowColor: new RGB(0, 0, 0, 0.5),
        shadowBlur: "32",
      })
    );

    // #shadowColor;
    // #shadowBlur;
    // #shadowPosition;
    // #shadowSize;
    let gameOverTitleContainer = new Div(
      new UIStyle({
        height: 20,
      })
    );
    let gameOverTitle = new Label(
      new UIStyle({
        color: RGB.Black,
      })
    );
    let gameOverScore = new Label(
      new UIStyle({
        margin: [20, 0],
        color: RGB.Black,
      })
    );
    gameOverTitle.setText("Game Over !");
    gameOverScore.setText("Score : " + this.snake.food);

    Object.keys(this.commands).forEach((command) =>
      this.controls.unregisterCommand(this.commands[command])
    );

    let retryLabel = new Label(new UIStyle({}));
    retryLabel.setText("Rejouer");
    let retryButton = new Button(
      new UIStyle({
        borderRadius: 999,
        height: 48,
        width: 240,
        margin: [64, 0, 0, 0],
        color: RGB.Red,
      })
    );
    gameOverTitleContainer.addChild(gameOverTitle);
    gameOverTitleContainer.addChild(gameOverScore);
    gameOverScreen.addChild(gameOverTitleContainer);
    gameOverScreen.addChild(retryButton);
    retryButton.addChild(retryLabel);

    retryButton.addEventListener("click", (e) => {
      this.restart();
    });

    this.uiManager.mainLayout.addChild(gameOverScreen);
  }

  loop(deltaTime, currentTime) {
    this.map.draw(this.viewer);
    let now = performance.now();
    this.controls.update(deltaTime);
  }
}

export default SnakeScene;
