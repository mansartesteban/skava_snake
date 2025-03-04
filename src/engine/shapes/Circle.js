import RGB from "../Lib/RGB";
import Rotation from "../Lib/Rotation";
import Vector2 from "../Lib/Vector2";
import Draw from "./Draw";

class Circle {
  #position;
  #radius;
  #color;
  #angle;
  #direction;
  #options;

  constructor(
    position = new Vector2(),
    radius = 1,
    color = new RGB(),
    angle = null,
    direction = null,
    options = {}
  ) {
    this.#position = position;
    this.#radius = radius;
    this.#color = color;
    this.angle = angle;
    this.direction = direction;
    this.#options = options;
  }

  get position() {
    return this.#position;
  }

  get radius() {
    return this.#radius;
  }

  get color() {
    return this.#color;
  }

  get angle() {
    return this.#angle;
  }

  get direction() {
    return this.#direction;
  }
  get options() {
    return this.#options;
  }

  set position(position) {
    this.#position = position;
  }
  set radius(radius) {
    this.#radius = radius;
  }
  set color(color) {
    this.#color = color;
  }
  set angle(angle) {
    if (!angle) {
      angle = new Rotation(Math.PI * 2, true);
    }
    this.#angle = angle;
  }
  set direction(direction) {
    if (!direction) {
      direction = new Vector2();
    }
    this.#direction = direction;
  }
  set options(options) {
    this.#options = options;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

      if (this.#options.shadowBlur) {
        ctx.shadowBlur = this.#options.shadowBlur;
      }
      if (this.#options.shadowColor) {
        ctx.shadowColor = this.#options.shadowColor._toString;
      }

      ctx.arc(
        this.position.x,
        this.position.y,
        this.#radius,
        this.#direction.rotation.angle - this.#angle.angle / 2,
        this.#direction.rotation.angle + this.#angle.angle / 2
      );
      if (this.#angle.angle % (2 * Math.PI) !== 0) {
        ctx.lineTo(this.position.x, this.position.y);
      }

      ctx.fill();

      if (this.#options.shadowBlur) {
        ctx.shadowBlur = 0;
      }
      if (this.#options.shadowColor) {
        ctx.shadowColor = "";
      }

      return ["fillStyle"];
    });
  }
}

export default Circle;
