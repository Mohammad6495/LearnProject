import { Types } from "mongoose";
import CourseRepository from "../database/all_Repository/course_Repository";

import {
  FormateData,
} from "../utils/utility";
import { ICourse } from "../utils/interfaces";


class CourseServices {
  private repository: CourseRepository;

  constructor() {
    this.repository = new CourseRepository();
  }

  async CreatedCourse({
    title,
    description,
    periodTime,
    dayHolding,
    timeHolding,
    image,
    category,
    courseConditions,
    eductional,
    headLines,
    price,
    isAvailable,
    teacher
  }: ICourse) {
    const createdCourse = await this.repository.Created({
      title,
      description,
      periodTime,
      dayHolding,
      timeHolding,
      image,
      category,
      courseConditions,
      eductional,
      headLines,
      price,
      teacher,
      isAvailable
    });
    return FormateData({ data: createdCourse.toObject({ getters: true }) });
  }

  async EditCourse({
    id,
    title,
    description,
    periodTime,
    dayHolding,
    timeHolding,
    image,
    category,
    courseConditions,
    eductional,
    headLines,
    price,
    teacher,
    isAvailable
  }: ICourse) {
    const editCourse = await this.repository.Edit({
      id,
      title,
      description,
      periodTime,
      dayHolding,
      timeHolding,
      image,
      category,
      courseConditions,
      eductional,
      headLines,
      price,
      isAvailable,
      teacher
    });
    return FormateData({ data: editCourse.toObject({ getters: true }) });
  }
  async GetCourse(currentPage: string, pageSize: string, search: string) {
    const getCourse = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getCourse });
  }
  async GetCourseClient(
    currentPage: string,
    pageSize: string,
    search: string,
    categoryId: string,
    courseConditions: string
  ) {
    const getCourse = await this.repository.GetAll(currentPage, pageSize, search, categoryId, courseConditions);
    return FormateData({ data: getCourse });
  }
  async DeleteCourse(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
  async ChangeIsAvailableCourse(id: Types.ObjectId) {
    const data = await this.repository.ChangeIsAvailable({ id });
    return FormateData({ data: data });
  }
  async DetailsCourse(id: Types.ObjectId) {
    const data = await this.repository.FindCourse(id);
    return FormateData({ data: data.toObject({ getters: true }) });
  }
}

export default CourseServices;
