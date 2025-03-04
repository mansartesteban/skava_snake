import Component from "@/Engine/Component";
import RGB from "@/Engine/Lib/RGB";
import Vector2 from "@/Engine/Lib/Vector2";
import Circle from "@/Engine/Shapes/Circle";

class SnakePhysics extends Component {
  nextPosition;
  nextDirection = null;
  newChildren = 0;
  hasPlayerChangedDirection = false;
  directionStack = [];
  hasReached = false;

  lastUpdate = 0;

  setup() {
    this.nextPosition = this.entity.positions[0].nextPosition.clone();
    this.nextDirection = this.entity.positions[0].direction;
  }

  changeDirection(direction) {
    if (this.entity.speed === 0) {
      this.setNextPosition(direction);
    } else {
      let nextDirection = this.directionStack[0] || this.nextDirection
      if (
        !(
          (direction.x === 0 && nextDirection.x === 0) ||
          (direction.y === 0 && nextDirection.y === 0)
        )
      ) {
        this.directionStack = this.directionStack.slice(0, 1);
        this.directionStack.push(direction);
      }
    }
  }

  setNextPosition(direction) {
    if (this.directionStack.length > 0) {
      direction = this.directionStack.shift();
    }
    this.nextPosition = this.entity.positions[0].nextPosition
      .clone()
      .add(direction);
    let isNextPositionValid = true;
    if (isNextPositionValid) {
      this.nextDirection = direction;
    }

    this.entity.speed = 6;
  }

  getNextPosition(i) {
    this.entity.positions[i].lastPosition = this.entity.positions[i].position;
    this.entity.positions[i].position = this.entity.positions[i].nextPosition;

    if (i === 0) {
      this.entity.positions[i].nextPosition = this.nextPosition;
      this.entity.positions[i].direction = this.nextDirection;
    } else {
      this.entity.positions[i].direction =
        this.entity.positions[i - 1].direction;
      this.entity.positions[i].nextPosition = this.entity.positions[
        i - 1
      ].position
        .clone()
        .add(this.entity.positions[i].direction);
    }
  }

  checkBorders(i) {
    let xMin =
      this.entity.scene.worldManager.map.xMin /
      this.entity.scene.worldManager.map.tileSize;
    let xMax =
      this.entity.scene.worldManager.map.xMax /
      this.entity.scene.worldManager.map.tileSize;
    let yMin =
      this.entity.scene.worldManager.map.yMin /
      this.entity.scene.worldManager.map.tileSize;
    let yMax =
      this.entity.scene.worldManager.map.yMax /
      this.entity.scene.worldManager.map.tileSize;

    let newPosition = null;

    if (
      this.entity.positions[i].position.x <= xMin &&
      this.entity.positions[i].nextPosition.x < xMin
    ) {
      newPosition = {
        position: new Vector2(xMax + 1, this.entity.positions[i].position.y),
        direction: this.entity.positions[i].direction,
        nextPosition: new Vector2(
          xMax + 1,
          this.entity.positions[i].nextPosition.y
        ).add(this.entity.positions[i].direction),
        lastPosition: new Vector2(
          xMax + 1,
          this.entity.positions[i].lastPosition.y
        ).sub(this.entity.positions[i].direction),
      };
    }

    if (
      this.entity.positions[i].position.x >= xMax - 1 &&
      this.entity.positions[i].nextPosition.x > xMax
    ) {
      newPosition = {
        position: new Vector2(xMin - 1, this.entity.positions[i].position.y),
        direction: this.entity.positions[i].direction,
        nextPosition: new Vector2(
          xMin - 1,
          this.entity.positions[i].nextPosition.y
        ).add(this.entity.positions[i].direction),
        lastPosition: new Vector2(
          xMin - 1,
          this.entity.positions[i].lastPosition.y
        ).sub(this.entity.positions[i].direction),
      };
    }

    if (
      this.entity.positions[i].position.y <= yMin &&
      this.entity.positions[i].nextPosition.y < yMin
    ) {
      newPosition = {
        position: new Vector2(this.entity.positions[i].position.x, yMax + 1),
        direction: this.entity.positions[i].direction,
        nextPosition: new Vector2(
          this.entity.positions[i].nextPosition.x,
          yMax + 1
        ).add(this.entity.positions[i].direction),
        lastPosition: new Vector2(
          this.entity.positions[i].lastPosition.x,
          yMax + 1
        ).sub(this.entity.positions[i].direction),
      };
    }

    if (
      this.entity.positions[i].position.y >= yMax - 1 &&
      this.entity.positions[i].nextPosition.y > yMax
    ) {
      newPosition = {
        position: new Vector2(this.entity.positions[i].position.x, yMin - 1),
        direction: this.entity.positions[i].direction,
        nextPosition: new Vector2(
          this.entity.positions[i].nextPosition.x,
          yMin - 1
        ).add(this.entity.positions[i].direction),
        lastPosition: new Vector2(
          this.entity.positions[i].lastPosition.x,
          yMin - 1
        ).sub(this.entity.positions[i].direction),
      };
    }

    return newPosition;
  }

  isTouching() {
    return this.entity.positions.slice(1).some(({ position }) => {
      let head = this.entity.positions[0].position;
      return head.x === position.x && head.y === position.y;
    });
  }

  addTail() {
    let last = this.entity.positions[this.entity.positions.length - 1];
    this.entity.positions.push({
      nextPosition: last.nextPosition,
      direction: last.direction,
      position: last.position,
      lastPosition: last.position,
    });
  }

  loop(deltaTime, currentTime) {
    if (currentTime - this.lastUpdate > 1000 / this.entity.speed) {
      if (this.isTouching()) { 
        console.info("Game over");
      }

      if (
        this.entity.positions.length <
        this.entity.food + this.entity.initialLength
      ) {
        this.addTail();
      }

      this.setNextPosition(this.nextDirection);
      this.lastUpdate = currentTime;

      let checks = [];
      this.entity.positions.forEach((position, i) => {
        i = this.entity.positions.length - 1 - i;
        checks[i] = this.checkBorders(i);
        if (!checks[i]) {
          this.getNextPosition(i);
        }
      });

      for (let i = 0; i < checks.length; i++) {
        if (checks[i]) {
          this.entity.positions[i] = checks[i];
        }
      }
      this.hasPlayerChangedDirection = false;
    }
  }
}

export default SnakePhysics;
