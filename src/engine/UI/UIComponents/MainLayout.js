import UIComponent from "../Core/UIComponent";
import UIStyle from "../Core/UIStyle";

class MainLayout extends UIComponent {
  toProcess = [];
  setup() {
    this.root = this;
    super.setup();
    this.copyViewerTransform();
  }

  addChild(component) {
    component.root = this.root;
    component.scene = this.scene;

    component.getComponent(UIStyle).setDefaultStyle(this.getComponent(UIStyle));
    this.scene.add(component);
    while (component.pendingTree.length > 0) {
      let toHandle = component.pendingTree.shift();
      toHandle.getComponent(UIStyle).styleHandler.indexInParent =
        component.tree.length;
      component.tree.push(toHandle);
    }
    component.tree.forEach((ch) => this.addChild(ch));
    return this;
  }

  copyViewerTransform() {
    this.transform.position.x = this.scene.viewer.origin.x;
    this.transform.position.y = this.scene.viewer.origin.y;
    this.transform.size.x = this.scene.viewer.size.x;
    this.transform.size.y = this.scene.viewer.size.y;
  }

  loop() {
    this.copyViewerTransform();
    super.loop();
  }
}

export default MainLayout;
