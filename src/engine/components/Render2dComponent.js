import ImplementError from "@errors/ImplementError"
import Component from "../Component"


class Render2DComponent extends Component {
  constructor(options) {
    super();
    this.options = {
      updateFrequency: 16,
    };
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  update(deltaTime) {
    this.render(this.entity.scene.viewer);
  }

  render(_) {
    throw new ImplementError("render", "RenderComponent");
  }
}

export default Render2DComponent;
