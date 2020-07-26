'use strict';
const admin = require("firebase-admin");
const functions = require('firebase-functions');
admin.initializeApp();

const path = require('path');
const firebaseSwaggerUI = require('firebase-swagger-ui');

// swaggerRouter configuration
var options = {
    prefix: "poc_",
    publicFolderPath: "public",
};

var swaggerUI = firebaseSwaggerUI.create(path.join(__dirname, 'api/openapi.yaml'), options);

exports.api = functions.https.onRequest(swaggerUI.getExpressApp());