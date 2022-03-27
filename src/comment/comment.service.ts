import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {CommentEntity} from './entities/comment.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentEntity)
    private _repositoryComment: Repository<CommentEntity>
  ) { }

  create(createCommentDto: CreateCommentDto) {
    return this._repositoryComment.save(createCommentDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.comment_id
        };
      })
      .catch((e) => {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
      );
  }

  findAll(where: any = {"parent":null}, relations: any = ['user', "service","children","children.user","children.service"], skip: number = 0, take: number = 10, order: any = { comment_id: 'DESC' }) {
    return this._repositoryComment.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this._repositoryComment.update(id, updateCommentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
