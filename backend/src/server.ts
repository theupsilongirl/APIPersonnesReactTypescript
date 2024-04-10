import "reflect-metadata";

import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import { myContainer } from './ioc/ioc';
import { errorMiddleware } from "./middleware/error-middleware";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/errors";
var cors = require('cors');

const PORT = 8080;

// use it before all route definitions
// create server
let server = new InversifyExpressServer(myContainer);
server.setConfig((app) => {
    // add body parser
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});
server.setErrorConfig((app) =>
    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
        errorMiddleware(err, req, res, next);
    })
);


let app = server.build();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.listen(PORT, () => {
    console.log(`En écoute sur le port ${PORT}`);
});
