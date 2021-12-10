import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';


@ApiTags('service')
@ApiHeader({
  name: 'Content-Type',
  schema:{
    type: 'string', 
    default: "application/json"
  }
})
@ApiHeader({
  name: 'x-api-key',
  schema:{
    type: 'string', 
    default: "420f77de-2cea-4e13-841a-b43ca729a7a9"
  }
})
@ApiResponse({ status: 401, description: 'Unauthorized, please verify your headers or loggin up.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 400, description: 'Bad Request.' })
@UseGuards(AuthGuard('api-key'))
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createServiceDto: CreateServiceDto) {
    const validation = await validate(createServiceDto);
    if (validation.length == 0) {
      return this.serviceService.create(CreateServiceDto.getDTO(createServiceDto));
    } else {
      let error = new Array();
      console.log(typeof (error))
      validation.forEach((err) => {
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findAll(@Req() request: object) {
    return this.serviceService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Succesfull updated.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Succesfull updated.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: CreateServiceDto) {
    const validation = await validate(updateServiceDto);
    if (validation.length == 0) {
      return this.serviceService.update(+id, updateServiceDto);
    } else {
      let error = new Array();
      console.log(typeof (error))
      validation.forEach((err) => {
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ status: 200, description: 'Succesfull deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
