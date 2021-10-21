import { Test, TestingModule } from '@nestjs/testing';
import { DemandServiceService } from './demand-service.service';

describe('DemandServiceService', () => {
  let service: DemandServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemandServiceService],
    }).compile();

    service = module.get<DemandServiceService>(DemandServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
