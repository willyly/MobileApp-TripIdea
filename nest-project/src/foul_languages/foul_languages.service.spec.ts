import { Test, TestingModule } from '@nestjs/testing';
import { FoulLanguagesService } from './foul_languages.service';

describe('FoulLanguagesService', () => {
  let service: FoulLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoulLanguagesService],
    }).compile();

    service = module.get<FoulLanguagesService>(FoulLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
