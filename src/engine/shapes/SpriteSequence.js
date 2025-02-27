
class SpriteSequence {
  sprite;
  positions;

  #current;

  constructor(sprite, positions) {
    this.sprite = sprite;
    this.positions = positions;
    this.#current = 0;
    this.sprite.current = this.positions[this.current];
  }

  get current() {
    return this.#current;
  }

  set current(current) {
    this.#current = current;
    this.sprite.current = this.positions[this.current];
  }

  next() {
    this.current++;
    if (this.current >= this.positions.length) {
      this.current = 0;
    }
  }

  prev() {
    this.current--;
    if (this.current < 0) {
      this.current = this.positions.length - 1;
    }
  }

  draw(viewer, transform) {
    this.sprite.draw(viewer, transform);
  }
}

export default SpriteSequence;
