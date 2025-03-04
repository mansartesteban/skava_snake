import Render2DComponent from "@/Engine/Components/Render2dComponent";
import Line from "@/Engine/Shapes/Line";
import RGB from "@/Engine/Lib/RGB";
import MultiLine from "@/Engine/Shapes/MultiLine";
import DebugVector from "@/Engine/Shapes/DebugVector";
import Vector2 from "@/Engine/Lib/Vector2";
import EyeRender from "./EyeRender";
import { lerp } from "@/Engine/Lib/Numeric";

class SnakeRender extends Render2DComponent {
  color = RGB.Red;
  bodies = [];

  points = [];

  headDirection = new DebugVector();
  lastUpdate = 0;

  setup() {}

  normalize(index, arrayLength, min = 0.8, max = 1) {
    if (arrayLength <= 1) return max; // Évite la division par zéro
    return min + (index / (arrayLength - 1)) * (max - min);
  }

  linear() {}

  render(viewer, deltaTime, currentTime) {
    let animationProgress =
      ((currentTime - this.lastUpdate) / 1000) * this.entity.speed;
    animationProgress = animationProgress ** 1;

    if (currentTime - this.lastUpdate > 1000 / this.entity.speed) {
      this.lastUpdate = currentTime;
    }

    while (this.bodies.length < this.entity.positions.length) {
      this.bodies.push(
        new Line(
          this.entity.positions[
            this.entity.positions.length - 1
          ].position.clone(),
          this.entity.positions[
            this.entity.positions.length - 1
          ].nextPosition.clone(),
          this.entity.options.color,
          this.entity.options.size,
          [],
          {
            shadowColor: new RGB(0, 0, 0, 0.33),
            shadowBlur: 6,
          }
        )
      );
    }

    for (let j = 0; j < this.bodies.length; j++) {
      let i =this.bodies.length - 1 - j
      let body = this.bodies[i];

      body.thickness = lerp(
        this.entity.options.size,
        this.entity.options.size / 2,
        i / this.bodies.length
      );

      if (body && this.entity.positions[i]) {
        body.from = this.entity.positions[i].lastPosition
          .clone()
          .lerp(this.entity.positions[i].position, animationProgress)
          .multiply(this.entity.scene.worldManager.map.tileSize)
          .add(this.entity.scene.worldManager.map.tileSize / 2);

        body.to = this.entity.positions[i].nextPosition
          .clone()
          .lerp(this.entity.positions[i].position, 1 - animationProgress)
          .multiply(this.entity.scene.worldManager.map.tileSize)
          .add(this.entity.scene.worldManager.map.tileSize / 2);
        body.color = this.entity.options.color
          .clone()
          .multiply(1 - i / this.bodies.length);
      }
      body.draw(viewer);
    }

    let normalized = this.bodies[0].to.clone().sub(this.bodies[0].from);
    let directionVector = this.bodies[0].to.clone().add(normalized);

    let eyeRender = this.entity.getComponent(EyeRender);
    eyeRender.position = this.bodies[0].to;
    eyeRender.direction = directionVector;
  }
}

export default SnakeRender;
