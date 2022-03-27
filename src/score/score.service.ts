import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoreEntity } from './entities/score.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoreService {

  constructor(
    @InjectRepository(ScoreEntity)
    private _repositoryScore: Repository<ScoreEntity>
  ) { }

  create(createScoreDto: CreateScoreDto) {
    return this._repositoryScore.save(createScoreDto)
      .then((ok) => {
        return {
          statusCode: 201,
          message: "The record has been successfully created.",
          record_id: ok.score_id
        };
      })
      .catch((e) => {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
      );
  }

  findAll(where: any = {}, relations: any = ['user','service'], skip: number = 0, take: number = 10, order: any = { score_id: 'DESC' }) {
    return this._repositoryScore.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryScore.findOne(id, {relations:['user', 'service']});
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return this._repositoryScore.update(id, updateScoreDto);
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
