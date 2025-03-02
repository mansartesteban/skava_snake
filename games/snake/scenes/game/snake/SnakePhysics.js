import Component from "@/engine/Component";
import Vector2 from "@/engine/lib/Vector2";

class SnakePhysics extends Component {
  nextPosition;
  nextDirection = null;
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
      this.directionStack = this.directionStack.slice(0, 1);
      this.directionStack.push(direction);
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
    this.entity.speed = 8;
  }

  getNextPosition() {
    this.entity.positions[0].lastPosition = this.entity.positions[0].position;
    this.entity.positions[0].position = this.entity.positions[0].nextPosition;
    this.entity.positions[0].nextPosition = this.nextPosition;
    this.entity.positions[0].nextDirection = this.nextDirection;
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

    if (this.entity.positions[i].position.x < xMin) {
      newPosition = {
        position: new Vector2(xMax, this.entity.positions[i].position.y),
        direction: this.entity.positions[i].direction,
        nextDirection: this.entity.positions[i].nextDirection,
        nextPosition: new Vector2(
          xMax,
          this.entity.positions[i].nextPosition.y
        ),
        lastPosition: new Vector2(
          xMax,
          this.entity.positions[i].lastPosition.y
        ),
      };
    }

    if (this.entity.positions[i].position.x > xMax) {
      newPosition = {
        position: new Vector2(xMin, this.entity.positions[i].position.y),
        direction: this.entity.positions[i].direction,
        nextDirection: this.entity.positions[i].nextDirection,
        nextPosition: new Vector2(
          xMin,
          this.entity.positions[i].nextPosition.y
        ),
        lastPosition: new Vector2(
          xMin,
          this.entity.positions[i].lastPosition.y
        ),
      };
    }

    if (this.entity.positions[i].position.y < yMin) {
      newPosition = {
        position: new Vector2(this.entity.positions[i].position.x, yMax),
        direction: this.entity.positions[i].direction,
        nextDirection: this.entity.positions[i].nextDirection,
        nextPosition: new Vector2(
          this.entity.positions[i].nextPosition.x,
          yMax
        ),
        lastPosition: new Vector2(
          this.entity.positions[i].lastPosition.x,
          yMax
        ),
      };
    }

    if (this.entity.positions[i].position.y > yMax) {
      newPosition = {
        position: new Vector2(this.entity.positions[i].position.x, yMin),
        direction: this.entity.positions[i].direction,
        nextDirection: this.entity.positions[i].nextDirection,
        nextPosition: new Vector2(
          this.entity.positions[i].nextPosition.x,
          yMin
        ),
        lastPosition: new Vector2(
          this.entity.positions[i].lastPosition.x,
          yMin
        ),
      };
    }
    return newPosition;
  }

  loop(deltaTime, currentTime) {
    if (currentTime - this.lastUpdate > 1000 / this.entity.speed) {
      this.setNextPosition(this.nextDirection);
      this.lastUpdate = currentTime;

      let checks = [];
      this.entity.positions.forEach((position, i) => {
        checks[i] = this.checkBorders(i);
        if (!checks[i]) {
          if (i > 0) {
            this.entity.positions[i].lastPosition =
              this.entity.positions[i].position.clone();
            this.entity.positions[i].position =
              this.entity.positions[i].nextPosition.clone();
            this.entity.positions[i].nextPosition =
              this.entity.positions[i - 1].position.clone();
            this.entity.positions[i].nextDirection =
              this.entity.positions[i - 1].direction.clone();
          } else {
            this.getNextPosition();
          }
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
