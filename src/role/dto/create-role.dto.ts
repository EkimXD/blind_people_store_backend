import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateRoleDto {
    @ApiProperty(
        {
            description: "role_name"
        }
    )
    role_name:string;
    role_description:string;
}
