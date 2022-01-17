import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from './entities/service-category.entity';
import { Repository } from 'typeorm';

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

  findAll(
    where: any = {},
    relations: any = [],
    skip: number = 0,
    take: number = 10,
    order: any = { sc_id: 'DESC' }
  ): Promise<ServiceCategoryEntity[]> {
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

  update(id: number, updateServiceCategoryDto: CreateServiceCategoryDto) {
    return this._repositoryCity.update(id, updateServiceCategoryDto);
  }

  remove(id: number) {
    return this._repositoryCity.delete(id);
  }
}
