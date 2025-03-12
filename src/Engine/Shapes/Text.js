import RGB from "../Lib/RGB";
import Vector2 from "../Lib/Vector2";
import Draw from "./Draw";

class Text {
  #text;
  #position;
  #color;
  #fontSize;

  constructor(
    text = "",
    position = new Vector2(),
    color = RGB.White,
    fontSize = 10
  ) {
    this.#text = text;
    this.#position = position;
    this.#color = color;
    this.#fontSize = fontSize;
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
  get fontSize() {
    return this.#fontSize;
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
  set fontSize(fontSize) {
    this.#fontSize = fontSize;
  }

  draw(viewer) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.font = `${this.fontSize}pt BraahOne`;
      ctx.textAlign = "center";
      ctx.textBaseline = "center";

      ctx.fillStyle = this.color._toString;
      ctx.fillText(
        this.text.toString(),
        this.position.x,
        this.position.y + this.fontSize / 3
      );

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
