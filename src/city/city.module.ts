import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityEntity,
      ServiceEntity
    ],
    "default")
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],

})
export class CityModule {}
