import CanvasRenderer from "../renderers/CanvasRenderer"
 
class Viewer2d {
  options;
  node;
  renderer;

  constructor(node, options) {
    this.node = node;
    this.options = { ...this.options, ...options };

    this.renderer = new CanvasRenderer(this.options)
    this.render();
  }

  get ctx() {
    return this.renderer.ctx
  }

  render() {
    this.ctx.translate(this.options.size.x / 2, this.options.size.y / 2);
    this.ctx.clearRect(0, 0, this.options.size.x, this.options.size.y);
    this.node.appendChild(this.renderer.domElement)
  }

  refresh() {
    this.ctx.clearRect(
      -this.options.size.x / 2,
      -this.options.size.y / 2,
      this.options.size.x,
      this.options.size.y
    );
  }
}

export default Viewer2d;
