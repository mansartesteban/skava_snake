import UndefinedError from "@/Application/Errors/UndefinedError";
import Observer from "./Observer";
import Entity from "./Entity";

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

      for (let i = entityFound.components.length - 1; i >= 0; i--) {
        entityFound.components.splice(i, 1);
      }

      delete this.entities[foundIndex];
      this.entities.splice(foundIndex, 1);
    }
  }

  add(entity, executeSetup = true) {
    entity.scene = this.scene;
    if (entity.children) {
      entity.children.forEach((child) => this.add(child));
    }
    if (executeSetup) {
      Promise.resolve(entity.setup()).then(() => {
        entity.observer.$emit("SETUP_FINISHED");
      });
    }
    this.entities.push(entity);

    this.observer.$emit(EntityManager.EVENTS.ENTITY_ADDED, entity);
  }

  update(deltaTime, currentTime) {
    this.entities.forEach((entity) => entity.update(deltaTime, currentTime));
  }
}

export default EntityManager;
