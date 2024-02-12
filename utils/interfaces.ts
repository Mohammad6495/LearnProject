import { Types } from "mongoose"

export interface IUser {
  userName?: string;
  password?: string;
  role?: IRole[]
}

export interface IRole {
  id?: string,
  name?: string,
  label?: string
}

export interface ICourse {
  id?: string,
  title?: string,
  periodTime?: string,
  dayHolding?: string,
  timeHolding?: string,
  description?: string,
  courseConditions?: string,
  price?: number,
  image?:string
  teacher?: Types.ObjectId,
  category?: Types.ObjectId,
  eductional?: Types.ObjectId,
  isAvailable?:boolean,
  headLines?: string[]
}
export interface ITeacher {
  id?: string,
  name: string,
  course?: ICourse[]
}

export interface ICategory {
  id?: string,
  title?: string
  image?: string
}

export interface IEductional {
  id?: string,
  name?: string,
  description?: string,
  courses?: ICourse[]
}

export interface IHeadLines {
  id?: string,
  title?: string,
  course?: ICourse
}

export interface IFamiliarService {
  id?: string,
  phoneNumber?: string,
  favoriotArea?:string
}

export interface IRequestCourse {
  id?: string,
  phoneNumber?: string,
  favoriotArea?:string,
  course?: Types.ObjectId
}
