import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountriesAreasService } from './countries_areas.service';
import { CreateCountriesAreaDto } from './dto/create-countries_area.dto';
import { UpdateCountriesAreaDto } from './dto/update-countries_area.dto';
import { CountriesArea } from './entities/countries_area.entity';

@ApiTags('countries-areas')
@Controller('countries-areas')
export class CountriesAreasController {
  constructor(private readonly countriesAreasService: CountriesAreasService) { }

  @Post()
  async create(@Body() createCountriesAreaDto: CreateCountriesAreaDto) {
    return await this.countriesAreasService.create(createCountriesAreaDto);
  }

  @Get()
  async findAll(): Promise<CountriesArea[]> {
    return await this.countriesAreasService.findAll();
  }

  @Get('/countryAreas/:id')
  async findCountryAreas(@Param('id') id: string) {
    return await this.countriesAreasService.findCountryAreas(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.countriesAreasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateCountriesAreaDto: UpdateCountriesAreaDto) {
    return await this.countriesAreasService.update(+id, updateCountriesAreaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.countriesAreasService.remove(+id);
  }
}
