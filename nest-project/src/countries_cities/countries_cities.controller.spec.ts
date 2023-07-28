import { Test, TestingModule } from '@nestjs/testing';
import { CountriesCitiesController } from './countries_cities.controller';
import { CountriesCitiesService } from './countries_cities.service';

describe('CountriesCitiesController', () => {
  let controller: CountriesCitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesCitiesController],
      providers: [CountriesCitiesService],
    }).compile();

    controller = module.get<CountriesCitiesController>(CountriesCitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
