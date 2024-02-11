import { check } from "express-validator";

class TeacherValidation {
  teacherValidation() {
    return [
      check("name", "نام و نام خانوادگی استاد اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default TeacherValidation 
