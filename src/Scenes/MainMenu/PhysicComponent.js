// Engine imports
import { Component, Vector2 } from "skava-engine/Core";

class PhysicComponent extends Component {
  velocity = new Vector2();
  gravity = new Vector2(0, 9.81);

  loop(deltaTime) {
    this.velocity.add(this.gravity.clone().multiply(deltaTime));
    this.entity.transform.position.add(
      this.velocity.clone().multiply(deltaTime)
    );
  }
}

export default PhysicComponent;
