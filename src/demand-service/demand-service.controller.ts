import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemandServiceService } from './demand-service.service';
import { CreateDemandServiceDto } from './dto/create-demand-service.dto';
import { UpdateDemandServiceDto } from './dto/update-demand-service.dto';

@Controller('demand-service')
export class DemandServiceController {
  constructor(private readonly demandServiceService: DemandServiceService) {}

  @Post()
  create(@Body() createDemandServiceDto: CreateDemandServiceDto) {
    return this.demandServiceService.create(createDemandServiceDto);
  }

  @Get()
  findAll() {
    return this.demandServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandServiceDto: UpdateDemandServiceDto) {
    return this.demandServiceService.update(+id, updateDemandServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandServiceService.remove(+id);
  }
}
