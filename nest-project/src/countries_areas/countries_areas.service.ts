import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CreateCountriesAreaDto } from './dto/create-countries_area.dto';
import { UpdateCountriesAreaDto } from './dto/update-countries_area.dto';
import { CountriesArea } from './entities/countries_area.entity';

@Injectable()
export class CountriesAreasService {
  constructor(private prisma: PrismaService) { }

  async create(createCountriesAreaDto: CreateCountriesAreaDto) {
    let areas = await this.prisma.area.create({ data: { ...createCountriesAreaDto } })
    console.log(areas)
    return areas;
  }

  async findAll(): Promise<CountriesArea[]> {
    return await this.prisma.area.findMany();
  }

  async findCountryAreas(id: number) {
    let foundAreas = await this.prisma.area.findMany({ where: { countryId: id } })
    // console.log('foundArea', foundArea)

    if (!foundAreas) throw new NotFoundException('Area not found!')
    return foundAreas;
  }

  async findOne(id: number) {
    let foundArea = await this.prisma.area.findFirst({ where: { id } })

    if (!foundArea) throw new NotFoundException('Area not found!')
    return foundArea;
  }

  async update(id: number, updateCountriesAreaDto: UpdateCountriesAreaDto) {
    let result = await this.prisma.area.update({
      where: { id },
      data: updateCountriesAreaDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.area.delete({ where: { id } })
    return result;
  }
}
