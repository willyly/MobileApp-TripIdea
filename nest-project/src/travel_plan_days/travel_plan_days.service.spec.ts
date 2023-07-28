import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanDaysService } from './travel_plan_days.service';

describe('TravelPlanDaysService', () => {
  let service: TravelPlanDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanDaysService],
    }).compile();

    service = module.get<TravelPlanDaysService>(TravelPlanDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
