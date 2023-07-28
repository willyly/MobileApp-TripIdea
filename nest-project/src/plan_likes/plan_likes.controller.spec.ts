import { Test, TestingModule } from '@nestjs/testing';
import { PlanLikesController } from './plan_likes.controller';
import { PlanLikesService } from './plan_likes.service';

describe('PlanLikesController', () => {
  let controller: PlanLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanLikesController],
      providers: [PlanLikesService],
    }).compile();

    controller = module.get<PlanLikesController>(PlanLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
