import { Types } from "mongoose";
import EductionalRepository from "../database/all_Repository/eductional_Repository";

import {
  FormateData,
} from "../utils/utility";


class EductionalServices {
  private repository: EductionalRepository;

  constructor() {
    this.repository = new EductionalRepository();
  }

  async CreatedEductional(name: string, description: string) {
    const createdEductional = await this.repository.Created({ name, description });
    return FormateData({ data: createdEductional.toObject({ getters: true }) });
  }

  async EditEductional(name: string, id: string, description:string) {
    const editEductional = await this.repository.Edit({ name, id, description });
    return FormateData({ data: editEductional.toObject({ getters: true }) });
  }
  async GetEductional(currentPage: string, pageSize: string, search: string) {
    const getEductional = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getEductional });
  }
  async DeleteEductional(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default EductionalServices;
