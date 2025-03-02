import UndefinedError from "@/application/errors/UndefinedError";
import Observer from "./Observer"
import Entity from "./Entity"

class EntityManager {
  static EVENTS = Object.freeze({
    ENTITY_ADDED: "ENTITY_ADDED",
    ENTITY_DELETED: "ENTITY_DELETED",
  });

  observer = new Observer(EntityManager.EVENTS);

  entities = [];
  scene = null;

  constructor(scene) {
    if (!scene) {
      throw new UndefinedError("scene");
    }
    this.scene = scene;
  }

  delete(entityToDelete) {
    let foundIndex = this.entities.findIndex((entity) => {
      if (typeof entityToDelete === "string") {
        return entity.uuid === entityToDelete;
      } else if (entityToDelete instanceof Entity) {
        return entity === entityToDelete;
      }
      return false;
    });

    if (foundIndex !== -1) {
      let entityFound = this.entities[foundIndex];

      this.observer.$emit(EntityManager.EVENTS.ENTITY_DELETED, entityFound);
      this.scene.threeScene.remove(entityFound.object);
      entityFound.object.remove();
      entityFound.object.clear();

      for (let i = entityFound.components.length - 1; i >= 0; i--) {
        entityFound.components.splice(i, 1);
      }

      delete this.entities[foundIndex];
      this.entities.splice(foundIndex, 1);
    }
  }

  add(entity) {

    if (entity.children) {
      entity.children.forEach((child) => this.add(child));
    }
    entity.setup()
    this.entities.push(entity);

    this.observer.$emit(EntityManager.EVENTS.ENTITY_ADDED, entity);
  }

  update(deltaTime, currentTime) {
    this.entities.forEach((entity) => entity.update(deltaTime, currentTime));
  }
}

export default EntityManager;
