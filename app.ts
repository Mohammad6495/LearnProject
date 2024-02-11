import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import appRouter from './routes';
import { databaseConnection } from './database';
import { SERVER_LOAD } from './config';
import path from 'path';
import HttpError from './utils/app_error';

const app = express();

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Learn Project API',
            version: '1.0.0',
            description: 'Simple API Learn Project',
        },
        servers: [
            {
                url: 'http://91.206.177.124:5000',
            },
            {
                url: SERVER_LOAD,
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.ts'],
};


const serverStart = async () => {
    const specs = swaggerJSDoc(options)
    await databaseConnection()
    app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));

    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use("/assets/upload", express.static(path.join(__dirname, "assets", "upload")));

    app.use((req, res, next) => {
        const allowedOrigins = ["http://localhost:5173", "http://localhost:3011", "http://91.206.177.124:8080", "http://91.206.177.124:7000"];
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin as any)) {
            res.setHeader("Access-Control-Allow-Origin", origin as any);
        }

        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        next();
    });

    app.use(appRouter);
    app.use((req, res, next) => {
        const error = new HttpError(["آدرس مورد نظر یافت نشد!"], 404, null);
        throw error;
    });
    app.use((error: any, req: any, res: any, next: any) => {
        if (res.headerSet) {
            return next(error);
        }
        res.status(error.statusCode || 500);
        res.json({
            errors: error.message || "Error",
            statusCode: error.statusCode,
            data: null,
            message: null
        });
    });
    app
        .listen(5000, () => {
            console.log(`Connect Server = ${5000}`);
        })
        .on("error", (err) => {
            console.log(err);
            process.exit();
        });
}

serverStart()