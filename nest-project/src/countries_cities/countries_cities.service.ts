import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountriesCityDto } from './dto/create-countries_city.dto';
import { UpdateCountriesCityDto } from './dto/update-countries_city.dto';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CountriesCity } from './entities/countries_city.entity';

@Injectable()
export class CountriesCitiesService {
  constructor(private prisma: PrismaService) { }

  async create(createCountriesCityDto: CreateCountriesCityDto): Promise<CountriesCity> {
    let city = await this.prisma.city.create({ data: { ...createCountriesCityDto } })
    console.log(city)
    return city[0];
  }

  async findAll(): Promise<CountriesCity[]> {
    return await this.prisma.city.findMany();
  }

  async findAreaCities(id: number): Promise<any> {
    let foundCities = await this.prisma.city.findMany({ where: { areaId: id } });

    if (!foundCities) throw new NotFoundException('City not found!');
    return foundCities;
  }

  async findOne(id: number) {
    let foundCity = await this.prisma.city.findFirst({ where: { id } })

    if (!foundCity) throw new NotFoundException('City not found!');
    return foundCity;
  }

  async update(id: number, updateCountriesCityDto: UpdateCountriesCityDto) {
    let result = await this.prisma.city.update({
      where: { id },
      data: updateCountriesCityDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.city.delete({ where: { id } })
    return result;
  }
}
