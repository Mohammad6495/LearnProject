import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Teacher from "../models/teacher_collection";
import {  ITeacher } from "../../utils/interfaces";

class TeacherRepository {
    async Created({ name }: ITeacher) {
        const createdTeacher = new Teacher({
            name: name
        })
        const teacherResult = await createdTeacher.save();
        return teacherResult
    }
    async Edit({ id, name }: ITeacher) {
        const findCategory = await Teacher.findById(id);
        if (!findCategory) {
            throw new HttpError(["استاد مورد نظر یافت نشد!"], 422);
        }
        findCategory.name = name as string;
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
        if(!validObjectId) {
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
