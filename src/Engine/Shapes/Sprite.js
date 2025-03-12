import TransformComponent from "../Components/TransformComponent";
import Rotation from "../Lib/Rotation";
import Vector2 from "../Lib/Vector2";
import Img from "./Img";

class Sprite extends Img {
  #columns;
  #rows;
  #count;
  #scale;
  offsetRotation;

  #current;

  constructor(path, options = {}) {
    super(path);
    this.#columns = options.columns || 1;
    this.#rows = options.rows || 1;
    this.#count = this.#rows * this.#columns || 1;
    this.#scale = options.scale || 1;
    this.offsetRotation = options.offsetRotation || new Rotation();
    this.#current = 0;
  }

  get current() {
    return this.#current;
  }

  set current(position) {
    this.#current = position;
  }

  next(steps = 1) {
    this.#current += steps;
    if (this.#current > this.#count - 1) {
      this.#current = 0;
    }
  }

  prev(steps = 1) {
    this.#current -= steps;
    if (this.#current < 0) {
      this.#current = this.#count - 1;
    }
  }

  draw(viewer, transform = new TransformComponent()) {
    let ctx = viewer.ctx;
    let position = transform.position;
    let rotation = transform.rotation;

    if (this.imgLoaded) {
      let current = new Vector2(
        this.#current % this.#columns,
        Math.floor(this.#current / this.#columns)
      );

      let spriteWidth = this.img.width / this.#columns;
      let spriteHeight = this.img.height / this.#rows;
      let displayedWidth = spriteWidth * this.#scale;
      let displayedHeight = spriteHeight * this.#scale;

      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(-rotation.sub(this.offsetRotation).angle);
      ctx.translate(-position.x, -position.y);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        this.img,
        current.x * spriteWidth,
        current.y * spriteHeight,
        spriteWidth,
        spriteHeight,
        position.x - displayedWidth / 2,
        position.y - displayedHeight / 2,
        displayedWidth,
        displayedHeight
      );
      ctx.restore();
    }
  }
}

export default Sprite;
