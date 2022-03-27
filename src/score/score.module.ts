import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { ScoreEntity } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/service/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserEntity,
        ScoreEntity,
        ServiceEntity
      ],
      'default',
    ),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService]
})
export class ScoreModule {}
