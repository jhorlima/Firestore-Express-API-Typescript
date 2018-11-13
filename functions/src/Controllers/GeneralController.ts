import * as Express from 'express';

import {Controller, All, Get, Response} from "@decorators/express";

import {Auth} from '../Middleware/Auth';

@Controller('')
export class GeneralController {

    @Get('/')
    public getRoutes(@Response() res: Express.Response) {
        res.status(200).json({
            routes: {
                '/': [
                    'get',
                ],
                '/clients': [
                    'get',
                    'post',
                ],
                '/client/:id': [
                    'get',
                    'put',
                    'delete',
                ]
            }
        });
    }

    @Get('/handshake', [Auth])
    public handShake(@Response() res: Express.Response) {
        res.status(200).json({
            message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.user_id}`
        });
    }

    @All('*')
    public notFound(@Response() res: Express.Response) {
        res.status(404).json({error: 'Not Found!'});
    }
}