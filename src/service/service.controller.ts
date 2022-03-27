import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req, Res, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { Response } from 'express';

@ApiTags('service')
@ApiHeader({
  name: 'Content-Type',
  schema: {
    type: 'string',
    default: "application/json"
  }
})
@ApiHeader({
  name: 'x-api-key',
  schema: {
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
  constructor(private readonly serviceService: ServiceService) { }

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
  @ApiQuery({ name: 'skip', required: false, })
  @ApiQuery({ name: 'take', required: false, })
  @ApiQuery({ name: 'order', required: false, })
  @ApiQuery({ name: 'relations', required: false, })
  @ApiQuery({ name: 'service_id', required: false, })
  @ApiQuery({ name: 'service_name', required: false, })
  @ApiQuery({ name: 'service_price', required: false, })
  @ApiQuery({ name: 'service_description', required: false, })
  @ApiQuery({ name: 'category_name', required: false, })
  @ApiQuery({ name: 'city_name', required: false, })
  @ApiQuery({ name: 'score_min', required: false, })
  @ApiQuery({ name: 'price_min', required: false, })
  @ApiQuery({ name: 'price_max', required: false, })
  findAll(
    @Req() request: object,
    // @Res() response: Response
  ) {
    return new Promise(
      (resolve, reject) => {
        this.serviceService.findAll(request["query"])
          .then(
            ([result, count]) => {
              resolve(
                {
                  result,
                  count: count
                }
              )
            }
          )
          .catch(
            err => {
              reject(
                err
              )
            }
          );
      }
    )
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
