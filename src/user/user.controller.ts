import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto=this.get_dto(createUserDto)
    const validation = await validate(createUserDto);
    if (validation.length==0) {
      return this.userService.create(createUserDto);
    }else{
      let error= new Array();
      console.log(typeof(error))
      validation.forEach((err)=>{
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    updateUserDto=this.get_dto(updateUserDto)
    const validation = await validate(updateUserDto);
    if (validation.length==0) {
      return this.userService.update(+id, updateUserDto);
    }else{
      let error= new Array();
      console.log(typeof(error))
      validation.forEach((err)=>{
        error.push(err.constraints)
      })
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  private get_dto(createUserDto:CreateUserDto):CreateUserDto{
    let createUserDtoNew=new CreateUserDto();
    createUserDtoNew.user_name=createUserDto.user_name;
    createUserDtoNew.user_email=createUserDto.user_email;
    createUserDtoNew.password=createUserDto.password;
    createUserDtoNew.user_phone=createUserDto.user_phone;
    if (createUserDto.blind_discapacity_percentage != undefined){
        createUserDtoNew.blind_discapacity_percentage=+createUserDto.blind_discapacity_percentage;
    }
    return createUserDtoNew
}
}
