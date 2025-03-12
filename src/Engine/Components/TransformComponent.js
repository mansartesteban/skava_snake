import Component from "../Component"
import Rotation from "../Lib/Rotation"
import Vector2 from "../Lib/Vector2"

class TransformComponent extends Component {
  position = new Vector2(0, 0);
  rotation = new Rotation();
  scale = new Vector2(1, 1);
  size = new Vector2(0, 0)

  update() {}
}

export default TransformComponent;
