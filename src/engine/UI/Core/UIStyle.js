import Component from "@/Engine/Component";

class UIStyle extends Component {
  #inherit = false;

  #color;
  #textColor;
  #font;
  #fontWeight;
  #fontSize;
  #borderRadius;
  #border;
  #borderWidth;
  #borderColor;
  #shadowColor;
  #shadowBlur;
  #shadowPosition;
  #shadowSize;

  constructor(style, inherit = false) {
    super();
    this.#color = style.color || this.#color;
    this.#textColor = style.textColor || this.#textColor;
    this.#font = style.font || this.#font;
    this.#fontWeight = style.fontWeight || this.#fontWeight;
    this.#fontSize = style.fontSize || this.#fontSize;
    this.#borderRadius = style.borderRadius || this.#borderRadius;
    this.#border = style.border || this.#border;
    this.#borderWidth = style.borderWidth || this.#borderWidth;
    this.#borderColor = style.borderColor || this.#borderColor;
    this.#shadowColor = style.shadowColor || this.#shadowColor;
    this.#shadowBlur = style.shadowBlur || this.#shadowBlur;
    this.#shadowPosition = style.shadowPosition || this.#shadowPosition;
    this.#shadowSize = style.shadowSize || this.#shadowSize;

    this.#inherit = inherit;
  }

  get color() {
    return this.#color;
  }
  get textColor() {
    return this.#textColor;
  }
  get font() {
    return this.#font;
  }
  get fontWeight() {
    return this.#fontWeight;
  }
  get fontSize() {
    return this.#fontSize;
  }
  get borderRadius() {
    return this.#borderRadius;
  }
  get border() {
    return this.#border;
  }
  get borderWidth() {
    return this.#borderWidth;
  }
  get borderColor() {
    return this.#borderColor;
  }
  get shadowColor() {
    return this.#shadowColor;
  }
  get shadowBlur() {
    return this.#shadowBlur;
  }
  get shadowPosition() {
    return this.#shadowPosition;
  }
  get shadowSize() {
    return this.#shadowSize;
  }
  get inherit() {
    return this.#inherit;
  }

  set color(color) {
    this.#color = color;
  }
  set textColor(textColor) {
    this.#textColor = textColor;
  }
  set font(font) {
    this.#font = font;
  }
  set fontWeight(fontWeight) {
    this.#fontWeight = fontWeight;
  }
  set fontSize(fontSize) {
    this.#fontSize = fontSize;
  }
  set borderRadius(borderRadius) {
    this.#borderRadius = borderRadius;
  }
  set border(border) {
    this.#border = border;
  }
  set borderWidth(borderWidth) {
    this.#borderWidth = borderWidth;
  }
  set borderColor(borderColor) {
    this.#borderColor = borderColor;
  }
  set shadowColor(shadowColor) {
    this.#shadowColor = shadowColor;
  }
  set shadowBlur(shadowBlur) {
    this.#shadowBlur = shadowBlur;
  }
  set shadowPosition(shadowPosition) {
    this.#shadowPosition = shadowPosition;
  }
  set shadowSize(shadowSize) {
    this.#shadowSize = shadowSize;
  }

  getExposedPropertiesWithValues(instance) {
    let proto = Object.getPrototypeOf(instance);
    let descriptors = Object.getOwnPropertyDescriptors(proto);
    let getters = Object.keys(descriptors).filter(
      (key) => typeof descriptors[key].get === "function"
    );

    return getters.reduce((acc, key) => {
      acc[key] = instance[key]; // Accède au getter
      return acc;
    }, {});
  }

  setStyle(style) {
    // console.log("set style", this)
    let thisStyle = this.entity.getComponent(UIStyle);
    if (!thisStyle) {
      thisStyle = style;
      this.entity.addComponent(thisStyle);
    }

    let styleValues = style
    if (style instanceof UIStyle) {
      styleValues = this.getExposedPropertiesWithValues(style);
    }
    Object.keys(styleValues).forEach((prop) => {
      if (prop !== "inherit") {
        // console.log("in set", prop, styleValues[prop])
        thisStyle[prop] = styleValues[prop] || thisStyle[prop];
      }
    });

    // console.log(style, this.entity.getComponent(UIStyle))
  }
}

export default UIStyle;
