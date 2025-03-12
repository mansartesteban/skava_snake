import { clamp, mapRange } from "./Numeric";

/**
 * A helper class to handle colors with rgba channels
 */
class RGB {
  static Black = new RGB(0x000000);
  static White = new RGB(0xffffff);
  static Grey = new RGB(0x7f7f7f);
  static LightGrey = new RGB(0xbfbfbf);
  static DarkGrey = new RGB(0x3f3f3f);
  static Red = new RGB(0xff0000);
  static Green = new RGB(0x00ff00);
  static Blue = new RGB(0x0000ff);
  static Yellow = new RGB(0xffff00);
  static Cyan = new RGB(0x00ffff);
  static Fuchsia = new RGB(0xff00ff);

  #r = 0;
  #g = 0;
  #b = 0;

  #opacity = 1;

  /**
   * @param r The red value of this color from 0 to 255
   * @param g The green value of this color from 0 to 255
   * @param b The blue value of this color from 0 to 255
   * @param opacity The opacity value of this color from 0 to 1
   */
  constructor(r, g, b, opacity) {
    if (typeof r === "number" && g === undefined && b === undefined) {
      let hex = r;

      // Format RGB standard (ex: 0xFF8800)
      this.#r = (hex >> 16) & 0xff;
      this.#g = (hex >> 8) & 0xff;
      this.#b = hex & 0xff;
      this.#opacity = 1;
    } else {
      // Cas normal avec r, g, b séparés
      this.#r = r ?? this.#r;
      this.#g = g ?? this.#g;
      this.#b = b ?? this.#b;
      this.#opacity = opacity ?? this.#opacity;
    }
  }

  /**
   * Returns the red channel from 0 to 255
   */
  get r() {
    return this.#r;
  }

  /**
   * Sets the red channel from 0 to 255
   */
  set r(r) {
    this.#r = clamp(r, 0, 255);
  }

  /**
   * Returns the green channel from 0 to 255
   */
  get g() {
    return this.#g;
  }

  /**
   * Sets the green channel from 0 to 255
   */
  set g(g) {
    this.#g = clamp(g, 0, 255);
  }

  /**
   * Returns the blue channel from 0 to 255
   */
  get b() {
    return this.#b;
  }

  /**
   * Sets the blue channel from 0 to 255
   */
  set b(b) {
    this.#b = clamp(b, 0, 255);
  }

  /**
   * Returns the opacity channel from 0 to 1
   */
  get opacity() {
    return this.#opacity;
  }

  /**
   * Sets the opacity channel from 0 to 1
   */
  set opacity(opacity) {
    this.#opacity = opacity;
  }

  /**
   * Returns an array with splitted rgba channels
   */
  get rgba() {
    return [this.r, this.g, this.b, this.opacity];
  }

  /**
   * Returns the hexadecimal representation of this color on 8 bits
   */
  get _toString() {
    return (
      "#" +
      parseInt(this.r.toFixed(0)).toString(16).padStart(2, "0") +
      parseInt(this.g.toFixed(0)).toString(16).padStart(2, "0") +
      parseInt(this.b.toFixed(0)).toString(16).padStart(2, "0") +
      parseInt(Math.floor(this.opacity * 255).toFixed(0))
        .toString(16)
        .padStart(2, "0")
    );
  }

  /**
   * Returns a new Color which is the addition of this color with an other
   * @param color The color to add to this color
   * @returns Color
   */
  add(color) {
    if (color instanceof RGB) {
      return new RGB(
        this.r + color.r,
        this.g + color.g,
        this.b + color.b,
        this.opacity + color.opacity
      );
    } else if (typeof color === "number") {
      return new RGB(
        this.r + color,
        this.g + color,
        this.b + color,
        this.opacity + color
      );
    } else {
      throw (
        "Unable to compute a addition on the type '" +
        typeof color +
        "'. It should be a number or a Color"
      );
    }
  }

  /**
   * Returns a new Color which is the multiplication of this color with an other
   * @param color The color to multiply by this color
   * @returns Color
   */
  multiply(color) {
    if (color instanceof RGB) {
      return new RGB(
        Math.floor((this.r * color.r) / 0xff),
        Math.floor((this.g * color.g) / 0xff),
        Math.floor((this.b * color.b) / 0xff),
        Math.floor(this.opacity * color.opacity)
      );
    } else if (typeof color === "number") {
      return new RGB(
        this.r * color,
        this.g * color,
        this.b * color
        // this.opacity * color
      );
    } else {
      throw (
        "Unable to compute a multiplication on the type '" +
        typeof color +
        "'. It should be a number or a Color"
      );
    }
  }

  /**
   * Interpolates (linearly) this color to an other color. Calculates a value between those two colors at weight position
   * @param color The other color to interpolate with
   * @param weight The weight of the second vector in the computation. For exemple :
   * 0 => returns the current color,
   * 1 => returns the target color,
   * 0.33 => returns the value of a new color at 33% between this color and the color parameter
   * @returns this Returns this for methods chaining
   */
  lerp(color, weight, withOpacity = true) {
    this.r = (1 - weight) * this.r + weight * color.r;
    this.g = (1 - weight) * this.g + weight * color.g;
    this.b = (1 - weight) * this.b + weight * color.b;
    if (withOpacity) {
      this.opacity = (1 - weight) * this.opacity + weight * color.opacity;
    }
    return this;
  }

  /**
   * Returns a clone of this vector
   * @returns RGB
   */
  clone() {
    return new RGB(this.r, this.g, this.b, this.opacity);
  }

  /**
   * Copies the coordinates of a given vector to this vector
   * @param v The vector to be copied
   * @returns this Returns this for methods chaining
   */
  copy(v) {
    if (v) {
      this.r = v.r;
      this.g = v.g;
      this.b = v.b;
      this.opacity = v.opacity;
    }
    return this;
  }
}

export default RGB;
