import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Eductional from "../models/eductional_collection";
import {  IEductional } from "../../utils/interfaces";

class EductionalRepository {
    async Created({ name, description }: IEductional) {
        const createdEductional = new Eductional({
            name: name,
            description: description
        })
        const EductionalResult = await createdEductional.save();
        return EductionalResult
    }
    async Edit({ id, name, description }: IEductional) {
        const findCategory = await Eductional.findById(id);
        if (!findCategory) {
            throw new HttpError(["آموزشگاه مورد نظر یافت نشد!"], 422);
        }
        findCategory.name = name as string;
        findCategory.description = description as string;
        const editResult = await findCategory.save();
        return editResult;
    }
    async Get({ pageSize, currentPage, search }: { pageSize: string, currentPage: string, search: string }) {
        const limit = parseInt(pageSize) || 10;
        const skip = (parseInt(currentPage) - 1) * limit || 0;

        const searchCondition = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                ]
            }
            : {};
        const eductional = await Eductional.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const totalEductional = await Eductional.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalEductional,
            data: eductional.map(item => item.toObject({ getters: true }))
        }
    }

    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if(!validObjectId) {
           throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedEductional = await Eductional.findOneAndDelete({ _id: id });

        if (!deletedEductional) {
            throw new HttpError(["آموزشگاه مورد نظر یافت نشد!"], 422);
        }

        return deletedEductional;
    }
}

export default EductionalRepository;
