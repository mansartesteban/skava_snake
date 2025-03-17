// Engine imports
import { Component } from "skava-engine/Core";

class SnakeOptions extends Component {
  setup() {
    this.entity.options = { ...this.entity.options, ...this.options };
  }
}

export default SnakeOptions;
