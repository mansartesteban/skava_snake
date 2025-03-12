import CommandOnce from "@/Engine/Commands/CommandOnce";

class Eat extends CommandOnce {
  key = "Space";

  constructor(entity) {
    super();
    this.entity = entity;
  }

  execute() {
    this.entity.food += 1;
  }
}

export default Eat;
