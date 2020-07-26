'use strict';

import * as express from 'express';
import cookieParser = require('cookie-parser');
import { SwaggerUI } from './swagger.ui';

import * as logger from 'morgan';
import * as fs from 'fs';
import * as jsyaml from 'js-yaml';

import * as url from 'url';

export interface IAppOptions {
    prefix: string;
    logging?: string;
    routing: any;
    publicFolderPath: string;
}

export class FirebaseSwaggerUI {
    private app: express.Application;
    private swaggerDocUI: any;
    public prefix: string = "core";

    constructor(definitionPath: string, appOptions: IAppOptions) {
        try {
            appOptions.prefix = appOptions.prefix.toLowerCase()
            this.prefix = appOptions.prefix;

            console.log("Se crea la app swagger ui " + appOptions.prefix);
            this.app = express();

            console.log("Se inicia la obtencion del yaml desde el archivo");

            const spec = fs.readFileSync(definitionPath, 'utf8');
            const swaggerDoc = jsyaml.safeLoad(spec);

            console.log("Se obtuvo el yaml desde el archivo");

            for (var pathService in swaggerDoc.paths) {
                var service = swaggerDoc.paths[pathService];
                for (const methodName in service) {
                    delete swaggerDoc.paths[pathService];
                    const method = service[methodName];
           
                    let controllerName = method["x-swagger-router-controller"];
                    method["x-swagger-router-controller"] = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
                    swaggerDoc.paths["/" + appOptions.prefix.toLowerCase() + controllerName.toLowerCase() + pathService.toLowerCase()] = service;
                    break;
                }
            }

            //----------------------------------------------------
            this.app.use(express.text());
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: false }));
            this.app.use(cookieParser());

            this.swaggerDocUI = swaggerDoc;
            const swaggerUi = new SwaggerUI(swaggerDoc, null);
            this.app.use(swaggerUi.serveStaticContent());

            this.app.use(express.static(appOptions.publicFolderPath));

        } catch (error) {
            console.log("swagger-ui-oas3 / Error in ExpressAppConfig Constructor / Check OAS3 Definition")
            console.error(error);
            throw error;
        }
    }

    public getExpressApp(): express.Application {
        return this.app;
    }

    public getOAS3(): any {
        return this.swaggerDocUI;
    }

}