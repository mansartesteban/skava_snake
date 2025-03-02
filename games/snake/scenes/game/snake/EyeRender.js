import Render2DComponent from "@/engine/components/Render2dComponent";
import RGB from "@/engine/lib/RGB";
import Rotation from "@/engine/lib/Rotation"
import Vector2 from "@/engine/lib/Vector2";
import Circle from "@/engine/shapes/Circle";
import Line from "@/engine/shapes/Line"

class EyeRender extends Render2DComponent {
  position = new Vector2();

  direction = new Vector2()
  eyeOffset = 0;

  line = new Line(null, null, RGB.Yellow, 5)
  line2 = new Line(null, null, RGB.Fuchsia, 10)
  size;

  setup() {
    this.size = this.entity.scene.worldManager.map.tileSize / 3.5
    this.eyeOffset = this.entity.scene.worldManager.map.tileSize / 2.5
  }

  getNormal(from, to) {
    let direction = to.clone().sub(from); // Vecteur directeur
    return new Vector2(-direction.y, direction.x).normalize(); // Normale perpendiculaire
}

  render(viewer) {
    const normal = this.getNormal(this.position, this.direction);
    const leftEye = this.position.clone().add(normal.clone().multiply(this.eyeOffset));
    const rightEye = this.position.clone().add(normal.clone().multiply(-this.eyeOffset));
    

    let circles = [];
    circles.push(new Circle(leftEye, this.size * 1.25, this.entity.options.color));
    circles.push(new Circle(leftEye, this.size, RGB.White));
    circles.push(new Circle(leftEye, this.size * 2.5/5, RGB.Black));
    circles.push(
      new Circle(leftEye.clone().add(new Vector2(this.size/4, -this.size/4)), this.size/4, RGB.White)
    );
    circles.push(new Circle(rightEye, this.size * 1.25, this.entity.options.color));
    circles.push(new Circle(rightEye, this.size, RGB.White));
    circles.push(new Circle(rightEye, this.size * 2.5/5, RGB.Black));
    circles.push(
      new Circle(rightEye.clone().add(new Vector2(this.size/4, -this.size/4)), this.size/4, RGB.White)
    );

    circles.forEach((circle) => {
        circle.draw(viewer)
    });
  }

}

export default EyeRender;