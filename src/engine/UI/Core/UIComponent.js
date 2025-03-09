import WrongInstanceError from "@errors/WrongInstanceError";
import UIRenderer from "./UIRenderer";
import Entity from "@/Engine/Entity";
import TransformComponent from "@/Engine/Components/TransformComponent";
import UIStyle from "./UIStyle";
import UIManager from "./UIManager";
import Observer from "@/Engine/Observer";
import Vector2 from "@/Engine/Lib/Vector2";
import UIStyleHandler from "./UIStyleHandler";
import { getProperties } from "@/Engine/Lib/Objet";

class UIComponent extends Entity {
  #renderer;
  #parent;
  #children = [];
  #root;
  #tree = [];
  #pendingTree = [];
  setupDone = false;

  uiManager;

  datas = {
    origin: new Vector2(),
    nextPosition: new Vector2(),
    defaultSlot: null,
  };
  slots = new Map();

  eventObserver = new Observer({
    click: "click",
  });

  transform = new TransformComponent();

  get parent() {
    return this.#parent;
  }

  get children() {
    return this.#children;
  }

  get root() {
    return this.#root;
  }

  get isRoot() {
    return this.root === this;
  }

  get tree() {
    return this.#tree;
  }

  get pendingTree() {
    return this.#pendingTree;
  }

  set parent(parent) {
    this.#parent = parent;
  }

  set root(root) {
    this.#root = root;
  }

  set tree(tree) {
    this.tree = tree;
  }

  constructor(...components) {
    super(...components);
    let uiStyle = components.find((component) => component instanceof UIStyle);
    if (!uiStyle) {
      this.addComponent(new UIStyle());
    }
  }

  setup() {
    this.setupDone = true;

    // while (this.pendingTree.length > 0) {
    //   this.addChild(this.pendingTree.shift());
    // }
    // this.#tmpTree = this.#tree;
    // this.#tree = [];
    // this.root =
    // if (this.root !== this) {
    // this.getComponent(UIStyle).styleHandler.handleStyle();
    // }
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

  setSlot(name, component) {
    this.slots.set(name, component);
  }

  setDefaultSlot(child) {
    this.setSlot("default", child);
  }

  setDefaultStyle(uiComponent) {
    uiComponent
      .getComponent(UIStyle)
      .setDefaultStyle(this.getComponent(UIStyle));
  }

  addChild(component) {
    component.parent = this;
    component.uiManager = this.uiManager;

    component.getComponent(UIStyle).styleHandler.indexInParent =
      this.#tree.length;

    if (this.setupDone) {
      this.#tree.push(component);
    } else {
      this.#pendingTree.push(component);
    }

    return this;
  }

  addEventListener(type, callback) {
    this.eventObserver.$on(type, callback);
  }

  trigger(type, ...parameters) {
    this.eventObserver.$emit(type, ...parameters);
  }

  loop(deltaTime, currentTime) {
    this.#renderer?.loop();
    this.#renderer?.render(this.scene.viewer, deltaTime, currentTime);
  }
}
export default UIComponent;
