import { Test, TestingModule } from '@nestjs/testing';
import { CountriesAreasService } from './countries_areas.service';

describe('CountriesAreasService', () => {
  let service: CountriesAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesAreasService],
    }).compile();

    service = module.get<CountriesAreasService>(CountriesAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
