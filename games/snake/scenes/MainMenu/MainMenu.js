import Scene from "@/Engine/Scene";
import Card from "@/Engine/UI/UIComponents/Card/Card";
import Button from "@/Engine/UI/UIComponents/Button/Button";
import UIStyle from "@/Engine/UI/Core/UIStyle";
import RGB from "@/Engine/Lib/RGB";
import UIManager from "@/Engine/UI/Core/UIManager";
import Label from "@/Engine/UI/UIComponents/Label/Label";

class MainMenu extends Scene {
  uiManager;

  setup() {
    this.uiManager = new UIManager(this);

    let card = new Card(
      new UIStyle({
        color: RGB.Yellow,
        margin: 32,
        // TODO direction: "horizontal",
      })
    );

    let validateButton = new Button(
      new UIStyle({
        color: RGB.Green,
        margin: [16],
        height: 48,
        borderRadius: 8,
      })
    );
    let validateLabel = new Label(
      new UIStyle({
        margin: 4,
      })
    );
    validateLabel.setText("Valider");
    validateButton.addChild(validateLabel);

    let cancelButton = new Button(
      new UIStyle({
        color: RGB.Red,
        margin: 16,
        height: 48,
        borderRadius: 8,
        // margin: ["50%"],
      })
    );
    let cancelLabel = new Label(
      new UIStyle({
        margin: 4,
      })
    );
    cancelLabel.setText("Annuler");
    cancelButton.addChild(cancelLabel);

    let closeButton = new Button(
      new UIStyle({
        color: RGB.Red,
        width: 32,
        height: 32,
        margin: 8,
      })
    );

    card.addChild(cancelButton);
    card.addChild(validateButton);
    card.addChild(closeButton, "header");

    cancelButton.addEventListener("click", (e) => {
      console.log("Cancel button clicked", e);
    });
    validateButton.addEventListener("click", (e) => {
      console.log("Validate button clicked", e);
      validateButton.getComponent(UIStyle).color = RGB.Cyan;
    });

    this.uiManager.mainLayout.addChild(card);
  }
}

export default MainMenu;
