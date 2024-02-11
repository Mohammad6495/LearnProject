import { check } from "express-validator";

class EductionalValidation {
  eductionalValidation() {
    return [
      check("name", "عنوان آموزشگاه اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default EductionalValidation 
