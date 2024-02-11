import { check } from "express-validator";

class CourseValidation {
  courseValidation() {
    return [
      check("title", "عنوان دوره اجباری میباشد").not().isEmpty(),
      // check("image", "عکس دوره اجباری میباشد").not().isEmpty(),
      check("periodTime", "مدت زمان اجباری میباشد").not().isEmpty(),
      check("price", "قیمت دوره اجباری میباشد").not().isEmpty(),
      check("teacher", "انتخاب استاد دوره اجباری میباشد").not().isEmpty(),
      check("category", "انتخاب دسته بندی دوره اجباری میباشد").not().isEmpty(),
      check("eductional", "انتخاب آموزشگاه دوره اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default CourseValidation 
