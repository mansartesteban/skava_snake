import Scene from "@/Engine/Scene";
import Card from "@/Engine/UI/UIComponents/Card/Card";
import Button from "@/Engine/UI/UIComponents/Button/Button";
import UIConstraintBlock from "@/Engine/UI/Core/UIConstraintBlock";
import PixelConstraint from "@/Engine/UI/Constraints/PixelConstraint";
import CenterConstraint from "@/Engine/UI/Constraints/CenterConstraint";
import RelativeConstraint from "@/Engine/UI/Constraints/RelativeConstraint";
import MainLayout from "@/Engine/UI/UIComponents/MainLayout";
import UIStyle from "@/Engine/UI/Core/UIStyle";
import RGB from "@/Engine/Lib/RGB";
import FillConstraint from "@/Engine/UI/Constraints/FillConstraint";
import Label from "@/Engine/UI/UIComponents/Label/Label";
import Div from "@/Engine/UI/UIComponents/Div/Div";
import AspectRatioConstraint from "@/Engine/UI/Constraints/AspectRatioConstraint";
import Controls from "@/Engine/Controls";
import UIManager from "@/Engine/UI/Core/UIManager";
import UIComponent from "@/Engine/UI/Core/UIComponent";

class MainMenu extends Scene {
  uiManager;

  add(entity) {
    super.add(entity);
    if (this.uiManager && this.uiManager instanceof UIManager) {
      if (entity instanceof UIComponent) {
        this.uiManager.add(entity)
      }
    }
  }

  setup() {
    // this.controls.onClick((e) => {
    //     console.log("click", e)
    // })

    this.uiManager = new UIManager();

    let mainLayout = new MainLayout(
      new UIStyle(
        {
          borderRadius: [10],
          margin: [10],
          fontSize: 24,
        },
        true
      )
    );
    this.add(mainLayout);

    let cardContainer = new Div(
      new UIStyle({
        color: new RGB(0xe5d1b6),
        borderRadius: [20],
      }),
      new UIConstraintBlock(
        new CenterConstraint(),
        new CenterConstraint(),
        new RelativeConstraint(0.5),
        new RelativeConstraint(0.5)
      )
    );
    let cardHeader = new Div(
      new UIStyle({
        color: new RGB(0xf3c258),
        borderRadius: [20, 20, 0, 0],
      }),
      new UIConstraintBlock(
        new CenterConstraint(),
        new PixelConstraint(0),
        new FillConstraint(),
        new PixelConstraint(64)
      )
    );
    let cardTitle = new Label(
      new UIConstraintBlock(
        new CenterConstraint(),
        new CenterConstraint(),
        new PixelConstraint(0),
        new PixelConstraint(0)
      )
    );
    cardTitle.setText("Skava - Snake");

    let closeButton = new Button(
      new UIStyle({
        color: RGB.Red,
      }),
      new UIConstraintBlock(
        new PixelConstraint(16, true),
        new PixelConstraint(16),
        new PixelConstraint(32),
        new PixelConstraint(32)
      )
    );

    // title.setText("Je suis un titre");
    // let title2 = new Label(
    //   new UIConstraintBlock(
    //     // new PixelConstraint(0),
    //     new CenterConstraint(),
    //     new CenterConstraint(),
    //     new PixelConstraint(0),
    //     // new FillConstraint(),
    //     // new PixelConstraint(30),
    //     new PixelConstraint(0)
    //   )
    // );
    // title2.setText("Je suis un second titre");
    // this.add(btn);

    mainLayout.addChild(cardContainer);
    cardContainer.addChild(cardHeader);
    cardHeader.addChild(cardTitle);
    cardHeader.addChild(closeButton);

    let set = false

    closeButton.addEventListener("click", (e) => {
        closeButton.setStyle({
            color: set ? RGB.Red : RGB.Green,
        })
        set = !set
    });

  }
}

export default MainMenu;
