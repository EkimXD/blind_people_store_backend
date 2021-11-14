import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


export class LoginUserDTO {

    @ApiProperty(
        {
            description: 'User email',
            default: "test.user@email.com",
        }
    )
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            description: 'User account password',
            default: "TestUserpass01",
        }
    )
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    password: string;
}

