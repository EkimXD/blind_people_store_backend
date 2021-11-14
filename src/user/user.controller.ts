import { Controller, Get, Post, Request, Body, Patch, Param, Delete, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@ApiHeader({
  name: 'application/json',
})
@ApiHeader({
  name: 'x-api-key',
})
@ApiResponse({ status: 401, description: 'Unauthorized, please verify your headers or loggin up.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 400, description: 'Bad Request.' })
@UseGuards(AuthGuard('api-key'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto = this.get_dto(createUserDto)
    const validation = await validate(createUserDto);
    if (validation.length == 0) {
      return this.userService.create(createUserDto);
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
    console.log(request);
    return this.userService.findAll();
  }
  
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Succesfull.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Succesfull updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    updateUserDto = this.get_dto(updateUserDto)
    const validation = await validate(updateUserDto);
    if (validation.length == 0) {
      return this.userService.update(+id, updateUserDto);
    } else {
      let error = new Array();
      console.log(typeof (error))
      validation.forEach((err) => {
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }
  
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Succesfull deleted.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  private get_dto(createUserDto: CreateUserDto): CreateUserDto {
    let createUserDtoNew = new CreateUserDto();
    createUserDtoNew.user_name = createUserDto.user_name;
    createUserDtoNew.user_email = createUserDto.user_email;
    createUserDtoNew.password = createUserDto.password;
    createUserDtoNew.user_phone = createUserDto.user_phone;
    if (createUserDto.blind_discapacity_percentage != undefined) {
      createUserDtoNew.blind_discapacity_percentage = +createUserDto.blind_discapacity_percentage;
    }
    return createUserDtoNew
  }
}
