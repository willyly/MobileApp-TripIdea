import { Test, TestingModule } from '@nestjs/testing';
import { PlanLikesService } from './plan_likes.service';

describe('PlanLikesService', () => {
  let service: PlanLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanLikesService],
    }).compile();

    service = module.get<PlanLikesService>(PlanLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
