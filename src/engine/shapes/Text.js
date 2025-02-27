import RGB from "../lib/RGB"
import Vector2 from "../lib/Vector2"
import Draw from "./Draw"

class Text {
  #text;
  #position;
  #color;
  #style;

  constructor(
    text = "",
    position = new Vector2(),
    color = RGB.White,
    style = "10pt sans-serif"
  ) {
    this.#text = text;
    this.#position = position;
    this.#color = color;
    this.#style = style;
  }

  get text() {
    return this.#text;
  }
  get position() {
    return this.#position;
  }
  get color() {
    return this.#color;
  }
  get style() {
    return this.#style;
  }

  set text(text) {
    this.#text = text;
  }
  set position(position) {
    this.#position = position;
  }
  set color(color) {
    this.#color = color;
  }
  set style(style) {
    this.#style = style;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.font = this.style;
      let width = ctx.measureText(this.text).width;
      let heightMatcher = ctx.font.match(/\d+/);
      let height = 0;
      if (heightMatcher) {
        height = parseInt(heightMatcher[0], 10);
      }
      let margin = 5;

      ctx.fillStyle = "#000000";
      ctx.fillRect(
        this.position.x - margin,
        this.position.y - height - margin / 2,
        width + margin * 2,
        height + margin * 2
      );

      ctx.fillStyle = this.color._toString;
      ctx.fillText(this.text.toString(), this.position.x, this.position.y);

      return ["fillStyle"];
    });
  }
}

export default Text;

/*
TODO
- Centrer le text sur la position
- Appliquer des styles différents
*/
