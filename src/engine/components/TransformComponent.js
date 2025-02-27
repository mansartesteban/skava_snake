import Component from "../Component"
import Rotation from "../lib/Rotation"
import Vector2 from "../lib/Vector2"

class TransformComponent extends Component {
  position = new Vector2(0, 0);
  rotation = new Rotation();
  scale = new Vector2(1, 1);

  update() {}
}

export default TransformComponent;
