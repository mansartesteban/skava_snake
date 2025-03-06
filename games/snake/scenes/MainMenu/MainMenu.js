import Scene from "@/Engine/Scene";
import Card from "@/Engine/UI/UIComponents/Card/Card";
import Button from "@/Engine/UI/UIComponents/Button/Button";
import UIConstraintBlock from "@/Engine/UI/Core/UIConstraintBlock";
import MainLayout from "@/Engine/UI/UIComponents/MainLayout";
import UIStyle from "@/Engine/UI/Core/UIStyle";
import RGB from "@/Engine/Lib/RGB";
import Label from "@/Engine/UI/UIComponents/Label/Label";
import Div from "@/Engine/UI/UIComponents/Div/Div";
import UIManager from "@/Engine/UI/Core/UIManager";
import UIComponent from "@/Engine/UI/Core/UIComponent";
import PhysicComponent from "./PhysicComponent";
import ShakeAnimation from "@/Engine/UI/Animations/ShakeAnimation";
import RelativePixelConstraint from "@/Engine/UI/Constraints/RelativePixelConstraint";
import RelativeCenterConstraint from "@/Engine/UI/Constraints/RelativeCenterConstraint";
import AbsolutePercentConstraint from "@/Engine/UI/Constraints/AbsolutePercentConstraint";
import UIConstraintHandler from "@/Engine/UI/Core/UIConstraintLayout";
import AbsolutePixelConstraint from "@/Engine/UI/Constraints/AbsolutePixelConstraint"
import MarginPxConstraint from "@/Engine/UI/Constraints/MarginPxConstraint"
import RelativePercentConstraint from "@/Engine/UI/Constraints/RelativePercentConstraint"

class MainMenu extends Scene {
  uiManager;

  add(entity) {
    super.add(entity);
    if (this.uiManager && this.uiManager instanceof UIManager) {
      if (entity instanceof UIComponent) {
        this.uiManager.add(entity);
      }
    }
  }

  setup() {

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


    // for (let i = 0 ;  i < 10000 ; i++) {
    // let container = new Div(
    //   new UIStyle({
    //     color: new RGB(0xe5d1b6),
    //     borderRadius: [20],
    //   }),
    //   new UIConstraintHandler(
    //     new RelativeCenterConstraint(),
    //     // new RelativePixelConstraint(i),
    //     // new RelativePixelConstraint(i),
    //     // new AbsolutePixelConstraint(100),
    //     new AbsolutePixelConstraint(100),
    //     new AbsolutePercentConstraint(0.5),
    //     new AbsolutePixelConstraint(100),
    //     new MarginPxConstraint([10, 30]),
    //     // new RelativePixelConstraint(10)
    //   )
    // );

    // mainLayout.addChild(container);
  // }

    let cardContainer = new Div(
      new UIStyle({
        color: new RGB(0xe5d1b6),
        borderRadius: [20],
      }),
      new UIConstraintHandler(
        new RelativeCenterConstraint(),
        new RelativeCenterConstraint(null, { refresh: false }),
        new RelativePercentConstraint(0.5),
        new RelativePercentConstraint(0.5)
      )
    );
    let cardHeader = new Div(
      new UIStyle({
        color: new RGB(0xf3c258),
        borderRadius: [20, 20, 0, 0],
      }),
      new UIConstraintHandler(
        new RelativeCenterConstraint(),
        new RelativePixelConstraint(0),
        new RelativePercentConstraint(1),
        new AbsolutePixelConstraint(64)
      )
    );
    let cardTitle = new Label(
      new UIConstraintHandler(
        new RelativeCenterConstraint(),
        new RelativeCenterConstraint(),
        new AbsolutePixelConstraint(0),
        new AbsolutePixelConstraint(0)
      )
    );
    cardTitle.setText("Skava - Snake");

    let closeButton = new Button(
      new UIStyle({
        color: RGB.Red,
      }),
      new UIConstraintHandler(
        new RelativePixelConstraint(16, true),
        new RelativePixelConstraint(16),
        new AbsolutePixelConstraint(32),
        new AbsolutePixelConstraint(32)
      )
    );

    let cardBody = new Div(
      new UIStyle({
        color: new RGB(0xF87075)
      }),
      new UIConstraintHandler(
        new RelativePixelConstraint(0),
        new RelativePixelConstraint(64),
        new RelativePercentConstraint(1),
        new AbsolutePixelConstraint(64),
        new MarginPxConstraint(8)
      )
    )

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
    
    cardContainer.addChild(cardBody);

    let set = false

    cardHeader.addEventListener("click", (e) => {
      console.log("cliedk?", e)
        closeButton.setStyle({
            color: set ? RGB.Red : RGB.Green,
        })
        set = !set
    });
  }
}

export default MainMenu;
