import Vector2 from "../Lib/Vector2";
import CanvasRenderer from "../Renderers/CanvasRenderer";

class Viewer2d {
  options;
  node;
  renderer;
  size = new Vector2();
  origin = new Vector2();

  constructor(node, options) {
    this.node = node;
    this.options = { ...this.options, ...options };

    this.renderer = new CanvasRenderer(this.options);
    this.size = this.options.size;
    this.render();
  }

  get ctx() {
    return this.renderer.ctx;
  }

  center() {
    this.origin = this.size.clone().divide(2);
    this.ctx.translate(this.origin.x, this.origin.y);
  }

  render() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.node.appendChild(this.renderer.domElement);
  }

  refresh() {
    // this.size.x = window.innerWidth;
    // this.size.y = window.innerHeight;
    // this.renderer.domElement.width = this.size.x;
    // this.renderer.domElement.height = this.size.y;
    this.ctx.clearRect(
      -this.size.x / 2,
      -this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}

export default Viewer2d;
