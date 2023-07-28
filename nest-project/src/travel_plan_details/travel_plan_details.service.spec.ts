import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanDetailsService } from './travel_plan_details.service';

describe('TravelPlanDetailsService', () => {
  let service: TravelPlanDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanDetailsService],
    }).compile();

    service = module.get<TravelPlanDetailsService>(TravelPlanDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
