import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCityDto {
    @ApiProperty(
        {
            description: 'state name',
            default: "Pichincha",
        }
    )
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty(
        {
            description: 'city name',
            default: "Quito",
        }
    )
    @IsNotEmpty()
    @IsString()
    city: string;

    // public static getDTO(cityDTO:CreateCityDto):CreateCityDto{
    //     serviceDTO.user=UserEntity.getUserFake(+serviceDTO.user)
    //     return serviceDTO
    // }


}
