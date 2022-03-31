import { Module } from '@nestjs/common';
import { DemandServiceService } from './demand-service.service';
import { DemandServiceController } from './demand-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import {ServiceEntity} from 'src/service/entities/service.entity'
import { DemandServiceEntity } from './entities/demand-service.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ServiceEntity,
      DemandServiceEntity
    ],
    "default")
  ],
  controllers: [DemandServiceController],
  providers: [DemandServiceService]
})
export class DemandServiceModule {}
