import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateScoreDto {
    
    @ApiProperty(
        {
            description: 'Grade',
            default: 3,
        }
    )
    @IsNotEmpty()
    score_number: number;

    @ApiProperty(
        {
            description: 'User account password',
            default: 1,
        }
    )
    @IsNotEmpty()
    user?: any;

    @ApiProperty(
        {
            description: "User's phone number",
            default: 1,
        }
    )
    @IsNotEmpty()
    service?: any;

}

