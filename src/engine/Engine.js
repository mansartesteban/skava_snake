import Observer from "./Observer"
import Timer from "./lib/Time/Timer"

const Events = {
  INITIALIZED: "INITIALIZED",
};

class Engine {
  project;
  observer;
  lastUpdate = 0

  fpsMeter;

  constructor() {
    this.observer = new Observer(Events);
    this.observer.$on(Events.INITIALIZED, this.loop.bind(this));
    this.timer = new Timer();

    this.fpsMeter = document.createElement("div")
    this.fpsMeter.classList.add("fps-meter")
    this.fpsMeter.setAttribute("last-update", "0")
    document.body.appendChild(this.fpsMeter)
  }

  setProject(project) {
    this.project = project;
    this.observer.$emit(Events.INITIALIZED);
  }

  async loop(currentTime = 0) {
    let deltaTimeFps = (currentTime - parseFloat(this.fpsMeter.getAttribute("last-update"))) / 1000
    let deltaTime = (currentTime - this.lastUpdate) / 1000
    
    if (deltaTimeFps > .02) {
      this.fpsMeter.innerText = (1 / deltaTime).toFixed()
      this.fpsMeter.setAttribute("last-update", currentTime+"")
    }
    if (this.project) {
      this.project.update(deltaTime);
    }
    this.lastUpdate = currentTime
    // await new Promise(r => setTimeout(r, 1000))
    window.requestAnimationFrame(this.loop.bind(this));
  }
}

export default Engine;
