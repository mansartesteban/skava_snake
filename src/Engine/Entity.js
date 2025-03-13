import Component from "./Component";
import { v4 as uuid } from "uuid";
import TransformComponent from "./Components/TransformComponent";
import Observer from "./Observer";

class Entity {
  uuid = uuid();
  components = new Map();
  transform = new TransformComponent();
  scene;

  observer = new Observer({ SETUP_FINISHED: "SETUP_FINISHED" });

  constructor(...components) {
    components.forEach((component) => this.addComponent(component));
  }

  addComponent(component) {
    component.entity = this;
    component.setup();
    this.components.set(component.constructor, component);
  }

  removeComponent(component) {
    this.components.delete(component.constructor);
  }

  getComponent(component) {
    let componentClass =
      component instanceof Component ? component.constructor : component;
    return this.components.get(componentClass);
  }

  update(deltaTime, currentTime) {
    this.loop(deltaTime, currentTime);
    this.components.forEach((component) => {
      component.updateComponent(deltaTime, currentTime);
    });
  }

  loop(deltaTime, currentTime) {}
}

export default Entity;
