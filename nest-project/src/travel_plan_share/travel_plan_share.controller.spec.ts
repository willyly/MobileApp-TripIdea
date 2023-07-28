import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanShareController } from './travel_plan_share.controller';
import { TravelPlanShareService } from './travel_plan_share.service';

describe('TravelPlanShareController', () => {
  let controller: TravelPlanShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPlanShareController],
      providers: [TravelPlanShareService],
    }).compile();

    controller = module.get<TravelPlanShareController>(TravelPlanShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
