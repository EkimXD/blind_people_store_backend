import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from './entities/service-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategoryEntity
    ],
    "default")
  ],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService]
})
export class ServiceCategoryModule {}
