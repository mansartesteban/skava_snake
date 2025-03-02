import Component from "@/engine/Component";

class SnakeOptions extends Component {
  setup() {
    this.entity.options = { ...this.entity.options, ...this.options };
  }
}

export default SnakeOptions;
