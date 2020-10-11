import { JsonController, Get, Res, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { MetarAPI } from '@adapters';

@JsonController('/v1/metar')
@Service()
export class MetarController {
    metarAPI: MetarAPI

    constructor(
    ){
        this.metarAPI = new MetarAPI();
    }

    @Get('/info')
    async info(
        @Res() res: any,
        @QueryParam("scode") scode?: string
    ){
        return this.metarAPI.getInfo(scode);
    };
};