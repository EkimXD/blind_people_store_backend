import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';


@ApiTags('city')
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
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createCityDto: CreateCityDto) {
    const validation = await validate(createCityDto);
    if (validation.length == 0) {
      return this.cityService.create(createCityDto);
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
  @ApiQuery({ name: 'order', required: false, })
  @ApiQuery({ name: 'relations', required: false, })
  @ApiQuery({ name: 'state', required: false, })
  @ApiQuery({ name: 'city', required: false, })
  findAll(@Req() request: object) {
    return new Promise(
      (resolve, reject) => {
        this.cityService.findAll(request["query"])
          .then(
            ([result, count]) => {
              this.cityService.getStates()
              .then(
                states=> {
                  resolve(
                    {
                      result,
                      count: count,
                      states:states
                    }
                  )
                }
              )
              
            }
          )
          .catch(
            err => {
              reject(
                {
                  error: err
                }
              )
            }
          );
      }
    )
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  // @Get('states')
  // @ApiResponse({ status: 200, description: 'Succesfull.' })
  // findStates() {
  //   return "dobleok"
  //   // return this.cityService.getStates();
  // }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  async update(@Param('id') id: string, @Body() updateCityDto: CreateCityDto) {
    const validation = await validate(updateCityDto);
    if (validation.length == 0) {
      return this.cityService.update(+id, updateCityDto);
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
    return this.cityService.remove(+id);
  }
}
