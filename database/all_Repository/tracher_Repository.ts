import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Teacher from "../models/teacher_collection";
import { ITeacher } from "../../utils/interfaces";

class TeacherRepository {
    async Created({ name, description, image, workExperience }: ITeacher) {
        const createdTeacher = new Teacher({
            name: name,
            description,
            image,
            workExperience
        })
        const teacherResult = await createdTeacher.save();
        return teacherResult
    }
    async Edit({ id, name, description, image, workExperience }: ITeacher) {
        const findCategory = await Teacher.findById(id);
        if (!findCategory) {
            throw new HttpError(["استاد مورد نظر یافت نشد!"], 422);
        }
        findCategory.description = description as string;
        findCategory.name = name as string;
        findCategory.image = image ? image : findCategory.image as string;
        findCategory.workExperience = workExperience as string;
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
        const teacher = await Teacher.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("courses");

        const totalTeacher = await Teacher.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalTeacher,
            data: teacher.map(item => item.toObject({ getters: true }))
        }
    }

    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedTeacher = await Teacher.findOneAndDelete({ _id: id });

        if (!deletedTeacher) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }

        return deletedTeacher;
    }
}

export default TeacherRepository;
