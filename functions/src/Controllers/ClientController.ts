import * as Express from 'express';

import {
    Controller,
    Body,
    Params,
    Get,
    Put,
    Post,
    Delete,
    Response
} from "@decorators/express";

import {Auth} from '../Middleware/Auth';
import ClientRepository from '../Repositories/Clients';

@Controller('/clients', [Auth])
export class ClientController {

    @Post('/')
    async create(@Body() body: Object, @Response() res: Express.Response) {
        try {
            const client = await ClientRepository.create(body);
            res.status(200).json(client.id);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    @Get('/')
    async read(@Response() res: Express.Response) {

        try {

            let clients = await ClientRepository.read();

            let results = [];

            if (!results.length) {
                res.status(404).json({detail: 'No records found'});
            } else {
                clients.forEach(client => results.push({id: client.id, data: client.data()}));
                res.status(200).json(results);
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    @Put('/:id')
    async update(@Response() res: Express.Response, @Body() body: Object, @Params('id') id: string) {
        try {
            const client = await ClientRepository.update(id, body);
            res.status(201).json(client);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    @Delete('/:id')
    async delete(@Response() res: Express.Response, @Params('id') id: string) {
        try {
            await ClientRepository.delete(id);
            res.status(200).json({detail: `Client id: ${id} deleted!`});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    @Get('/:id')
    async find(@Response() res: Express.Response, @Params('id') id: string) {
        try {
            const client = await ClientRepository.find(id);

            if (client.exists) {
                res.status(200).json(client.data());
            } else {
                res.status(404).json({detail: 'lol!'});
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }
}