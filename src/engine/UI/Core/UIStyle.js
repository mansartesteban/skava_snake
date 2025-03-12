import Component from "@/Engine/Component";
import { getProperties } from "@/Engine/Lib/Objet";
import UIStyleHandler from "./UIStyleHandler";

class UIStyle extends Component {
  #inherit = false;
  #needsUpdate = false;

  #color;
  #textColor;
  #font;
  #fontWeight;
  #fontSize;
  #borderRadius;
  #borderWidth;
  #borderColor;
  #shadowColor;
  #shadowBlur;
  #shadowPosition;
  #shadowSize;
  #layout;
  #margin;
  #padding;
  #width;
  #height;
  #direction;
  #align;

  constructor(style, inherit = false) {
    super();

    if (style) {
      this.color = style.color || this.#color;
      this.textColor = style.textColor || this.#textColor;
      this.font = style.font || this.#font;
      this.fontWeight = style.fontWeight || this.#fontWeight;
      this.fontSize = style.fontSize || this.#fontSize;
      this.borderRadius = style.borderRadius || this.#borderRadius;
      this.borderWidth = style.borderWidth || this.#borderWidth;
      this.borderColor = style.borderColor || this.#borderColor;
      this.shadowColor = style.shadowColor || this.#shadowColor;
      this.shadowBlur = style.shadowBlur || this.#shadowBlur;
      this.shadowPosition = style.shadowPosition || this.#shadowPosition;
      this.shadowSize = style.shadowSize || this.#shadowSize;
      this.layout = style.layout || this.#layout;
      this.margin = style.margin || this.#margin;
      this.padding = style.padding || this.#padding;
      this.width = style.width || this.#width;
      this.height = style.height || this.#height;
      this.direction = style.direction || this.#direction;
      this.align = style.align || this.#align;
    }

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
  get layout() {
    return this.#layout;
  }
  get margin() {
    return this.#margin;
  }
  get padding() {
    return this.#padding;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  get direction() {
    return this.#direction;
  }
  get align() {
    return this.#align;
  }
  get needsUpdate() {
    return this.#needsUpdate;
  }
  get inherit() {
    return this.#inherit;
  }

  set color(color) {
    this.#color = color;
    this.needsUpdate = true;
  }
  set textColor(textColor) {
    this.#textColor = textColor;
    this.needsUpdate = true;
  }
  set font(font) {
    this.#font = font;
    this.needsUpdate = true;
  }
  set fontWeight(fontWeight) {
    this.#fontWeight = fontWeight;
    this.needsUpdate = true;
  }
  set fontSize(fontSize) {
    this.#fontSize = fontSize;
    this.needsUpdate = true;
  }
  set borderRadius(borderRadius) {
    this.#borderRadius = borderRadius;
    this.needsUpdate = true;
  }
  set borderWidth(borderWidth) {
    this.#borderWidth = borderWidth;
    this.needsUpdate = true;
  }
  set borderColor(borderColor) {
    this.#borderColor = borderColor;
    this.needsUpdate = true;
  }
  set shadowColor(shadowColor) {
    this.#shadowColor = shadowColor;
    this.needsUpdate = true;
  }
  set shadowBlur(shadowBlur) {
    this.#shadowBlur = shadowBlur;
    this.needsUpdate = true;
  }
  set shadowPosition(shadowPosition) {
    this.#shadowPosition = shadowPosition;
    this.needsUpdate = true;
  }
  set shadowSize(shadowSize) {
    this.#shadowSize = shadowSize;
    this.needsUpdate = true;
  }
  set layout(layout) {
    this.#layout = layout;
    this.needsUpdate = true;
  }
  set margin(margin) {
    this.#margin = margin;
    this.needsUpdate = true;
  }
  set padding(padding) {
    this.#padding = padding;
    this.needsUpdate = true;
  }
  set width(width) {
    this.#width = width;
    this.needsUpdate = true;
  }
  set height(height) {
    this.#height = height;
    this.needsUpdate = true;
  }
  set direction(direction) {
    this.#direction = direction;
    this.needsUpdate = true;
  }
  set needsUpdate(needsUpdate) {
    this.#needsUpdate = needsUpdate;
  }
  set align(align) {
    this.#align = align;
  }

  setup() {
    this.styleHandler = new UIStyleHandler(this);
  }

  loop() {
    this.styleHandler.handleStyle();
  }

  setDefaultStyle(style) {
    let thisStyle = this.entity.getComponent(UIStyle);
    Object.keys(getProperties(style)).forEach((prop) => {
      if (prop !== "inherit") {
        if (thisStyle[prop] === undefined) {
          thisStyle[prop] = style[prop];
        }
      }
    });
  }

  setStyle(style, overwrite = true, isDefault = false) {
    let thisStyle = this.entity.getComponent(UIStyle);

    let styleValues = style;
    if (style instanceof UIStyle) {
      styleValues = getProperties(style);
    }
    Object.keys(styleValues).forEach((prop) => {
      if (prop !== "inherit") {
        if (overwrite) {
          if (styleValues[prop] !== undefined) {
            thisStyle[prop] = styleValues[prop] || thisStyle[prop];
          }
        } else {
          if (isDefault) {
            if (thisStyle[prop] === undefined) {
              thisStyle[prop] = styleValues[prop];
            }
          } else {
            thisStyle[prop] = thisStyle[prop] || styleValues[prop];
          }
        }
      }
    });
  }
}

export default UIStyle;

//   width: "100%" || "100px",
//   height: "100%" || "100px",
//   direction: "horizontal" || "vertical",
//   padding: ["100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//     ] || ["100%" || "100px", "100%" || "100px", "100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ],
//   margin: ["100%" || "100px"] || ["100%" || "100px", "100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ],
//   layout: "absolute" || "relative",
//   color: new RGB(),
//   textColor: new RGB(),
//   // font: new Font(),
//   fontWeight: "800",
//   fontSize: "10%" || "20px",
//   borderRadius: ["100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//     ] || ["100%" || "100px", "100%" || "100px", "100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ],
//   border: ["100%" || "100px"] || ["100%" || "100px", "100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ],
//   borderWidth: ["100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//     ] || ["100%" || "100px", "100%" || "100px", "100%" || "100px"] || [
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//       "100%" || "100px",
//     ],
//   borderColor: new RGB(),
//   shadowColor: new RGB(),
//   shadowBlur: "100%" || "100px",
//   shadowPosition: ["100%" || "100px", "100%" || "100px"],
//   shadowSize: ["100%" || "100px", "100%" || "100px"],
