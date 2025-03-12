import WrongInstanceError from "@/Application/Errors/WrongInstanceError";
import UIStyle from "./UIStyle";
import Vector2 from "@/Engine/Lib/Vector2";

class UIStyleHandler {
  #component;

  #style;
  indexInParent = 0;

  datas = {
    size: new Vector2(),
    margin: [0, 0, 0, 0],
  };

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

  set style(style) {
    this.#style = style;
  }

  set component(component) {
    this.#component = component;
  }

  autoHeightParent(parent, current) {
    let parentStyle = parent.getComponent(UIStyle);
    let currentStyle = current.getComponent(UIStyle);
    if (parentStyle.height === "auto") {
      parentStyle.styleHandler.datas.size.y =
        currentStyle.styleHandler.getNextFreePosition(parent).y;
      parent.transform.size.y =
        currentStyle.styleHandler.getNextFreePosition(parent).y;
      // TODO parent.transform.size.x = this.getNextFreePosition().x;
    }

    current = parent;
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

    this.datas.size.x = x;
    this.datas.size.y = y;

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
          let axe = [0, 2].includes(index)
            ? parentTransform.size.y
            : parentTransform.size.x;
          return axe * (v / 100);
        } else if (val.endsWith("px")) {
          let v = parseFloat(val.replace("px", ""));
          return v;
        } else {
          return parseFloat(val);
        }
      });
      if (this.style.direction === "vertical") {
        // if (x + value[1] + value[3] > parentTransform.size.x) {
        x -= value[1] + value[3];
        // } else {
        // }
      } else if (this.style.direction === "horizontal") {
        y -= value[0] + value[2];
      }
      this.datas.margin = value;
    }

    return new Vector2(Math.max(0, x), Math.max(0, y));
  }

  getNextFreePosition(component, index) {
    let nextFreePosition = new Vector2();
    if (component) {
      let componentStyle = component.getComponent(UIStyle);
      let children = component.tree;
      if (index !== undefined) {
        children = children.slice(0, index);
      }
      children.forEach((child) => {
        let childDatas = child.getComponent(UIStyle).styleHandler.datas;
        if (componentStyle.direction === "vertical") {
          nextFreePosition.y += childDatas.size.y;
          nextFreePosition.y += childDatas.margin[0] + childDatas.margin[2];
        } else {
          nextFreePosition.x += child.size.x;
          nextFreePosition.x += childDatas.margin[1] + childDatas.margin[3];
        }
      });
    }
    return nextFreePosition;
  }

  calculatePosition(parentTransform) {
    let x =
      parentTransform.position.x +
      (this.style.direction === "horizontal"
        ? this.getNextFreePosition(this.#component.parent, this.indexInParent)
            .x || 0
        : 0);
    let y =
      parentTransform.position.y +
      (this.style.direction === "vertical"
        ? this.getNextFreePosition(this.#component.parent, this.indexInParent)
            .y || 0
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
          let axe = [0, 2].includes(index)
            ? parentTransform.size.y
            : parentTransform.size.x;
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

    let parentStyle = this.parent.getComponent(UIStyle);
    if (parentStyle.align && parentStyle.align === "center") {
      if (parentStyle.direction === "horizontal") {
        y +=
          parentTransform.size.y / 2 -
          this.component.transform.size.y / 2 -
          this.datas.margin[0] / 2 -
          this.datas.margin[2] / 2;
      } else {
        x +=
          parentTransform.size.x / 2 -
          this.component.transform.size.x / 2 -
          this.datas.margin[1] / 2 -
          this.datas.margin[3] / 2;
      }
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

    if (
      this.component.parent &&
      this.component.parent !== this.component.root
    ) {
      this.autoHeightParent(
        this.component.parent || this.component.root,
        this.component
      );
    }
  }
}

export default UIStyleHandler;
