import { NextFunction, Response, Request } from "express";
import TeacherServices from "../../services/teacher_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new TeacherServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedTeacher(name);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const EditAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, id } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditTeacher(name, id);
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
    const data = await services.GetTeacher(currentPage as string, pageSize as string, search as string);
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
    const data = await services.DeleteTeacher(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
