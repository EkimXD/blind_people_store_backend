import { Injectable } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Injectable()
export class ServiceCategoryService {
  create(createServiceCategoryDto: CreateServiceCategoryDto) {
    return 'This action adds a new serviceCategory';
  }

  findAll() {
    return `This action returns all serviceCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceCategory`;
  }

  update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return `This action updates a #${id} serviceCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceCategory`;
  }
}
