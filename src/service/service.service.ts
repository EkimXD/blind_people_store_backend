import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository, ILike } from 'typeorm';

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
    : Promise<any> {
    let where: object = this.getWhere(props);
    let relations: any = props["relations"] || [];
    relations = typeof relations === 'string' ? relations.split(',') : relations;
    const skip: number = props["skip"] || 0;
    const take: number = props["take"] || 10;
    let order: object = { service_id: props["order"] || 'DESC' };
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

  getWhere(props: Object): Object {
    let where = [];
    props["service_id"] ? where.push({ service_id: +props["service_id"] }) : null;
    props["service_name"] ? where.push({ service_name: ILike(`%${props["service_name"]}%`) }) : null;
    props["service_price"] ? where.push({ service_price: ILike(`%${props["service_price"]}%`) }) : null;
    props["service_description"] ? where.push({ service_description: ILike(`%${props["service_description"]}%`) }) : null;
    return where;
  }
}
