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
import AbsolutePixelConstraint from "@/Engine/UI/Constraints/AbsolutePixelConstraint";
import MarginPxConstraint from "@/Engine/UI/Constraints/MarginPxConstraint";
import RelativePercentConstraint from "@/Engine/UI/Constraints/RelativePercentConstraint";

class MainMenu extends Scene {
  uiManager;

  setup() {
    this.uiManager = new UIManager(this);

    let card = new Card();

    let card2 = new Card(
      new UIStyle({
        color: RGB.Green,
        margin: 8,
        height: "32px",
      })
    );

    card.addChild(card2);
    this.uiManager.mainLayout.addChild(card);
  }
}

export default MainMenu;
