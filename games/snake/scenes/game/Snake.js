import Entity from "@/engine/Entity";

class Snake extends Entity {
  speed = 100;

  move(direction) {
    this.transform.position.add(direction);
  }
}

export default Snake;
