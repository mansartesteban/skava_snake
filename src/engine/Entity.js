import Component from "./Component"
import { v4 as uuid } from "uuid"
import TransformComponent from "./components/TransformComponent"

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
    this.components.set(component.name, component);
  }

  removeComponent(component) {
    this.components.delete(component.name)
  }

  getComponent(component) {
    let componentName = component instanceof Component ? component.name : component
    return this.components.get(componentName)
  }

  update(deltaTime) {
    this.components.forEach((component) => component.updateComponent(deltaTime));
  }

  initialize() {}
}

export default Entity;
