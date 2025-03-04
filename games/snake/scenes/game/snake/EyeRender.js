import Render2DComponent from "@/Engine/Components/Render2dComponent";
import RGB from "@/Engine/Lib/RGB";
import Vector2 from "@/Engine/Lib/Vector2";
import Circle from "@/Engine/Shapes/Circle";
import Line from "@/Engine/Shapes/Line";

class EyeRender extends Render2DComponent {
  position = new Vector2();

  direction = new Vector2();
  eyeOffset = 0;

  line = new Line(null, null, RGB.Yellow, 5);
  line2 = new Line(null, null, RGB.Fuchsia, 10);
  size;

  setup() {
    this.size = this.entity.options.size / 3.5;
    this.eyeOffset = this.entity.options.size / 2.5;
  }

  getNormal(from, to) {
    let direction = to.clone().sub(from); // Vecteur directeur
    return new Vector2(-direction.y, direction.x).normalize(); // Normale perpendiculaire
  }

  getFoodPosition() {
    let foodFeeder = this.entity.scene.worldManager.get("food-handler");
    return foodFeeder.activeFood.transform.position.clone()
  }

  render(viewer) {
    const normal = this.getNormal(this.position, this.direction);
    const leftEye = this.position
      .clone()
      .add(normal.clone().multiply(this.eyeOffset));
    const rightEye = this.position
      .clone()
      .add(normal.clone().multiply(-this.eyeOffset));
    const origin = viewer.options.size.clone().divide(2);

    let foodPosition = this.getFoodPosition();
    let eyeTarget = foodPosition
    // let eyeTarget = this.entity.scene.controls.mouse.clone().sub(origin)

    let circles = [];
    circles.push(
      new Circle(
        leftEye,
        this.size * 1.25,
        this.entity.options.color,
        null,
        null,
        { shadowBlur: 6, shadowColor: new RGB(0, 0, 0, 0.5) }
      )
    );
    circles.push(new Circle(leftEye, this.size, RGB.White));
    circles.push(
      new Circle(
        leftEye.clone().add(
          Vector2.from(leftEye)
            .to(eyeTarget)
            .normalized.multiply(this.size / 4)
        ),
        (this.size * 2.5) / 5,
        RGB.Black
      )
    );
    circles.push(
      new Circle(
        leftEye.clone().add(
          Vector2.from(leftEye)
            .to(eyeTarget)
            .normalized.multiply(this.size / 2)
        ),
        this.size / 4,
        RGB.White
      )
    );
    circles.push(
      new Circle(
        rightEye,
        this.size * 1.25,
        this.entity.options.color,
        null,
        null,
        { shadowBlur: 6, shadowColor: new RGB(0, 0, 0, 0.5) }
      )
    );
    circles.push(new Circle(rightEye, this.size, RGB.White));
    circles.push(
      new Circle(
        rightEye.clone().add(
          Vector2.from(rightEye)
            .to(eyeTarget)
            .normalized.multiply(this.size / 4)
        ),
        (this.size * 2.5) / 5,
        RGB.Black
      )
    );
    circles.push(
      new Circle(
        rightEye.clone().add(
          Vector2.from(rightEye)
            .to(eyeTarget)
            .normalized.multiply(this.size / 2)
        ),
        this.size / 4,
        RGB.White
      )
    );

    circles.forEach((circle) => {
      circle.draw(viewer);
    });
  }
}

export default EyeRender;
