import { clamp } from "../Lib/Numeric"
import RGB from "../Lib/RGB"
import Rotation from "../Lib/Rotation"
import Vector2 from "../Lib/Vector2"
import Draw from "./Draw"

class DebugVector {
  #from;
  #to;
  #color;
  #thickness;

  #frame = 0;

  constructor(
    from = new Vector2(),
    to = new Vector2(),
    color = RGB.Fuchsia,
    thickness = 5
  ) {
    this.#from = from;
    this.#to = to;
    this.#color = color;
    this.#thickness = thickness;
  }

  get from() {
    return this.#from;
  }
  get to() {
    return this.#to;
  }

  set from(from) {
    this.#from = from;
  }
  set to(to) {
    this.#to = to;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.strokeStyle = this.#color._toString;
      ctx.lineWidth = this.#thickness;
      ctx.fillStyle = this.#color._toString;

      let arrowSize = clamp(this.#thickness * 3, 10, 1000);
      if (Vector2.from(this.from).to(this.to).length <= arrowSize) {
        let color = this.#frame % 4 < 2 ? "#ff0000" : "#ffffff";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
      }

      this.to.add(
        Vector2.from(this.from).to(this.to).normalized.multiply(-arrowSize)
      );
      let front = this.to
        .clone()
        .add(
          Vector2.from(this.from).to(this.to).normalized.multiply(arrowSize)
        );
      let frontDirection = Vector2.from(this.to).to(this.from).normalize();
      let arrowSides = arrowSize * 2;

      let left = frontDirection.clone()
        .rotate(new Rotation(Math.PI * 2))
        .multiply(arrowSides)
        .add(this.to);
      let right = frontDirection.clone()
        .rotate(new Rotation(-Math.PI * 2))
        .multiply(arrowSides)
        .add(this.to);

      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();

      ctx.moveTo(front.x, front.y);
      ctx.lineTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.lineTo(front.x, front.y);
      ctx.fill();

      return ["strokeStyle", "lineWidth", "fillStyle"];
    });
    this.#frame++;
  }
}

export default DebugVector;
