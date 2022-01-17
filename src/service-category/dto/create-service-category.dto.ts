import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


export class CreateServiceCategoryDto {

    @ApiProperty(
        {
            description: 'sc name',
            default: "Servicios domesticos",
        }
    )
    @IsNotEmpty()
    @IsString()
    sc_name: string;

    @ApiProperty(
        {
            description: 'sc description',
            default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        }
    )
    @IsNotEmpty()
    @IsString()
    sc_description: string;

}
