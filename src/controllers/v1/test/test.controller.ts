import { JsonController, Get, Res, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@JsonController('/v1/test')
@Service()
export class TestController {
    constructor(
    ){}

    @Get('/')
    async products(
        @Res() res: any,
    ){
        return { peace: 'peace'};
    };
};