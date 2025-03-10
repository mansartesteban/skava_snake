import Scene from "@/Engine/Scene";
import Card from "@/Engine/UI/UIComponents/Card/Card";
import Button from "@/Engine/UI/UIComponents/Button/Button";
import UIStyle from "@/Engine/UI/Core/UIStyle";
import RGB from "@/Engine/Lib/RGB";
import UIManager from "@/Engine/UI/Core/UIManager";

class MainMenu extends Scene {
  uiManager;

  setup() {
    this.uiManager = new UIManager(this);

    let card = new Card();

    let card2 = new Button(
      new UIStyle({
        color: RGB.Green,
        margin: 8,
        height: 32,
      })
    );
    let card3 = new Button(
      new UIStyle({
        color: RGB.Green,
        margin: 24,
        height: 64,
      })
    );

    card.addChild(card2);
    card.addChild(card3);
    this.uiManager.mainLayout.addChild(card);
  }
}

export default MainMenu;
