import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CreateTravelPlanShareDto } from './dto/create-travel_plan_share.dto';
import { UpdateTravelPlanShareDto } from './dto/update-travel_plan_share.dto';
import { TravelPlanShare } from './entities/travel_plan_share.entity';

@Injectable()
export class TravelPlanShareService {
  constructor(private prisma: PrismaService) { }

  async create(createTravelPlanShareDto: CreateTravelPlanShareDto): Promise<TravelPlanShare> {
    let travelPlanShare = await this.prisma.travelPlanShare.create({ data: { ...createTravelPlanShareDto } })
    return travelPlanShare;
  }

  async findAll(): Promise<TravelPlanShare[]> {
    return await this.prisma.travelPlanShare.findMany()
  }

  async findShare(id: number, name: string): Promise<any[]> {
    console.log('name', name)
    console.log('id', id)
    const plans = [];
    let likes = [];
    const users = await this.prisma.user.findMany();
    const travelPlanShare = await this.prisma.travelPlanShare.findMany({ where: { shareUserId: id } })

    switch (name) {
      case (name):
        //have share relationship, author not user
        for await (let planShare of travelPlanShare) {
          const sharePlan = await this.prisma.travelPlan.findMany({
            where: {
              id: planShare.travelPlanId,
              name: { contains: name },
            },
            include: {
              travelPlanDay: true,
              likes: true,
              travelPlanChildren: true
            }
          });
          // console.log('sharePlan', sharePlan)

          if (sharePlan.length !== 0) {
            const sharePlanUser = users.filter(({ id }) => id == sharePlan[0]?.authorId)[0];
            const tripStartDate = sharePlan[0].startDay;
            const tripEndDate = sharePlan[0].endDay;

            let date_1 = new Date(tripEndDate)
            let date_2 = new Date(tripStartDate);

            let difference = date_1.getTime() - date_2.getTime();

            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

            const sharePlanResult = { ...sharePlan[0], userNickname: sharePlanUser?.nickname, TotalDays: TotalDays };

            plans.push(sharePlanResult);
          }
        }

        //author is user
        const userPlan = await this.prisma.travelPlan.findMany({
          where: {
            authorId: id,
            name: { contains: name },
          },
          include: {
            travelPlanDay: true,
            likes: true,
            travelPlanChildren: true
          }
        });
        // console.log('userPlan', userPlan)

        if (userPlan.length !== 0) {
          const userPlanUser = users.filter(({ id }) => id == userPlan[0].authorId)[0];
          for (let x = 0; x < userPlan.length; x++) {
            const tripStartDate = userPlan[0].startDay;
            const tripEndDate = userPlan[0].endDay;

            let date_1 = new Date(tripEndDate)
            let date_2 = new Date(tripStartDate);

            let difference = date_1.getTime() - date_2.getTime();

            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

            const userPlanResult = { ...userPlan[x], userNickname: userPlanUser?.nickname, TotalDays: TotalDays };

            plans.push(userPlanResult)[x];
          }
        };

        break;
    }

    for await (let plan of plans) {
      if (plan.likes.length > 0) {
        const planLike = { ...plan, planLikes: plan.likes.length }
        likes.push(planLike)
      } else {
        const planLike = { ...plan, planLikes: 0 }
        likes.push(planLike)
      }
    }

    const searchSharePlan = likes.sort((a, b) => b.planLikes - a.planLikes)

    // console.log('searchSharePlan', searchSharePlan)
    return searchSharePlan;
  }

  async findOne(id: number) {
    let foundTravelPlanShare = await this.prisma.travelPlanShare.findFirst({ where: { id } })

    if (!foundTravelPlanShare) throw new NotFoundException('TravelPlanShare not found!')
    return foundTravelPlanShare
  }

  async update(id: number, updateTravelPlanShareDto: UpdateTravelPlanShareDto) {
    let result = await this.prisma.travelPlanShare.update({
      where: { id },
      data: updateTravelPlanShareDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.travelPlanShare.delete({ where: { id } })
    return result;
  }
}
