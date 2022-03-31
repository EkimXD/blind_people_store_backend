import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { CityEntity } from 'src/city/entities/city.entity';
import { DemandServiceEntity } from 'src/demand-service/entities/demand-service.entity';
import { ServiceCategoryEntity } from 'src/service-category/entities/service-category.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class AddDemandedServiceDto {

    

    @ApiProperty(
        {
            description: 'Demand service id',
            default: 1,
        }
    )
    @IsNotEmpty()
    demandservice: any;

    addDemandService(dservice: DemandServiceEntity){
        if(this.demandservice==null){
            this.demandservice= Array<DemandServiceEntity>();
        }
        this.demandservice.push(dservice);
    }
}
