import {Request, Response} from "express";
import { JsonController, Get, Res, Param, QueryParam, Post, Req } from 'routing-controllers';
import { Service } from 'typedi';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { logger } from '@utils';

@JsonController('/v1/profile')
@Service()
export class ProfileController {
    constructor(
    ){}

    @Get('/upload')
    async products(
        @Res() res: any,
    ){
        return { peace: 'peace'};
    };
};