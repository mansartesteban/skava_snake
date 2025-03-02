import Component from "./Component";
import { v4 as uuid } from "uuid";
import TransformComponent from "./components/TransformComponent";

class Entity {
  uuid = uuid();
  name = "";
  components = new Map();

  transform = new TransformComponent();
  scene;

  constructor(...components) {
    this.selectable = true;
    components.forEach((component) => this.addComponent(component));
    this.initialize();
  }

  addComponent(component) {
    component.entity = this;
    component.refresh();
    this.components.set(component.constructor, component);
  }

  removeComponent(component) {
    this.components.delete(component.name);
  }

  getComponent(component) {
    let componentClass =
      component instanceof Component ? component.constructor : component;
    return this.components.get(componentClass);
  }

  update(deltaTime, currentTime) {
    this.loop();
    this.components.forEach((component) =>
      component.updateComponent(deltaTime, currentTime)
    );
  }

  loop() {}
  initialize() {}
}

export default Entity;
