import RGB from "../Lib/RGB";
import Rotation from "../Lib/Rotation";
import Vector2 from "../Lib/Vector2";
import Draw from "./Draw";

class RoundSquare {
  #position;
  #size;
  #radius;
  #rotation;
  #color;
  #shadowBlur;
  #shadowColor;
  #shadowSize;
  #shadowPosition;

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

  get shadowBlur() {
    return this.#shadowBlur;
  }
  get shadowColor() {
    return this.#shadowColor;
  }
  get shadowSize() {
    return this.#shadowSize;
  }
  get shadowPosition() {
    return this.#shadowPosition;
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
  set shadowBlur(shadowBlur) {
    this.#shadowBlur = shadowBlur;
  }
  set shadowColor(shadowColor) {
    this.#shadowColor = shadowColor;
  }
  set shadowSize(shadowSize) {
    this.#shadowSize = shadowSize;
  }
  set shadowPosition(shadowPosition) {
    this.#shadowPosition = shadowPosition;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

      ctx.save();
      ctx.translate(
        this.position.x + this.size.x / 2,
        this.position.y + this.size.y / 2
      );
      ctx.rotate(-this.rotation.angle);
      ctx.translate(
        -this.position.x - this.size.x / 2,
        -this.position.y - this.size.y / 2
      );
      ctx.imageSmoothingEnabled = false;
      if (this.shadowBlur) {
        ctx.shadowBlur = this.shadowBlur;
      }
      if (this.shadowColor) {
        ctx.shadowColor = this.shadowColor._toString;
      }
      ctx.roundRect(
        this.position.x,
        this.position.y,
        this.size.x,
        this.size.y,
        this.radius
      );
      ctx.fill();
      ctx.restore();
      if (this.shadowBlur) {
        ctx.shadowBlur = 0;
      }
      if (this.shadowColor) {
        ctx.shadowColor = "";
      }

      return ["fillStyle"];
    });
  }
}

export default RoundSquare;
