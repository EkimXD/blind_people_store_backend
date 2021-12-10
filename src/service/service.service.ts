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

  findAll(where: any = {}, relations: any = [], skip: number = 0, take: number = 10, order: any = { service_id: 'DESC' }): Promise<ServiceEntity[]> {
    return this._repositoryService.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryService.findOne(id, {relations:['user']});
  }

  update(id: number, updateUserDto: UpdateServiceDto) {
    return this._repositoryService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this._repositoryService.delete(id);
  }
}
