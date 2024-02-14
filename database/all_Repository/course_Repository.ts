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
        isAvailable,
        startTime
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
            isAvailable,
            startTime
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
        isAvailable,
        startTime
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
        findCategory.teacher = teacher as Types.ObjectId[];
        findCategory.startTime = startTime;
        findCategory.isAvailable = isAvailable as boolean;
        const editResult = await findCategory.save();
        return editResult;
    }
    async GetAll(
        currentPage: string,
        pageSize: string,
        search: string,
        categoryId: string,
        courseConditions: string,
        sort: number
    ) {
        const limit = parseInt(pageSize) || 10;
        const skip = (parseInt(currentPage) - 1) * limit || 0;

        const searchCondition: Record<string, any> = { isActive: true };

        if (search) {
            searchCondition.$or = [
                { title: { $regex: search, $options: "i" } },
            ];
        }
        if (categoryId) {
            searchCondition.category = { $in: categoryId.split(',').map(id => id) };
        }

        if (courseConditions) {
            searchCondition.courseConditions = { $in: courseConditions.split(',').map(condition => new RegExp(condition, 'i')) };
        }

        let sortCondition: Record<string, any> = {};

        if (sort === 0) {
            sortCondition = { viewCount: -1 };
        } else if (sort === 1) {
            sortCondition = { price: 1 };
        } else {
            sortCondition = { createdAt: -1 };
        }

        const course = await Course.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort(sortCondition)
            .populate('teacher')
            .populate('category')
            .populate('eductional');

        const totalCourse = await Course.find({ isActive: true }).countDocuments(searchCondition);

        return {
            totalRecords: totalCourse,
            data: course.map(item => item.toObject({ getters: true }))
        };
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

    async PlusViewCount(id: Types.ObjectId) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const data = await this.FindCourse(id);
        data.viewCount = +1;
        await data.save();
        return data
    }
}

export default CourseRepository;
