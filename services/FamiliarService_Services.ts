import { Types } from "mongoose";
import FamiliarServiceRepository from "../database/all_Repository/familiarService_Repository";

import {
  FormateData,
} from "../utils/utility";
import { IFamiliarService } from "../utils/interfaces";


class FamiliarServiceServices {
  private repository: FamiliarServiceRepository;

  constructor() {
    this.repository = new FamiliarServiceRepository();
  }

  async CreatedFamiliarService({ phoneNumber, favoriotArea }: IFamiliarService) {
    const createdFamiliarService = await this.repository.Created({ favoriotArea, phoneNumber });
    return FormateData({ data: createdFamiliarService.toObject({ getters: true }) });
  }

  async EditFamiliarService({ id, favoriotArea, phoneNumber }: IFamiliarService) {
    const editFamiliarService = await this.repository.Edit({ favoriotArea, id, phoneNumber });
    return FormateData({ data: editFamiliarService.toObject({ getters: true }) });
  }
  async GetFamiliarService(currentPage: string, pageSize: string, search: string) {
    const getFamiliarService = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getFamiliarService });
  }
  async DeleteFamiliarService(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default FamiliarServiceServices;
