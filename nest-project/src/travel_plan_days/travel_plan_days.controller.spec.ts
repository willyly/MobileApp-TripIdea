import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanDaysController } from './travel_plan_days.controller';
import { TravelPlanDaysService } from './travel_plan_days.service';

describe('TravelPlanDaysController', () => {
  let controller: TravelPlanDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPlanDaysController],
      providers: [TravelPlanDaysService],
    }).compile();

    controller = module.get<TravelPlanDaysController>(TravelPlanDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
