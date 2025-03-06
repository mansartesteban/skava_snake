import WrongInstanceError from "@errors/WrongInstanceError";
import UIRenderer from "./UIRenderer";
import Entity from "@/Engine/Entity";
import UIConstraintBlock from "./UIConstraintBlock";
import TransformComponent from "@/Engine/Components/TransformComponent";
import UIStyle from "./UIStyle"
import UIManager from "./UIManager"
import Observer from "@/Engine/Observer"
import Vector2 from "@/Engine/Lib/Vector2"

class UIComponent extends Entity {
  #renderer;
  #parent;
  #children = [];
  #root;

  uiManager;

  datas = {
    nextFreePosition: new Vector2()
  }

  eventObserver = new Observer({
    click: "click"
  })

  transform = new TransformComponent();

  get parent() {
    return this.#parent;
  }

  get children() {
    return this.#children
  }

  get root() {
    return this.#root
  }

  set parent(parent) {
    this.#parent = parent;
  }

  set root(root) {
    this.#root = root;
  } 

  addRenderer(renderer) {
    if (!(renderer instanceof UIRenderer)) {
      throw new WrongInstanceError(renderer, UIRenderer);
    }

    renderer.uiComponent = this;
    renderer.setup();
    this.#renderer = renderer;
    return this;
  }

  addChild(child) {
    child.parent = this;
    child.root = this.#root;
    child.scene = this.scene
    child.uiManager = this.uiManager
    this.scene.add(child)
    child.setup()
    this.#children.push(child);
    if (this.uiManager && this.uiManager instanceof UIManager) {
      this.uiManager.add(child)
    }
    return this;
  }

  setStyle(style) {
    let styleComponent = this.getComponent(UIStyle)

    if (!styleComponent) {
      style = new UIStyle(style)
      this.addComponent(style)
    } else {
      styleComponent.setStyle(style)
    }
  }

  addEventListener(type, callback) {
    this.eventObserver.$on(type, callback)
  }

  trigger(type, ...parameters) {
    this.eventObserver.$emit(type, ...parameters)
  }

  drag(position) {}

  loop(deltaTime, currentTime) {
    this.#renderer?.loop();
    this.#renderer?.render(this.scene.viewer, deltaTime, currentTime);
    // this.#children.forEach(child => child.loop(deltaTime, currentTime))
  }
}
export default UIComponent;
