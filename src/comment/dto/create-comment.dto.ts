import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCommentDto {
    
    @ApiProperty(
        {
            description: 'Comment for service',
            default: 'Comentaries'
        }
    )
    @IsNotEmpty()
    comment: string;

    @ApiProperty(
        {
            description: 'Service id',
            default: 1,
        }
    )
    @IsNotEmpty()
    service?: any;

    @ApiProperty(
        {
            description: 'User id',
            default: 1,
        }
    )
    @IsNotEmpty()
    user?: any;

    @ApiProperty(
        {
            description: "Parent of the comment",
            default: 1,
        }
    )
    parent?: any;

}

