import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';
@ApiTags('score')
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
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createScoreDto: CreateScoreDto) {
    createScoreDto = this.get_dto(createScoreDto)
    const validation = await validate(createScoreDto);
    if (validation.length == 0) {
      return this.scoreService.create(createScoreDto);
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
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  async update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    updateScoreDto = this.get_dto(updateScoreDto)
    const validation = await validate(updateScoreDto);
    if (validation.length == 0) {
      return this.scoreService.update(+id, updateScoreDto);
    } else {
      let error = new Array();
      validation.forEach((err) => {
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }

  @Get('user-score/:id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findScoreForUser(@Param('id') id: string) {
    return this.scoreService.findScoreForUser(+id);
  }

  @Get('service-score/:id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findScoreForService(@Param('id') id: string) {
    return this.scoreService.findScoreForService(+id);
  }

  private get_dto(createScoreDto: CreateScoreDto|UpdateScoreDto): CreateScoreDto {
    let createScoreDtoNew = new CreateScoreDto();
    createScoreDtoNew.score_number= createScoreDto.score_number;
    createScoreDtoNew.service= ServiceEntity.getServiceFake(+createScoreDto.service);
    createScoreDtoNew.user=UserEntity.getUserFake(+createScoreDto.user);
    return createScoreDtoNew;
  }
}
