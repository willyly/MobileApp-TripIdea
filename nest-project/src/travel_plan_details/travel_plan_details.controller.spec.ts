import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanDetailsController } from './travel_plan_details.controller';
import { TravelPlanDetailsService } from './travel_plan_details.service';

describe('TravelPlanDetailsController', () => {
  let controller: TravelPlanDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPlanDetailsController],
      providers: [TravelPlanDetailsService],
    }).compile();

    controller = module.get<TravelPlanDetailsController>(TravelPlanDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
