import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { RoleEntity } from 'src/role/entities/role.entity';

export class CreateDemandServiceDto {
    
    @ApiProperty(
        {
            description: 'title',
            default: "Test demandservice",
        }
    )
    @IsNotEmpty()
    @IsString()
    demand_title: string;

    @ApiProperty(
        {
            description: 'User email',
            default: "lorem largo",
        }
    )
    @IsNotEmpty()
    @IsString()
    demand_description: string;

    @ApiProperty(
        {
            description: "User id",
            default: "2",
        }
    )
    @IsNotEmpty()
    user: any;

}