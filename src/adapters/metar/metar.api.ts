import { logger } from '@utils';

import { 
    MetarInfo
  } from '@interfaces';

  import { configs as metarConfig } from './metar.config';
  
  import { Service } from 'typedi';
  import axios, { AxiosInstance } from 'axios';
  import { Repository, LessThan } from 'typeorm';
  import { InjectRepository } from 'typeorm-typedi-extensions';
  import { response } from 'express';
  
  @Service()
  export class MetarAPI {
      apiClient: AxiosInstance;
  
      constructor() {
        this.apiClient = axios.create({
          baseURL: metarConfig.baseURL,
          responseType: metarConfig.responseType,
          headers: metarConfig.headers
        });
      }
  
      getInfo = async (station: string) => {
        let response = await this.apiClient.get(`${station}.TXT`);
        logger.info(response.data);
        let data: MetarInfo = response.data as MetarInfo;
        return data;
      };
  };