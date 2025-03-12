import WrongInstanceError from "@/Application/Errors/WrongInstanceError";
import UIConstraint from "./UIConstraint";
import Component from "@/Engine/Component";

class UIConstraintBlock extends Component {
  #xConstraint;
  #yConstraint;
  #widthConstraint;
  #heightConstraint;
  #paddingConstraint;
  #marginConstraint;

  constructor(
    xConstraint,
    yConstraint,
    widthConstraint,
    heightConstraint,
    paddingConstraint,
    marginConstraint
  ) {
    super();
    this.setX(xConstraint);
    this.setY(yConstraint);
    this.setWidth(widthConstraint);
    this.setHeight(heightConstraint);
    this.setPadding(paddingConstraint);
    this.setMargin(marginConstraint);
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
  get paddingConstraint() {
    return this.#paddingConstraint;
  }
  get marginConstraint() {
    return this.#marginConstraint;
  }

  setup() {}

  setX(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#xConstraint = constraint;
  }

  setY(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#yConstraint = constraint;
  }

  setWidth(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#widthConstraint = constraint;
  }

  setHeight(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#heightConstraint = constraint;
  }

  setPadding(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#paddingConstraint = constraint;
  }

  setMargin(constraint) {
    if (!(constraint instanceof UIConstraint)) {
      throw new WrongInstanceError(constraint, UIConstraint);
    }

    constraint.constraintManager = this;
    this.#marginConstraint = constraint;
  }
}

export default UIConstraintBlock;
