import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // LoginService,
    TypeOrmModule.forFeature(
      [
        UserEntity,
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
