import RGB from "../lib/RGB";
import Rotation from "../lib/Rotation";
import Vector2 from "../lib/Vector2";
import Draw from "./Draw";

class RoundSquare {
  #position;
  #size;
  #radius;
  #rotation;
  #color;

  constructor(
    position = new Vector2(),
    size = new Vector2(),
    radius = [0],
    color = new RGB(),
    rotation = new Rotation()
  ) {
    this.#position = position;
    this.#size = size;
    this.#radius = radius;
    this.#rotation = rotation;
    this.#color = color;
  }

  get position() {
    return this.#position;
  }

  get size() {
    return this.#size;
  }

  get radius() {
    return this.#radius;
  }

  get color() {
    return this.#color;
  }

  get rotation() {
    return this.#rotation;
  }

  set position(position) {
    this.#position = position;
  }
  set size(size) {
    this.#size = size;
  }
  set radius(radius) {
    this.#radius = radius;
  }
  set color(color) {
    this.#color = color;
  }
  set rotation(rotation) {
    this.#rotation = rotation;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

      ctx.save();
      ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y /2);
      ctx.rotate(-this.rotation.angle);
      ctx.translate(-this.position.x - this.size.x / 2, -this.position.y - this.size.y/2);
      ctx.imageSmoothingEnabled = false;
      ctx.roundRect(
        this.position.x,
        this.position.y,
        this.size.x,
        this.size.y,
        this.radius
      );
      ctx.fill();
      ctx.restore();

      return ["fillStyle"];
    });
  }
}

export default RoundSquare;
