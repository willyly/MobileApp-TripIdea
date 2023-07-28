import { Test, TestingModule } from '@nestjs/testing';
import { FoulLanguagesController } from './foul_languages.controller';
import { FoulLanguagesService } from './foul_languages.service';

describe('FoulLanguagesController', () => {
  let controller: FoulLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoulLanguagesController],
      providers: [FoulLanguagesService],
    }).compile();

    controller = module.get<FoulLanguagesController>(FoulLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
