import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LoginService } from './login.service';

@Module({
  imports: [
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '2h' },
      }),  
    PassportModule, ConfigModule, UserModule
],
  providers: [HeaderApiKeyStrategy, LocalStrategy, AuthService, LoginService],
  exports:[AuthService,LoginService]
})
export class AuthModule {}