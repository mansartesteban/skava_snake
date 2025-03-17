class WorldManager {

    map;

    helpers = new Map()

    constructor(map) {
        this.map = map
    }

    add(name, object) {
        if (!this.helpers.has(name)) {
            this.helpers.set(name, object)
        }
    }

    get(name) {
        return this.helpers.get(name)
    }

}

export default WorldManager