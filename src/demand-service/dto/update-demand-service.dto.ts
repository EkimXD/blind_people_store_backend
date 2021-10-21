import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandServiceDto } from './create-demand-service.dto';

export class UpdateDemandServiceDto extends PartialType(CreateDemandServiceDto) {}
