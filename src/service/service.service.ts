import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private _repositoryService: Repository<ServiceEntity>
  ) { }

  create(createServiceDto: CreateServiceDto) {
    return this._repositoryService.save(createServiceDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.service_id
        };
      })
      .catch((e) => {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
      );
  }

  findAll(props: Object)
    // : Promise<ServiceEntity[]> {
    : Promise<any> {
    let where: object = props["where"] || {};
    // where=JSON.parse(JSON.stringify(where));
    // where={"service_id":2};
    // const where: object = {};
    const relations: any = props["relations"]||[];
    const skip: number = props["skip"] || 0;
    const take: number = props["take"] || 10;
    let order: object = { service_id: props["order"]||'DESC' };
    order["service_id"] = order["service_id"].toUpperCase();
    return this._repositoryService.findAndCount({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryService.findOne(id, { relations: ['user', 'sc', 'city'] });
  }

  update(id: number, updateUserDto: UpdateServiceDto) {
    return this._repositoryService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this._repositoryService.delete(id);
  }
}
