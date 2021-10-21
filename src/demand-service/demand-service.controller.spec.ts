import { Test, TestingModule } from '@nestjs/testing';
import { DemandServiceController } from './demand-service.controller';
import { DemandServiceService } from './demand-service.service';

describe('DemandServiceController', () => {
  let controller: DemandServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandServiceController],
      providers: [DemandServiceService],
    }).compile();

    controller = module.get<DemandServiceController>(DemandServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
