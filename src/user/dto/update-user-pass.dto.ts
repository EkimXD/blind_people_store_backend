import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { RoleEntity } from 'src/role/entities/role.entity';

export class UpdateUserPassDto {
    
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

