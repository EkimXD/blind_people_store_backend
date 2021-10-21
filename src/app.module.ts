import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { RoleModule } from './role/role.module';
import { ServiceModule } from './service/service.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { CityModule } from './city/city.module';
import { DemandServiceModule } from './demand-service/demand-service.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name:'default',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      dropSchema: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ScoreModule,
    RoleModule,
    ServiceModule,
    ServiceCategoryModule,
    CityModule,
    DemandServiceModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
