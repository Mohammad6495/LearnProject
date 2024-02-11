import { Types } from "mongoose";
import TeacherRepository from "../database/all_Repository/tracher_Repository";

import {
  FormateData,
} from "../utils/utility";


class TeacherServices {
  private repository: TeacherRepository;

  constructor() {
    this.repository = new TeacherRepository();
  }

  async CreatedTeacher(name: string) {
    const createdTeacher = await this.repository.Created({ name });
    return FormateData({ data: createdTeacher.toObject({ getters: true }) });
  }

  async EditTeacher(name: string, id: string) {
    const editTeacher = await this.repository.Edit({ name, id });
    return FormateData({ data: editTeacher.toObject({ getters: true }) });
  }
  async GetTeacher(currentPage: string, pageSize: string, search: string) {
    const getTeacher = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getTeacher });
  }
  async DeleteTeacher(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default TeacherServices;
