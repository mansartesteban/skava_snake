import Renderer from "./Renderer"

class CanvasRenderer extends Renderer {
  
    options;
    domElement;
  
  constructor(options) {
    super()
    this.options = options;
    this.createDomElement();
  }

  get ctx() {
    return this.domElement?.getContext("2d");
  }

  createDomElement() {
    this.domElement = document.createElement("canvas")
    this.domElement.width = this.options.size.x
    this.domElement.height = this.options.size.y
  }

}

export default CanvasRenderer;
