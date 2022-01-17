import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';

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

  findAll(
    where: any = {},
    relations: any = [],
    skip: number = 0,
    take: number = 10,
    order: any = { place_id: 'DESC' }
  ): Promise<CityEntity[]> {
    return this._repositoryCity.find({
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

  update(id: number, updateCityDto: CreateCityDto) {
    return this._repositoryCity.update(id, updateCityDto);
  }

  remove(id: number) {
    return this._repositoryCity.delete(id);
  }
}
