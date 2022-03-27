import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ServiceEntity} from 'src/service/entities/service.entity';
import {CommentEntity} from './entities/comment.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      ServiceEntity
    ],
    "default")
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
