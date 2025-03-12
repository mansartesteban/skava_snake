import "@/application/assets/styles/reset.css";
import "@/application/assets/styles/engine.css";
import "@/application/assets/styles/main.css";

import Application from "@/Application/Application";
import Snake from "@/../Games/Snake/index";

Application.start().then(() => Application.loadProject(Snake));
