import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { RoleEntity } from 'src/role/entities/role.entity';
import { ServiceEntity } from 'src/service/entities/service.entity';
import { ScoreEntity } from 'src/score/entities/score.entity';
import { RoleModule } from 'src/role/role.module';
import { DemandServiceEntity } from "src/demand-service/entities/demand-service.entity";

@Module({
  imports: [
    // LoginService,
    TypeOrmModule.forFeature(
      [
        UserEntity,
        RoleEntity,
        ServiceEntity,
        ScoreEntity,
        DemandServiceEntity
      ],
      'default',
    ),

    // JwtModule.register({
    //   secret: "secret",
    //   signOptions: { expiresIn: '2h' },
    // }),  
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule { }
