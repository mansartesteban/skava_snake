import RGB from "../Lib/RGB";
import Vector2 from "../Lib/Vector2";
import Draw from "./Draw";

class Line {
  #from;
  #to;
  #color;
  #dashes;
  #thickness;

  #options;

  constructor(
    from = new Vector2(),
    to = new Vector2(),
    color = new RGB(),
    thickness = 1,
    dashes = [],
    options = {}
  ) {
    this.#from = from;
    this.#to = to;
    this.#color = color;
    this.#dashes = dashes;
    this.#thickness = thickness;
    this.#options = options;
  }

  get from() {
    return this.#from;
  }
  get to() {
    return this.#to;
  }
  get color() {
    return this.#color;
  }
  get dashes() {
    return this.#dashes;
  }
  get thickness() {
    return this.#thickness;
  }
  get options() {
    return this.#options;
  }

  set from(from) {
    this.#from = from;
  }
  set to(to) {
    this.#to = to;
  }
  set color(color) {
    this.#color = color;
  }
  set dashes(dashes) {
    this.#dashes = dashes;
  }
  set thickness(thickness) {
    this.#thickness = thickness;
  }
  set options(options) {
    this.#options = options;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      const dashes = this.#dashes.map((dash) =>
        typeof dash === "string" ? parseInt(dash) : dash
      );

      if (this.#options.shadowBlur) {
        ctx.shadowBlur = this.#options.shadowBlur;
      }
      if (this.#options.shadowColor) {
        ctx.shadowColor = this.#options.shadowColor._toString;
      }

      ctx.lineCap = "round";
      ctx.setLineDash(dashes);
      ctx.strokeStyle = this.color._toString;
      ctx.lineWidth = this.thickness;

      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();

      if (this.#options.shadowBlur) {
        ctx.shadowBlur = 0;
      }
      if (this.#options.shadowColor) {
        ctx.shadowColor = "";
      }

      return ["strokeStyle", "setLineDash", "lineWidth"];
    });
  }
}

export default Line;
