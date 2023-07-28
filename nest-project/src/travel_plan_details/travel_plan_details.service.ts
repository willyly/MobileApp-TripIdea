import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CreateTravelPlanDetailDto } from './dto/create-travel_plan_detail.dto';
import { UpdateTravelPlanDetailDto } from './dto/update-travel_plan_detail.dto';
import { TravelPlanDetail } from './entities/travel_plan_detail.entity';

@Injectable()
export class TravelPlanDetailsService {
  constructor(private prisma: PrismaService) { }

  async create(id: number, createTravelPlanDetailDto: CreateTravelPlanDetailDto): Promise<TravelPlanDetail> {
    let travelPlanDetails = await this.prisma.travelPlanDetail.create({ data: { ...createTravelPlanDetailDto } })
    console.log(travelPlanDetails)
    return travelPlanDetails;
  }

  async findAll(): Promise<TravelPlanDetail[]> {
    const users = await this.prisma.user.findMany();
    const plans = []
    return await this.prisma.travelPlanDetail.findMany();
  }

  async getTotalDay(id: number, whichDay: number) {
    let planTotalDays = await this.prisma.travelPlanDay.findMany({
      where: { travelPlanId: id },
      include: {
        travelPlanDetail: true
      }
    })

    // console.log('planTotalDays', planTotalDays)

    if (whichDay) {
      for (let planDay of planTotalDays) {
        if (planDay.travelPlanId == id && planDay.whichDay == whichDay) {
          let foundTravelPlanDay = await this.prisma.travelPlanDay.findFirst({
            where: {
              travelPlanId: id,
              whichDay: whichDay
            },
            include: {
              travelPlanDetail: true
            }
          })
          console.log('foundTravelPlanDay', foundTravelPlanDay)
          return foundTravelPlanDay;
        }
      }
    } else {
      throw new NotFoundException('TravelPlanDay not found!')
    }
  }

  async findOne(id: number) {
    let foundTravelPlanDetail = await this.prisma.travelPlanDetail.findFirst({ where: { id } });

    if (!foundTravelPlanDetail) throw new NotFoundException("TravelPlanDetail not found!")
    return foundTravelPlanDetail;
  }

  async update(id: number, updateTravelPlanDetailDto: UpdateTravelPlanDetailDto) {
    let result = await this.prisma.travelPlanDetail.update({
      where: { id },
      data: updateTravelPlanDetailDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.travelPlanDetail.delete({ where: { id } })
    return result;
  }
}
