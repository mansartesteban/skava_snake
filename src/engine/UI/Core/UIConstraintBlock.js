import WrongInstanceError from "@errors/WrongInstanceError";
import UIConstraint from "./UIConstraint";

class UIConstraintBlock {
  #xConstraint;
  #yConstraint;
  #widthConstraint;
  #heightConstraint;

  constructor(xConstraint, yConstraint, widthConstraint, heightConstraint) {
    this.setX(xConstraint)
    this.setY(yConstraint)
    this.setWidth(widthConstraint)
    this.setHeight(heightConstraint)
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
}

export default UIConstraintBlock;
