import UIComponent from "../Core/UIComponent";

class MainLayout extends UIComponent {

  setup() {
    this.root = this;
    this.copyViewerTransform();
  }

  copyViewerTransform() {
    this.transform.position.x = this.scene.viewer.origin.x;
    this.transform.position.y = this.scene.viewer.origin.y;
    this.transform.size.x = this.scene.viewer.size.x;
    this.transform.size.y = this.scene.viewer.size.y;
  }

  loop() {
      this.copyViewerTransform();
      super.loop()
  }
}

export default MainLayout;
