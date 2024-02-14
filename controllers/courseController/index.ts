import { NextFunction, Response, Request } from "express";
import CourseServices from "../../services/course_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";
import { Types } from "mongoose";

const services = new CourseServices();

export const CreatedAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      periodTime,
      dayHolding,
      timeHolding,
      image = req?.file?.path || undefined,
      category,
      courseConditions,
      eductional,
      headLines,
      price,
      teacher,
      isAvailable,
      startTime
    } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedCourse({
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
    });
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const EditAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      title,
      description,
      periodTime,
      dayHolding,
      timeHolding,
      image = req?.file?.path || undefined,
      category,
      courseConditions,
      eductional,
      headLines,
      price,
      teacher,
      isAvailable,
      startTime
    } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditCourse({
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
    });
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const GetAllAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageSize, currentPage, search } = req.query;
    const data = await services.GetCourse(currentPage as string, pageSize as string, search as string);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};


export const GetAllClientAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageSize, currentPage, search, categoryId, courseConditions, sort } = req.body;

    const data = await services.GetCourseClient(currentPage as string, pageSize as string, search as string, categoryId as any, courseConditions as string, sort as number);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const DeleteTeacherAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const ChangeIsAvailableAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.ChangeIsAvailableCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const GetDetailAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DetailsCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
