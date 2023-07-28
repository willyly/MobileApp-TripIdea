import { Module } from '@nestjs/common';
import { CountriesCitiesService } from './countries_cities.service';
import { CountriesCitiesController } from './countries_cities.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CountriesAreasService } from 'src/countries_areas/countries_areas.service';

@Module({
  controllers: [CountriesCitiesController],
  providers: [CountriesCitiesService, PrismaService, CountriesAreasService]
})
export class CountriesCitiesModule { }
