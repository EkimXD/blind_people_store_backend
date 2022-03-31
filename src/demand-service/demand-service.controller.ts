import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { DemandServiceService } from './demand-service.service';
import { CreateDemandServiceDto } from './dto/create-demand-service.dto';
import { UpdateDemandServiceDto } from './dto/update-demand-service.dto';

@ApiTags('demand-service')
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
@Controller('demand-service')
export class DemandServiceController {
  constructor(private readonly demandServiceService: DemandServiceService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createDemandServiceDto: CreateDemandServiceDto) {
    createDemandServiceDto = this.getDTO(createDemandServiceDto)
    const validation = await validate(createDemandServiceDto);
    if (validation.length == 0) {
      return this.demandServiceService.create(createDemandServiceDto);
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
  @ApiQuery({ name: 'demand_title', required: false, })
  findAll(
    @Req() request: object,
  ) {
    return new Promise(
      (resolve, reject) => {
        this.demandServiceService.findAll(request["query"])
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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findOne(@Param('id') id: string) {
    return this.demandServiceService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  update(@Param('id') id: string, @Body() updateDemandServiceDto: UpdateDemandServiceDto) {
    return this.demandServiceService.update(+id, updateDemandServiceDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  remove(@Param('id') id: string) {
    return this.demandServiceService.remove(+id);
  }


  getDTO(data: CreateDemandServiceDto) {
    data.user = UserEntity.getUserFake(+data.user);
    return data;
  }
}
