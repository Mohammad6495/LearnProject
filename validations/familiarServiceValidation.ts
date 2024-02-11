import { check } from "express-validator";

class FamiliarServiceValidation {
  familiarServiceValidation() {
    return [
      check("phoneNumber", "شماره تلفن اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default FamiliarServiceValidation
