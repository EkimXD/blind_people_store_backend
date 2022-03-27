import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { ServiceEntity } from 'src/service/entities/service.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@ApiTags('comment')
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
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createCommentDto: CreateCommentDto) {
    createCommentDto = this.get_dto(createCommentDto)
    const validation = await validate(createCommentDto);
    if (validation.length == 0) {
      return this.commentService.create(createCommentDto);
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
    return this.commentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    updateCommentDto = this.get_dto(updateCommentDto)
    const validation = await validate(updateCommentDto);
    if (validation.length == 0) {
      return this.commentService.update(+id, updateCommentDto);
    } else {
      let error = new Array();
      validation.forEach((err) => {
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  // @Delete(':id')
  // @ApiResponse({ status: 200, description: 'Succesfull.' })
  // remove(@Param('id') id: string) {
  //   return this.commentService.remove(+id);
  // }


  private get_dto(createCommentDto: CreateCommentDto|UpdateCommentDto): CreateCommentDto|UpdateCommentDto {
    let createCommentDtoNew = new CreateCommentDto();
    createCommentDtoNew={...createCommentDto};
    createCommentDtoNew.service= ServiceEntity.getServiceFake(+createCommentDtoNew.service);
    createCommentDtoNew.user= UserEntity.getUserFake(+createCommentDtoNew.user);
    createCommentDtoNew.parent?createCommentDtoNew.parent=CommentEntity.getCommentFake(createCommentDtoNew.parent):null;
    return createCommentDtoNew
  }
}
