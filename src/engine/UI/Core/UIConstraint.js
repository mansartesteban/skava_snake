class UIConstraint {
  #value;
  #options;
  #constraintHandler;
  #setup = false;

  constructor(value, options) {
    this.#value = value;
    this.#options = options;
  }

  get value() {
    return this.#value;
  }

  get constraintHandler() {
    return this.#constraintHandler;
  }

  get options() {
    return this.#options;
  }

  get setup() {
    return this.#setup;
  }

  set setup(setup) {
    this.#setup = setup;
  }

  set constraintHandler(constraintHandler) {
    this.#constraintHandler = constraintHandler;
  }
}

export default UIConstraint;
