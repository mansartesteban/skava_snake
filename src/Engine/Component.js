class Component {
  options = {};
  active = true;
  entity = null;

  constructor(options) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
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
