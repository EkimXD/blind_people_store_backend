import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private _repositoryCity: Repository<CityEntity>
  ) { }

  create(createCityDto: CreateCityDto) {
    return this._repositoryCity.save(createCityDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.place_id
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
    let order: object = { place_id: props["order"] || 'DESC' };
    order["place_id"] = order["place_id"].toUpperCase();
    return this._repositoryCity.findAndCount({
      where: where,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryCity.findOne(id, { relations: ['service'] });
  }

  update(id: number, updateCityDto: CreateCityDto) {
    return this._repositoryCity.update(id, updateCityDto);
  }

  remove(id: number) {
    return this._repositoryCity.delete(id);
  }

  getStates() {
    return new Promise(
      (resolve, reject) => {
        this._repositoryCity.find(
          {
            select: ["state", "city"]
          }
        )
          .then(
            states => {
              resolve([...new Set(states.map(item => item.state))]);
            }
          )
          .catch(
            err => { reject(err) }
          )
      }
    )
  }

  getWhere(props: Object): Object {
    let where = [];
    props["state"] ? where.push({ state: ILike(`%${props["state"]}%`) }) : null;
    props["city"] ? where.push({ city: ILike(`%${props["city"]}%`) }) : null;
    return where;
  }
}
