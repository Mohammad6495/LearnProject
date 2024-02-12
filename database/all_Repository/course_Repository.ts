import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Course from "../models/course_collection";
import { ICourse } from "../../utils/interfaces";

class CourseRepository {
    async Created({
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
        const createdCourse = new Course({
            title: title,
            description: description,
            category,
            courseConditions,
            dayHolding,
            eductional,
            headLines,
            image,
            periodTime,
            price,
            teacher,
            timeHolding,
            isAvailable
        })
        const CourseResult = await createdCourse.save();
        return CourseResult
    }
    async Edit({
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
        const findCategory = await Course.findById(id);
        if (!findCategory) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        findCategory.title = title as string;
        findCategory.description = description as string;
        findCategory.periodTime = periodTime as string;
        findCategory.dayHolding = dayHolding as string;
        findCategory.timeHolding = timeHolding as string;
        findCategory.image = image ? image : findCategory.image as string;
        findCategory.category = category;
        findCategory.courseConditions = courseConditions;
        findCategory.eductional = eductional;
        findCategory.headLines = headLines as string[];
        findCategory.price = price as number;
        findCategory.teacher = teacher;
        findCategory.isAvailable = isAvailable as boolean;
        const editResult = await findCategory.save();
        return editResult;
    }
    async GetAll() {
        const course = await Course.find({ isActive: true, isAvailable: true })
            .sort({ createdAt: -1 })
            .populate('teacher')
            .populate('category')
            .populate('eductional')
        return course
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

        const course = await Course.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('teacher')
            .populate('category')
            .populate('eductional');

        const totalCourse = await Course.find({ isActive: true }).countDocuments(searchCondition);

        return {
            totalRecords: totalCourse,
            data: course.map(item => item.toObject({ getters: true }))
        };
    }


    async ChangeIsAvailable({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findCategory = await Course.findById(id);
        if (!findCategory) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        if (findCategory.isAvailable) {
            findCategory.isAvailable = false
        } else {
            findCategory.isAvailable = true
        }
        const result = await findCategory.save();
        return result;
    }

    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedCourse = await Course.findById(id);

        if (!deletedCourse) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        deletedCourse.isActive = false;
        await deletedCourse.save();

        return deletedCourse;
    }

    async FindCourse(id: Types.ObjectId) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findCours = await Course.findById(id)
            .populate('teacher')
            .populate('category')
            .populate('eductional')
            .populate('headLines');
        if (!findCours) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }

        return findCours
    }
}

export default CourseRepository;
