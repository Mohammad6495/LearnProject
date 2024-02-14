import express from 'express';

import accountRoutes from './account'
import categoryRoutes from './category'
import teacherRoutes from './teacher'
import eductionalRoutes from './eductional'
import courseRoutes from './course'
import familiarServiceRoutes from './familiarService'
import requestCourseRoutes from './requestCourse'

const appRouter = express();
// login
/**
* @swagger
* /account/login:
*   post:
*     tags:
*       - Authentication
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userName:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     token:
*                       type: string
*/
// //getprofile  
/**
* @swagger
* /account/getprofile:
*   get:
*     tags:
*       - Authentication
*     security:
*       - BearerAuth: []
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/account', accountRoutes)
// createdCategory
/**
* @swagger
* /category/create:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               image:
*                 type: file
*     responses:
*       '200':
*         description: Successful response
*/
// editCategory
/**
* @swagger
* /category/edit:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               id:
*                 type: string
*               image:
*                 type: file
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /category/getAll:
*   get:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAllClient
/**
* @swagger
* /category/getAllClient:
*   get:
*     tags:
*       - Category
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /category/changeavailable:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removecategory
/**
* @swagger
* /category/remove:
*   delete:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/category', categoryRoutes)
// createdTeacher
/**
* @swagger
* /teacher/create:
*   post:
*     tags:
*       - Teacher
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*               image:
*                 type: file
*               workExperience:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editTeacher
/**
* @swagger
* /teacher/edit:
*   post:
*     tags:
*       - Teacher
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*               image:
*                 type: file
*               workExperience:
*                 type: string
*               id:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /teacher/getAll:
*   get:
*     tags:
*       - Teacher
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removeteacher
/**
* @swagger
* /teacher/remove:
*   delete:
*     tags:
*       - Teacher
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/teacher', teacherRoutes)
// createdeductional
/**
* @swagger
* /eductional/create:
*   post:
*     tags:
*       - Eductional
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editeductional
/**
* @swagger
* /eductional/edit:
*   post:
*     tags:
*       - Eductional
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*               name:
*                 type: string
*               description:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /eductional/getAll:
*   get:
*     tags:
*       - Eductional
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removeeductional
/**
* @swagger
* /eductional/remove:
*   delete:
*     tags:
*       - Eductional
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/eductional', eductionalRoutes)
// createdcourse
/**
* @swagger
* /course/create:
*   post:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               description:
*                 type: string
*               isAvailable:
*                 type: boolean
*               periodTime:
*                 type: string
*               dayHolding:
*                 type: string
*               timeHolding:
*                 type: string
*               image:
*                 type: file
*               category:
*                 type: string
*               courseConditions:
*                 type: string
*               startTime:
*                 type: string
*               eductional:
*                 type: string
*               headLines:
*                 type: array
*                 items:
*                   type: string
*               price:
*                 type: number
*               teacher:
*                 type: array
*                 items:
*                   type: string
*             required:
*               - title
*               - periodTime
*               - price
*               - teacher
*               - category
*               - eductional
*     responses:
*       '200':
*         description: Successful response
*/
// editcourse
/**
* @swagger
* /course/edit:
*   post:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*               title:
*                 type: string
*               description:
*                 type: string
*               periodTime:
*                 type: string
*               isAvailable:
*                 type: boolean
*               dayHolding:
*                 type: string
*               timeHolding:
*                 type: string
*               image:
*                 type: file
*               category:
*                 type: string
*               courseConditions:
*                 type: string
*               startTime:
*                 type: string
*               eductional:
*                 type: string
*               headLines:
*                 type: array
*                 items:
*                   type: string
*               price:
*                 type: number
*               teacher:
*                 type: array
*                 items:
*                   type: string
*             required:
*               - id
*               - title
*               - periodTime
*               - price
*               - teacher
*               - category
*               - eductional
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /course/getAll:
*   get:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAllClient
/**
* @swagger
* /course/getAllClient:
*   post:
*     tags:
*       - Course
*     consumes:
*       - multipart/form-data
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               search:
*                 type: string
*               pageSize:
*                 type: string
*               currentPage:
*                 type: string
*               categoryId:
*                 type: array
*                 items:
*                   type: string
*               courseConditions:
*                 type: array
*                 items:
*                   type: string
*               sort:
*                 type: integer
*                 enum:
*                   - 0
*                   - 1
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /course/changeavailable:
*   post:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removecourse
/**
* @swagger
* /course/remove:
*   delete:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// detail
/**
* @swagger
* /course/detail:
*   get:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// detailClient
/**
* @swagger
* /course/detailClient:
*   get:
*     tags:
*       - Course
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/

appRouter.use('/course', courseRoutes)

// createdfamiliarservice
/**
* @swagger
* /familiarservice/create:
*   post:
*     tags:
*       - Familiarservice
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// createdClientfamiliarservice
/**
* @swagger
* /familiarservice/createClient:
*   post:
*     tags:
*       - Familiarservice
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editfamiliarservice
/**
* @swagger
* /familiarservice/edit:
*   post:
*     tags:
*       - Familiarservice
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /familiarservice/getAll:
*   get:
*     tags:
*       - Familiarservice
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removefamiliarservice
/**
* @swagger
* /familiarservice/remove:
*   delete:
*     tags:
*       - Familiarservice
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// detailfamiliarservice
/**
* @swagger
* /familiarservice/detail:
*   post:
*     tags:
*       - Familiarservice
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/familiarservice', familiarServiceRoutes)
// createdfamiliarservice
/**
* @swagger
* /requestCourse/create:
*   post:
*     tags:
*       - RequestCourse
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*               course:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// createdClientrequestCourse
/**
* @swagger
* /requestCourse/createClient:
*   post:
*     tags:
*       - RequestCourse
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*               course:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editrequestCourse
/**
* @swagger
* /requestCourse/edit:
*   post:
*     tags:
*       - RequestCourse
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*               phoneNumber:
*                 type: string
*               favoriotArea:
*                 type: string
*               course:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /requestCourse/getAll:
*   get:
*     tags:
*       - RequestCourse
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removerequestCourse
/**
* @swagger
* /requestCourse/remove:
*   delete:
*     tags:
*       - RequestCourse
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// detailrequestCourse
/**
* @swagger
* /requestCourse/detail:
*   post:
*     tags:
*       - RequestCourse
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/requestCourse', requestCourseRoutes)

export default appRouter