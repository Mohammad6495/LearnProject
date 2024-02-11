import { check } from "express-validator";

class RequestCourseValidation {
  requestCourseValidation() {
    return [
      check("phoneNumber", "شماره تلفن اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default RequestCourseValidation
