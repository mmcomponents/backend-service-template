class Validation {
  constructor(fields) {
    this.fieldsNames = Object.keys(fields);
  }

  validate(req, res, next) {
    next();
  }
}
