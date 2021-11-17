import { Controller, Request,Get, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from './user/dto/login-user.dto';

@ApiHeader({
  name: 'Content-Type',
  schema:{
    type: 'string', 
    default: "application/json"
  }
})
@ApiHeader({
  name: 'x-api-key',
  schema:{
    type: 'string', 
    default: "420f77de-2cea-4e13-841a-b43ca729a7a9"
  }
})
@ApiResponse({ status: 401, description: 'Unauthorized, please verify your headers or loggin up.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 400, description: 'Bad Request.' })
@UseGuards(AuthGuard('api-key'))
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(req.user);
  }
}
