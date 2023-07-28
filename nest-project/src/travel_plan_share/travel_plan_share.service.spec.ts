import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanShareService } from './travel_plan_share.service';

describe('TravelPlanShareService', () => {
  let service: TravelPlanShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanShareService],
    }).compile();

    service = module.get<TravelPlanShareService>(TravelPlanShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
