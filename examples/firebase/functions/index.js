'use strict';
const admin = require("firebase-admin");
const functions = require('firebase-functions');
admin.initializeApp();

const path = require('path');
const firebaseSwaggerUI = require('firebase-swagger-ui');

// swaggerRouter configuration
var options = {
    publicFolderPath: "public",
    oasPathFile: path.join(__dirname, 'api/openapi.yaml')
};

var swaggerUI = firebaseSwaggerUI.create(options);

exports.api = functions.https.onRequest(swaggerUI.getAppExpress());