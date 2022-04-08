import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {UpdateUserPassDto} from './dto/update-user-pass.dto'
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private _repositoryUser: Repository<UserEntity>
  ) { }

  create(createUserDto: CreateUserDto) {
    return this._repositoryUser.save(createUserDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.user_id
        };
      })
      .catch((e) => {
        throw new BadRequestException(
          e,
        );
      }
      );
  }

  findAll(where: any = {}, relations: any = [], skip: number = 0, take: number = 10, order: any = { user_id: 'DESC' }): Promise<UserEntity[]> {
    return this._repositoryUser.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryUser.findOne(id, {relations:['role', 'score']});
  }

  findByEmail(user_email: string) {
    return this._repositoryUser.findOne(
      {
        where: {
          user_email: user_email
        },
        relations:['role']
      }
    );
  }

  update(id: number, updateUserDto: UpdateUserDto|UpdateUserPassDto) {
    return this._repositoryUser.update(id, updateUserDto);
  }

  remove(id: number) {
    return this._repositoryUser.delete(id);
  }
}
