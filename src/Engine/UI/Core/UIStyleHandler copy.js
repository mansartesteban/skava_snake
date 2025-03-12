import WrongInstanceError from "@/Application/Errors/WrongInstanceError";
import UIStyle from "./UIStyle";
import UIComponent from "./UIComponent";
import Vector2 from "@/Engine/Lib/Vector2";
import { getProperties } from "@/Engine/Lib/Objet";

class UIStyleHandler {
  #component;

  #style;
  indexInParent = 0;
  nextPosition = new Vector2();

  datas = {
    height: 0,
    margin: 0,
  };

  lastSize = new Vector2();
  currentSize = new Vector2();

  constructor(uiStyle) {
    if (!(uiStyle instanceof UIStyle)) {
      throw new WrongInstanceError(uiStyle, UIStyle);
    }

    this.style = uiStyle;
    this.component = uiStyle.entity;
  }

  get component() {
    return this.#component;
  }

  get style() {
    return this.#style;
  }

  get parent() {
    return this.#component.parent || this.#component.root;
  }

  get lastSibling() {
    return this.parent.tree[this.indexInParent - 1];
  }

  get lastSiblingStyleHandler() {
    return this.lastSibling?.getComponent(UIStyle)?.styleHandler;
  }

  get hasSizeChanged() {
    return (
      this.lastSize.x !== this.currentSize.x ||
      this.lastSize.y !== this.currentSize.y
    );
  }

  set style(style) {
    this.#style = style;
  }

  set component(component) {
    this.#component = component;
  }

  autoHeightParent(parent, current) {
    let parentStyle = parent.getComponent(UIStyle);
    if (parentStyle.height === "auto") {
      // parentStyle.styleHandler.nextPosition.y = current.nextPosition.y;
      parent.transform.size.y = current.nextPosition.y;
    }

    current = parent.getComponent(UIStyle).styleHandler;
    parent = parent.parent;
    if (
      parent &&
      parent !== this.#component.root &&
      parentStyle.height === "auto"
    ) {
      this.autoHeightParent(parent, current);
    }
  }

  calculateSize(parentTransform) {
    let x = 0;
    let y = 0;

    // Calculate width
    if (this.style.width) {
      if (typeof this.style.width === "number") {
        x = this.style.width;
      } else if (typeof this.style.width === "string") {
        if (this.style.width.endsWith("%")) {
          let value = parseFloat(this.style.width.replace("%", ""));
          x = parentTransform.size.x * (value / 100);
        } else if (this.style.width.endsWith("px")) {
          let value = parseFloat(this.style.width.replace("px", ""));
          x = value;
        } else {
          x = this.style.width;
        }
      }
    }

    // Calculate height
    if (this.style.height) {
      if (typeof this.style.height === "number") {
        y = this.style.height;
      } else if (typeof this.style.height === "string") {
        if (this.style.height.endsWith("%")) {
          let value = parseFloat(this.style.height.replace("%", ""));
          y = parentTransform.size.y * (value / 100);
        } else if (this.style.height.endsWith("px")) {
          let value = parseFloat(this.style.height.replace("px", ""));
          y = value;
        } else {
          y = this.style.height;
        }
      }
    }

    this.nextPosition.x =
      (this.lastSiblingStyleHandler?.nextPosition.x || 0) + x;
    this.nextPosition.y =
      (this.lastSiblingStyleHandler?.nextPosition.y || 0) + y;

    if (this.#component.parent) {
      this.autoHeightParent(this.#component.parent, this);
    }

    if (this.style.margin) {
      let value = this.style.margin;
      if (!Array.isArray(value)) {
        value = [value, value, value, value];
      } else if (value.length === 1) {
        value = [value[0], value[0], value[0], value[0]];
      } else if (value.length === 2) {
        value = [value[0], value[1], value[0], value[1]];
      } else if (value.length === 3) {
        value = [value[0], value[1], value[1], value[2]];
      }
      value = value.map((val, index) => {
        if (typeof val === "number") {
          return val;
        } else if (val.endsWith("%")) {
          let v = parseFloat(val.replace("%", ""));
          let axe = [0, 2].includes(index) ? y : x;
          return axe * (v / 100);
        } else if (val.endsWith("px")) {
          let v = parseFloat(val.replace("px", ""));
          return v;
        } else {
          return parseFloat(val);
        }
      });
      x -= value[1] + value[3];
      y -= value[0] + value[2];
    }

    return new Vector2(Math.max(0, x), Math.max(0, y));
  }

  calculatePosition(parentTransform) {
    let x =
      parentTransform.position.x +
      (this.style.direction === "horizontal"
        ? this.lastSiblingStyleHandler?.nextPosition.x || 0
        : 0);
    let y =
      parentTransform.position.y +
      (this.style.direction === "vertical"
        ? this.lastSiblingStyleHandler?.nextPosition.y || 0
        : 0);

    if (this.style.margin) {
      let value = this.style.margin;
      if (!Array.isArray(value)) {
        value = [value, value, value, value];
      } else if (value.length === 1) {
        value = [value[0], value[0], value[0], value[0]];
      } else if (value.length === 2) {
        value = [value[0], value[1], value[0], value[1]];
      } else if (value.length === 3) {
        value = [value[0], value[1], value[1], value[2]];
      }
      value = value.map((val, index) => {
        if (typeof val === "number") {
          return val;
        } else if (val.endsWith("%")) {
          let v = parseFloat(val.replace("%", ""));
          let axe = [0, 2].includes(index) ? y : x;
          return axe * (v / 100);
        } else if (val.endsWith("px")) {
          let v = parseFloat(val.replace("px", ""));
          return v;
        } else {
          return parseFloat(val);
        }
      });
      x += value[3];
      y += value[0];
    }
    return new Vector2(x, y);
  }

  handleStyle() {
    let parentTransform = this.component.parent?.transform;
    if (!parentTransform || this.style.layout === "absolute") {
      parentTransform = this.component.root.transform;
    }

    if (!this.component.isRoot) {
      this.component.transform.size = this.calculateSize(parentTransform);
      this.component.transform.position =
        this.calculatePosition(parentTransform);
    }
  }
}

export default UIStyleHandler;
