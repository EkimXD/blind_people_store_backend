import { Module } from '@nestjs/common';
import { DemandServiceService } from './demand-service.service';
import { DemandServiceController } from './demand-service.controller';

@Module({
  controllers: [DemandServiceController],
  providers: [DemandServiceService]
})
export class DemandServiceModule {}
