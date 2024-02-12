import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import FamiliarService from "../models/familiarService_collection";
import { IFamiliarService } from "../../utils/interfaces";

class FamiliarServiceRepository {
    async Created({ phoneNumber, favoriotArea }: IFamiliarService) {
        const findFamiliarService = await FamiliarService.findOne({ phoneNumber: phoneNumber });
        if (findFamiliarService) {
            throw new HttpError(["بااین شماره تلفن قبلا درخواست ثبت شده است!"], 422);
        }
        const createdFamiliarService = new FamiliarService({
            phoneNumber: phoneNumber,
            favoriotArea: favoriotArea
        })
        const FamiliarServiceResult = await createdFamiliarService.save();
        return FamiliarServiceResult
    }
    async Edit({ id, favoriotArea, phoneNumber }: IFamiliarService) {
        const findFamiliarService = await FamiliarService.findById(id);
        if (!findFamiliarService) {
            throw new HttpError(["اطلاعات مورد نظر یافت نشد!"], 422);
        }
        findFamiliarService.phoneNumber = phoneNumber as string;
        findFamiliarService.favoriotArea = favoriotArea as string;
        const editResult = await findFamiliarService.save();
        return editResult;
    }
    async Get({ pageSize, currentPage, search }: { pageSize: string, currentPage: string, search: string }) {
        const limit = parseInt(pageSize) || 10;
        const skip = (parseInt(currentPage) - 1) * limit || 0;

        const searchCondition = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                ]
            }
            : {};
        const familiarService = await FamiliarService.find({ ...searchCondition})
            .skip(skip)
            .limit(limit)

        const totalFamiliarService = await FamiliarService.find({ }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalFamiliarService,
            data: familiarService.map(item => item.toObject({ getters: true }))
        }
    }

    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedFamiliarService = await FamiliarService.findOneAndDelete({ _id: id });

        if (!deletedFamiliarService) {
            throw new HttpError(["اطلاعات مورد نظر یافت نشد!"], 422);
        }

        return deletedFamiliarService;
    }
}

export default FamiliarServiceRepository;
