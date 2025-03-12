export const ERRORS = {
  IMPLEMENT: "The given parameter is not of type '%1'. %2 given.",
};

class WrongInstanceError extends Error {
  constructor(parameter, constructor) {
    let message = ERRORS.IMPLEMENT.replace("%1", constructor.name).replace("%2", parameter.constructor.name);
    super(message);
    this.name = self.toString();
  }
}

export default WrongInstanceError;
