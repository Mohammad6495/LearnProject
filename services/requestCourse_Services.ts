import { Types } from "mongoose";
import RequestCourseRepository from "../database/all_Repository/requestCourse_Repository";

import {
  FormateData,
} from "../utils/utility";
import { IRequestCourse } from "../utils/interfaces";


class RequestCourseServices {
  private repository: RequestCourseRepository;

  constructor() {
    this.repository = new RequestCourseRepository();
  }

  async CreatedRequestCourse({ phoneNumber, favoriotArea, course }: IRequestCourse) {
    const createdRequestCourse = await this.repository.Created({ favoriotArea, phoneNumber, course });
    return FormateData({ data: createdRequestCourse.toObject({ getters: true }) });
  }

  async EditRequestCourse({ id, favoriotArea, phoneNumber, course }: IRequestCourse) {
    const editRequestCourse = await this.repository.Edit({ favoriotArea, id, phoneNumber, course });
    return FormateData({ data: editRequestCourse.toObject({ getters: true }) });
  }
  async GetRequestCourse(currentPage: string, pageSize: string, search: string) {
    const getRequestCourse = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getRequestCourse });
  }
  async DeleteRequestCourse(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default RequestCourseServices;
