import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleEntity)
    private _repositoryRole: Repository<RoleEntity>
  ) { }

  findAll(where: any = {}, relations: any = [], skip: number = 0, take: number = 10, order: any = { role_id: 'DESC' }): Promise<RoleEntity[]> {
    return this._repositoryRole.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryRole.findOne(id);
  }

}
