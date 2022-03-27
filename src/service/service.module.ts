import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ServiceEntity } from './entities/service.entity';
import { ScoreEntity } from 'src/score/entities/score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ServiceEntity,
      ScoreEntity
    ],
    "default")
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}
