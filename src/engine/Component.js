class Component {
  options = {};
  active = true;
  entity = null;
  needsUpdate = false;

  constructor(options) {
    if (options) {
      this.options = { ...this.options, ...options };
    }

    queueMicrotask(() => this.setup());
  }

  updateComponent(deltaTime, currentTime) {
    if (this.active) {
      this.loop(deltaTime, currentTime);
    }
  }

  loop(deltaTime, currentTime) {}

  refresh() {}
  setup() {}
}

export default Component;
