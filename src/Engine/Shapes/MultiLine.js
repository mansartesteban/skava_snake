import RGB from "../Lib/RGB"
import Vector2 from "../Lib/Vector2"
import Draw from "./Draw"

class MultiLine {
  #points;
  #color;
  #dashes;
  #thickness;

  constructor(
    points = [],
    color = new RGB(),
    thickness = 1,
    dashes = []
  ) {
    this.#points = points;
    this.#color = color;
    this.#dashes = dashes;
    this.#thickness = thickness;
  }

  get points() {
    return this.#points;
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

  set points(points) {
    this.#points = points;
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

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      const dashes = this.#dashes.map((dash) =>
        typeof dash === "string" ? parseInt(dash) : dash
      );
      ctx.lineCap = "round";
      ctx.setLineDash(dashes);
      ctx.strokeStyle = this.color._toString;
      ctx.lineWidth = this.thickness;

      for( let i = 0 ; i < this.points.length -1 ; i++) {
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i+1].x, this.points[i+1].y);
        
      }
      ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
      ctx.stroke();

      return ["strokeStyle", "setLineDash", "lineWidth"];
    });
  }
}

export default MultiLine;
