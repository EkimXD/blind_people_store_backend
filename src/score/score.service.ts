import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoreEntity } from './entities/score.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
@Injectable()
export class ScoreService {

  constructor(
    @InjectRepository(ScoreEntity)
    private _repositoryScore: Repository<ScoreEntity>,
    @InjectRepository(UserEntity)
    private _repositoryUser: Repository<UserEntity>
  ) { }

  create(createScoreDto: CreateScoreDto) {
    return new Promise((resolve, reject) => {
      this._repositoryScore.findOne({
        where: {
          user: createScoreDto.user,
          service: createScoreDto.service
        }
      })
        .then(
          result => {
            if (result == undefined || result == null) {
              this._repositoryScore.save(createScoreDto)
                .then((ok) => {
                  resolve(
                    {
                      statusCode: 201,
                      message: "The record has been successfully created.",
                      record_id: ok.score_id
                    }
                  );
                })
                .catch((e) => {
                  throw new BadRequestException(
                    'There was an error, please try later with diferent data.',
                  );
                }
                );
            }
            else {
              this._repositoryScore.update(result.score_id, createScoreDto)
                .then((ok) => {
                  resolve({
                    statusCode: 201,
                    message: "The record has been successfully updated.",
                    record_id: result.score_id
                  }
                  );
                })
                .catch((e) => {
                  throw new BadRequestException(
                    'There was an error, please try later with diferent data.',
                  );
                }
                );
            }
            console.log("Java", result)
          }
        )
    }
    );
  }

  findScore(serviceId:number, userId:number) {
    return this._repositoryScore.findOne({
      where: {
        user: userId,
        service: serviceId
      }
    });
  }

  findAll(where: any = {}, relations: any = ['user', 'service'], skip: number = 0, take: number = 10, order: any = { score_id: 'DESC' }) {
    return this._repositoryScore.find({
      where: where,
      skip: skip,
      take: take,
      order: order,
      relations
    });
  }

  findOne(id: number) {
    return this._repositoryScore.findOne(id, { relations: ['user', 'service'] });
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return this._repositoryScore.update(id, updateScoreDto);
  }

  findScoreForUser(id: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this._repositoryUser
          .find(
            {
              where: {
                user_id: +id
              },
              relations: ["service", "service.score"]
            }
          )
          .then(
            result => {
              if (result !== []) {
                let counter = 0;
                const sumScore = result[0].service
                  .reduce((a, b) => {
                    return a + b.score.reduce(
                      (a, b) => {
                        counter += 1;
                        return a + b.score_number
                      }
                      , 0)
                  }, 0)
                resolve(sumScore / counter);
              } else {
                resolve("--");
              }
              resolve(result);
            }
          )
          // this._repositoryScore
          //   .find(
          //     {
          //       where: {
          //         service: {
          //           user: {
          //             user_id: +id
          //           }
          //         }
          //       },
          //       relations: ["service", "service.user"]
          //     }
          //   )
          //   .then(
          //     result => {
          //       console.log(result);
          //       if (result === []) {
          //         const sumScore = result.reduce((a, b) => a + b.score_number, 0)
          //         resolve(sumScore / result.length);
          //       } else {
          //         resolve("--");
          //       }
          //     }
          //   )
          .catch(
            error =>
              reject(error)
          )
      }
    )
  }

  findScoreForService(id: number): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this._repositoryScore
          .find(
            {
              where: {
                service: +id
              }
            }
          )
          .then(
            result => {
              if (result !== []) {
                console.log(result);
                const sumScore = result.reduce((a, b) => a + b.score_number, 0)
                resolve(sumScore / result.length);
              } else {
                resolve("--");
              }
            }
          )
          .catch(
            error =>
              reject(error)
          )
      }
    )
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
