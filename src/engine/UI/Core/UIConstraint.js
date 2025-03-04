class UIConstraint {
  #value;
  #options;
  #constraintManager;

  constructor(value, options) {
    this.#value = value;
    this.#options = options
  }

  get value() {
    return this.#value;
  }

  get constraintManager() {
    return this.#constraintManager
  }

  get options() {
    return this.#options
  }

  set constraintManager(constraintManager) {
    this.#constraintManager = constraintManager;
  }
}

export default UIConstraint;
