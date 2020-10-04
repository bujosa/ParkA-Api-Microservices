import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateNationalityInput } from './inputs/create-nationality.input';
import { GetNationalityByIdInput } from './inputs/get-nationality-by-id.input';
import { NationalityType } from './types/nationality.type';

@Injectable()
export class NationalityService {
  private client: ClientProxy;
  private logger = new Logger('NationalityService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `redis://redis-parka-microservices:6379`,
      },
    });
  }

  public async getNationalityById(
    getNationalityByIdInput: GetNationalityByIdInput,
  ): Promise<NationalityType> {
    this.logger.debug(
      `Received get nationality by id with payload ${JSON.stringify(
        getNationalityByIdInput,
      )}`,
    );

    const response = this.client.send<NationalityType>(
      { type: 'get-nationality-by-id' },
      getNationalityByIdInput,
    );

    return response.toPromise();
  }

  public async getAllNationalities(): Promise<NationalityType[]> {
    this.logger.debug(`Received get all nationalities`);

    const response = this.client.send<NationalityType[]>(
      { type: 'get-all-nationalities' },
      {},
    );

    return response.toPromise();
  }

  public async createNationality(
    createNationalityInput: CreateNationalityInput,
  ): Promise<NationalityType> {
    this.logger.debug(
      `Received create nationality with payload ${JSON.stringify(
        createNationalityInput,
      )}`,
    );

    const response = this.client.send<NationalityType>(
      { type: 'create-nationality' },
      createNationalityInput,
    );

    return response.toPromise();
  }
}
