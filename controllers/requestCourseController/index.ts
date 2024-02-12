import { NextFunction, Response, Request } from "express";
import RequestCourseServices from "../../services/requestCourse_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new RequestCourseServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, favoriotArea, course  } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedRequestCourse({phoneNumber, favoriotArea, course});
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
    const { id, favoriotArea, phoneNumber, course  } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditRequestCourse({id, favoriotArea, phoneNumber, course });
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
    const data = await services.GetRequestCourse(currentPage as string, pageSize as string, search as string);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};


export const DeleteRequestCourseAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteRequestCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
export const DetailRequestCourseAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DetailRequestCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
