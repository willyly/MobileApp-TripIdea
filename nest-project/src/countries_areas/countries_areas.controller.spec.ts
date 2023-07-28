import { Test, TestingModule } from '@nestjs/testing';
import { CountriesAreasController } from './countries_areas.controller';
import { CountriesAreasService } from './countries_areas.service';

describe('CountriesAreasController', () => {
  let controller: CountriesAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesAreasController],
      providers: [CountriesAreasService],
    }).compile();

    controller = module.get<CountriesAreasController>(CountriesAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
