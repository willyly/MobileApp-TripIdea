import { Module } from '@nestjs/common';
import { CountriesAreasService } from './countries_areas.service';
import { CountriesAreasController } from './countries_areas.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CountriesService } from 'src/countries/countries.service';

@Module({
  controllers: [CountriesAreasController],
  providers: [CountriesAreasService, PrismaService, CountriesService]
})
export class CountriesAreasModule { }
