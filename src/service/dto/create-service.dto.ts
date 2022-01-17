import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { CityEntity } from 'src/city/entities/city.entity';
import { ServiceCategoryEntity } from 'src/service-category/entities/service-category.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateServiceDto {

    @ApiProperty(
        {
            description: 'Service name',
            default: "Test service",
        }
    )
    @IsNotEmpty()
    @IsString()
    service_name: string;

    @ApiProperty(
        {
            description: 'Service description',
            default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        }
    )
    @IsNotEmpty()
    @IsString()
    service_description: string;

    @ApiProperty(
        {
            description: 'Service image url',
            default: "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F026%2F489%2Fcrying.jpg",
        }
    )
    @IsNotEmpty()
    @IsDataURI()
    service_image?: string="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F026%2F489%2Fcrying.jpg";
    
    @ApiProperty(
        {
            description: 'Service price',
            default: "Free",
        }
    )
    @IsNotEmpty()
    service_price?: string="Free";

    @ApiProperty(
        {
            description: 'Service owner id',
            default: 1,
        }
    )
    @IsNotEmpty()
    user: any;

    @ApiProperty(
        {
            description: 'Service city id',
            default: 1,
        }
    )
    @IsNotEmpty()
    city: any;

    @ApiProperty(
        {
            description: 'Service category id',
            default: 1,
        }
    )
    @IsNotEmpty()
    sc: any;

    public static getDTO(serviceDTO:CreateServiceDto):CreateServiceDto{
        serviceDTO.user=UserEntity.getUserFake(+serviceDTO.user);
        serviceDTO.city=CityEntity.getCityFake(+serviceDTO.city);
        serviceDTO.sc=ServiceCategoryEntity.getSCFake(+serviceDTO.sc);
        return serviceDTO
    }
}
