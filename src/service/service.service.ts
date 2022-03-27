import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository, ILike, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

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
    relations = typeof relations === 'string' ?
      relations.split(',') :
      relations;
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
    return this._repositoryService.findOne(id, { 
      relations: ['user', 'sc', 'city', "comment", "comment.user", "comment.children", "comment.children.user"] 
    });
  }

  update(id: number, updateUserDto: UpdateServiceDto) {
    return this._repositoryService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this._repositoryService.delete(id);
  }

  getWhere(props: Object): Object {
    let where = {};
    props["service_id"] ? where["service_id"]= +props["service_id"]  : null;
    props["service_name"] ? where["service_name"]= ILike(`%${props["service_name"]}%`)  : null;
    props["price_min"] ? where["service_price"]=MoreThanOrEqual(+props["price_min"])  : null;
    props["price_max"] ? where["service_price"]=LessThanOrEqual(+props["price_max"])  : null;
    props["service_description"] ? where["service_description"]= ILike(`%${props["service_description"]}%`) : null;
    props["category_name"] ? where["sc"]= {"sc_name":props["category_name"]} : null;
    props["city_name"] ? where["city"]= {"city":props["city_name"]} : null;
    props["user_id"] ? where["user"]= {"user_id":props["user_id"]} : null;
    return where;
  }
}
