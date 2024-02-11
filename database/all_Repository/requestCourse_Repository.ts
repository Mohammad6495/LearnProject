import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import RequestCourse from "../models/requestCourse_collection";
import { IRequestCourse } from "../../utils/interfaces";

class RequestCourseRepository {
    async Created({ phoneNumber, favoriotArea, course }: IRequestCourse) {
        const findRequestCourse = await RequestCourse.findOne({ phoneNumber: phoneNumber });
        if (findRequestCourse) {
            throw new HttpError(["بااین شماره تلفن قبلا درخواست ثبت شده است!"], 422);
        }
        const createdRequestCourse = new RequestCourse({
            phoneNumber: phoneNumber,
            favoriotArea: favoriotArea,
            course: course
        })
        const RequestCourseResult = await createdRequestCourse.save();
        return RequestCourseResult
    }
    async Edit({ id, favoriotArea, phoneNumber, course }: IRequestCourse) {
        const findRequestCourse = await RequestCourse.findById(id);
        if (!findRequestCourse) {
            throw new HttpError(["اطلاعات مورد نظر یافت نشد!"], 422);
        }
        findRequestCourse.phoneNumber = phoneNumber as string;
        findRequestCourse.favoriotArea = favoriotArea as string;
        findRequestCourse.course = course as Types.ObjectId;
        const editResult = await findRequestCourse.save();
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
        const requestCourse = await RequestCourse.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)

        const totalRequestCourse = await RequestCourse.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalRequestCourse,
            data: requestCourse.map(item => item.toObject({ getters: true }))
        }
    }

    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedRequestCourse = await RequestCourse.findById(id);

        if (!deletedRequestCourse) {
            throw new HttpError(["اطلاعات مورد نظر یافت نشد!"], 422);
        }

        deletedRequestCourse.isActive = false
        await deletedRequestCourse.save()
        return deletedRequestCourse;
    }
}

export default RequestCourseRepository;
