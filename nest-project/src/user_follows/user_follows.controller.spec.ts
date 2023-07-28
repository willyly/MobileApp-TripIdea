import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowsController } from './user_follows.controller';
import { UserFollowsService } from './user_follows.service';

describe('UserFollowsController', () => {
  let controller: UserFollowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFollowsController],
      providers: [UserFollowsService],
    }).compile();

    controller = module.get<UserFollowsController>(UserFollowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
