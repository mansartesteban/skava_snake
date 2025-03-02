import ImplementError from "@errors/ImplementError"

class Command {
    entity = null;

    constructor(entity) {
        this.entity = entity
    }

    execute() {
        throw new ImplementError("execute", "Command")
    }
}

export default Command;