import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { RoleEntity } from 'src/role/entities/role.entity';

export class UpdateUserDto {
    
    @ApiProperty(
        {
            description: 'User name',
            default: "Test user",
        }
    )
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @ApiProperty(
        {
            description: 'User email',
            default: "test.user@email.com",
        }
    )
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    user_email: string;


    @ApiProperty(
        {
            description: "User's phone number",
            default: "0999999999",
        }
    )
    @IsNotEmpty()
    @IsString()
    user_phone: string;

    @ApiProperty(
        {
            description: "User's blind discapacity percentage",
            default: "0.0",
        }
    )
    @IsNotEmpty()
    blind_discapacity_percentage?: number = 0.0;

    @IsNotEmpty()
    role?:RoleEntity=RoleEntity.getDefaultRole();

}

