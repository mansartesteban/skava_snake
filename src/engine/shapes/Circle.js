import RGB from "../lib/RGB"
import Rotation from "../lib/Rotation"
import Vector2 from "../lib/Vector2"
import Draw from "./Draw";

class Circle {
  #position;
  #radius;
  #color;
  #angle;
  #direction;

  constructor(
    position = new Vector2(),
    radius = 1,
    color = new RGB(),
    angle = new Rotation(Math.PI * 2, true),
    direction = new Vector2()
  ) {
    this.#position = position;
    this.#radius = radius;
    this.#color = color;
    this.#angle = angle;
    this.#direction = direction;
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
    this.#angle = angle;
  }
  set direction(direction) {
    this.#direction = direction;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

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
      return ["fillStyle"];
    });
  }
}

export default Circle;
