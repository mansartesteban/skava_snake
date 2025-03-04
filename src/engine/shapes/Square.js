import RGB from "../Lib/RGB";
import Vector2 from "../Lib/Vector2";
import Draw from "./Draw";

class Square {
  #position;
  #size;
  #color;

  constructor(
    position = new Vector2(),
    size = new Vector2(),
    color = new RGB()
  ) {
    this.#position = position;
    this.#size = size;
    this.#color = color;
  }

  get position() {
    return this.#position;
  }

  get size() {
    return this.#size;
  }

  get color() {
    return this.#color;
  }

  set position(position) {
    this.#position = position;
  }
  set size(size) {
    this.#size = size;
  }
  set color(color) {
    this.#color = color;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

      ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.fill();
      return ["fillStyle"];
    });
  }
}

export default Square;
