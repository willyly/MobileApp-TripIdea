import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CreateTravelPlanDayDto } from './dto/create-travel_plan_day.dto';
import { UpdateTravelPlanDayDto } from './dto/update-travel_plan_day.dto';
import { TravelPlanDay } from './entities/travel_plan_day.entity';

@Injectable()
export class TravelPlanDaysService {
  constructor(private prisma: PrismaService) { }

  async create(createTravelPlanDayDto: CreateTravelPlanDayDto): Promise<TravelPlanDay> {
    let travelPlanDay = await this.prisma.travelPlanDay.create({ data: { ...createTravelPlanDayDto } })
    console.log(travelPlanDay)
    return travelPlanDay
  }

  async findAll(): Promise<TravelPlanDay[]> {
    return await this.prisma.travelPlanDay.findMany({
      include: {
        travelPlanDetail: true
      }
    });
  }

  // async getTotalDay(id: number) {
  //   let foundTravelPlanDay = await this.prisma.travelPlanDay.findMany({
  //     where: { travelPlanId: id },
  //     include: {
  //       travelPlanDetail: true
  //     }
  //   })

  //   console.log('foundTravelPlanDay', foundTravelPlanDay)

  //   if (!foundTravelPlanDay) throw new NotFoundException('TravelPlanDay not found!')
  //   return foundTravelPlanDay;
  // }

  async findOne(id: number) {
    let foundTravelPlanDay = await this.prisma.travelPlanDay.findFirst({
      where: { id },
      include: {
        travelPlanDetail: true
      }
    })

    console.log('foundTravelPlanDay', foundTravelPlanDay)

    if (!foundTravelPlanDay) throw new NotFoundException('TravelPlanDay not found!')
    return foundTravelPlanDay;
  }

  async update(id: number, updateTravelPlanDayDto: UpdateTravelPlanDayDto) {
    let result = await this.prisma.travelPlanDay.update({
      where: { id },
      data: updateTravelPlanDayDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.travelPlanDay.delete({ where: { id } })
    return result
  }
}
