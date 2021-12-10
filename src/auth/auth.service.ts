import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any | Object) {
        console.log(user)
        const payload = {
            userid: user.user_id,
            username: user.user_name,
            userrole: user.role.role_id
        };
        // console.log(payload);
        user.access_token = this.jwtService.sign(payload);
        return user;
    }

}