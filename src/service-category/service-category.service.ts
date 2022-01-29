import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from './entities/service-category.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategoryEntity)
    private _repositoryCity: Repository<ServiceCategoryEntity>
  ) { }

  create(createServiceCategoryDto: CreateServiceCategoryDto) {
    return this._repositoryCity.save(createServiceCategoryDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.sc_id
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
    relations = typeof relations === 'string' ?
      relations.split(',') :
      relations;
    const skip: number = props["skip"] || 0;
    const take: number = props["take"] || 10;
    let order: object = { sc_id: props["order"] || 'DESC' };
    order["sc_id"] = order["sc_id"].toUpperCase();
    return this._repositoryCity.findAndCount({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }


  findOne(id: number) {
    return this._repositoryCity.findOne(id, { relations: ['service'] });
  }

  update(id: number, updateServiceCategoryDto: CreateServiceCategoryDto) {
    return this._repositoryCity.update(id, updateServiceCategoryDto);
  }

  remove(id: number) {
    return this._repositoryCity.delete(id);
  }

  getWhere(props: Object): Object {
    let where = [];
    props["sc_name"] ? where.push({ sc_name: ILike(`%${props["sc_name"]}%`) }) : null;
    return where;
  }
}
