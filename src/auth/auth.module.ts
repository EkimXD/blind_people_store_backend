import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '2h' },
      }),  
    PassportModule, ConfigModule, forwardRef(() => UserModule)
],
  providers: [HeaderApiKeyStrategy, LocalStrategy, AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}