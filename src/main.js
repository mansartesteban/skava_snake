import "@/application/assets/styles/reset.css";
import "@/application/assets/styles/engine.css";
import "@/application/assets/styles/main.css";

import Application from "./application/Application"
import Snake from "@/../games/snake/index"

Application.start().then(() => Application.loadProject(Snake));
