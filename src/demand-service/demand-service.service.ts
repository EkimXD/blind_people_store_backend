import { Injectable } from '@nestjs/common';
import { CreateDemandServiceDto } from './dto/create-demand-service.dto';
import { UpdateDemandServiceDto } from './dto/update-demand-service.dto';

@Injectable()
export class DemandServiceService {
  create(createDemandServiceDto: CreateDemandServiceDto) {
    return 'This action adds a new demandService';
  }

  findAll() {
    return `This action returns all demandService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demandService`;
  }

  update(id: number, updateDemandServiceDto: UpdateDemandServiceDto) {
    return `This action updates a #${id} demandService`;
  }

  remove(id: number) {
    return `This action removes a #${id} demandService`;
  }
}
