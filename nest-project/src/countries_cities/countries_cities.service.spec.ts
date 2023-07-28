import { Test, TestingModule } from '@nestjs/testing';
import { CountriesCitiesService } from './countries_cities.service';

describe('CountriesCitiesService', () => {
  let service: CountriesCitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesCitiesService],
    }).compile();

    service = module.get<CountriesCitiesService>(CountriesCitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
