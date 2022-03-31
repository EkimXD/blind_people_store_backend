import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateDemandServiceDto } from './dto/create-demand-service.dto';
import { UpdateDemandServiceDto } from './dto/update-demand-service.dto';
import { DemandServiceEntity } from './entities/demand-service.entity';

@Injectable()
export class DemandServiceService {

  constructor(
    @InjectRepository(DemandServiceEntity)
    private _repositoryDemandService: Repository<DemandServiceEntity>
  ) { }

  create(createDemandServiceDto: CreateDemandServiceDto) {
    return this._repositoryDemandService.save(createDemandServiceDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.demand_id
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
    let order: object = { demand_id: props["order"] || 'DESC' };
    return this._repositoryDemandService.findAndCount({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number, relations?: Array<string>) {
    return this._repositoryDemandService.findOne(id, {
      relations: relations !== undefined ? relations : ['user', "service"]
    });
  }

  update(id: number, updateDemandServiceDto: UpdateDemandServiceDto) {
    return this._repositoryDemandService.update(id, updateDemandServiceDto);
  }

  remove(id: number) {
    return this._repositoryDemandService.delete(id);
  }

  getWhere(props: Object): Object {
    let where = {};
    props["demand_title"] ? where["demand_title"] = ILike(`%${props["demand_title"]}%`) : null;
    return where;
  }
}
