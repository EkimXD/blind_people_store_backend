import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ServiceEntity } from './entities/service.entity';
import { ScoreEntity } from 'src/score/entities/score.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import {DemandServiceEntity} from 'src/demand-service/entities/demand-service.entity'
import { DemandServiceService } from 'src/demand-service/demand-service.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ServiceEntity,
      ScoreEntity,
      CommentEntity,
      DemandServiceEntity
    ],
    "default")
  ],
  controllers: [ServiceController],
  providers: [ServiceService, DemandServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}
