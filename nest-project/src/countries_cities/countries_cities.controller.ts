import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountriesCitiesService } from './countries_cities.service';
import { CreateCountriesCityDto } from './dto/create-countries_city.dto';
import { UpdateCountriesCityDto } from './dto/update-countries_city.dto';
import { CountriesCity } from './entities/countries_city.entity';

@ApiTags('countries-cities')
@Controller('countries-cities')
export class CountriesCitiesController {
  constructor(private readonly countriesCitiesService: CountriesCitiesService) { }

  @Post()
  async create(@Body() createCountriesCityDto: CreateCountriesCityDto) {
    return await this.countriesCitiesService.create(createCountriesCityDto);
  }

  @Get()
  async findAll(): Promise<CountriesCity[]> {
    return await this.countriesCitiesService.findAll();
  }

  @Get('/areaCities/:id')
  async findAreaCities(@Param('id') id: string): Promise<any> {
    return await this.countriesCitiesService.findAreaCities(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.countriesCitiesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateCountriesCityDto: UpdateCountriesCityDto) {
    return await this.countriesCitiesService.update(+id, updateCountriesCityDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.countriesCitiesService.remove(+id);
  }
}
