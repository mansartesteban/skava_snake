import Entity from "@/engine/Entity"
import Vector2 from "@/engine/lib/Vector2"

class Food extends Entity {
    position = new Vector2()

    setup(scene) {
        // scene.add()
    }
 
    eat() {
        // this.position
    }

    loop() {
        this.transform.position = this.position.clone().multiply(this.scene.worldManager.map.tileSize).add(this.scene.map.tileSize/2)
    }
}

export default Food