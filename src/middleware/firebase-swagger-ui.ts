'use strict';

import * as express from 'express';
import cookieParser = require('cookie-parser');
import { SwaggerUI } from './swagger.ui';

import * as fs from 'fs';
import * as jsyaml from 'js-yaml';

export interface IAppOptions {
    oas?: any;
    oasPathFile?: string;
    publicFolderPath: string;
}

export class FirebaseSwaggerUI {
    private app: express.Application;
    private swaggerDocUI: any;

    constructor(appOptions: IAppOptions) {
        try {
            this.app = express();
            let swaggerDoc = appOptions.oas;
            if (!swaggerDoc) {
                if (appOptions.oasPathFile) {
                    const fileOAS = fs.readFileSync(appOptions.oasPathFile, 'utf8');
                    swaggerDoc = jsyaml.safeLoad(fileOAS);
                } else {
                    throw new Error("oas or oasPathFile are required");
                }
            }

            this.app.use(express.text());
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: false }));
            this.app.use(cookieParser());

            this.swaggerDocUI = swaggerDoc;
            const swaggerUi = new SwaggerUI(swaggerDoc, null);
            this.app.use(swaggerUi.serveStaticContent());

            this.app.use(express.static(appOptions.publicFolderPath));

        } catch (error) {
            console.log("firebase-swagger-ui / Error in constructor / Check OAS3 Definition")
            console.error(error);
            throw error;
        }
    }

    public getAppExpress(): express.Application {
        return this.app;
    }

    public getOAS3(): any {
        return this.swaggerDocUI;
    }

}