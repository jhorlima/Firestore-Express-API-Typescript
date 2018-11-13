import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';

import {Application} from "express";
import {attachControllers} from '@decorators/express';

import {ClientController} from './Controllers/ClientController';
import {GeneralController} from './Controllers/GeneralController';

const api: Application = express();
const appV1: Application = express();

appV1.use(cors({origin: true}));

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.use('/api/v1', appV1);

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://estudo-b21f1.firebaseio.com'
});

admin.firestore().settings({timestampsInSnapshots: true});

attachControllers(appV1, [ClientController, GeneralController]);

// webApi is your functions name, and you will pass this.api as a parameter
export const webApiV1 = functions.https.onRequest(api);