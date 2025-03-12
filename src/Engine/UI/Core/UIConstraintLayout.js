import WrongInstanceError from "@/Application/Errors/WrongInstanceError";
import UIConstraint from "./UIConstraint";
import Component from "@/Engine/Component";

class UIConstraintHandler extends Component {
  #xConstraint;
  #yConstraint;
  #widthConstraint;
  #heightConstraint;
  #marginConstraint;
  #paddingConstraint;

  constructor(
    xConstraint,
    yConstraint,
    widthConstraint,
    heightConstraint,
    marginConstraint,
    paddingConstraint
  ) {
    super();
    xConstraint && this.setX(xConstraint);
    yConstraint && this.setY(yConstraint);
    widthConstraint && this.setWidth(widthConstraint);
    heightConstraint && this.setHeight(heightConstraint);
    marginConstraint && this.setMargin(marginConstraint);
    paddingConstraint && this.setPadding(paddingConstraint);
  }

  get xConstraint() {
    return this.#xConstraint;
  }
  get yConstraint() {
    return this.#yConstraint;
  }
  get widthConstraint() {
    return this.#widthConstraint;
  }
  get heightConstraint() {
    return this.#heightConstraint;
  }
  get marginConstraint() {
    return this.#marginConstraint;
  }
  get paddingConstraint() {
    return this.#paddingConstraint;
  }

  setup() {}

  setX(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#xConstraint = constraint;
  }

  setY(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#yConstraint = constraint;
  }

  setWidth(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#widthConstraint = constraint;
  }

  setHeight(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#heightConstraint = constraint;
  }

  setMargin(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#marginConstraint = constraint;
  }

  setPadding(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintHandler = this;
    this.#paddingConstraint = constraint;
  }
}

export default UIConstraintHandler;
