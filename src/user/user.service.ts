import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private _repositoryUser: Repository<UserEntity>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this._repositoryUser.save(createUserDto);
  }

  findAll() {
    return this._repositoryUser.find();
  }

  findOne(id: number) {
    return this._repositoryUser.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this._repositoryUser.update(id, updateUserDto);
  }

  remove(id: number) {
    return this._repositoryUser.delete(id);
  }
}
