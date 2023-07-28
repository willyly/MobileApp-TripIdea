import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelPlanDto } from './dto/create-travel_plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel_plan.dto';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { TravelPlan } from './entities/travel_plan.entity';
import { CreateTravelPlanDayDto } from '../travel_plan_days/dto/create-travel_plan_day.dto'
import { PlanLikes, TravelPlanDay, TravelPlanShare, User } from '@prisma/client';


@Injectable()
export class TravelPlansService {
    constructor(private prisma: PrismaService) { }

    async create(createTravelPlanDto: CreateTravelPlanDto, createTravelPlanDayDto: CreateTravelPlanDayDto): Promise<TravelPlan> {

        console.log({ createTravelPlanDto });

        let travelPlans = await this.prisma.travelPlan.create({ data: { ...createTravelPlanDto } })
        // console.log(travelPlans)
        const tripStartDate = travelPlans.startDay;
        const tripEndDate = travelPlans.endDay;

        let date_1 = new Date(tripEndDate)
        let date_2 = new Date(tripStartDate);

        let difference = date_1.getTime() - date_2.getTime();

        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        // console.log(TotalDays + ' days to world Cup');

        const plan = { ...travelPlans, TotalDays: TotalDays }

        for (let x = 1; x < TotalDays + 1; x++) {
            let number = x;
            const createTravelPlanDay = await this.prisma.travelPlanDay.create({
                data: {
                    travelPlanId: plan.id,
                    whichDay: number,
                }
            })
            // console.log('createTravelPlanDay', createTravelPlanDay)
        }

        // console.log('plan', plan)

        return plan;
    }

    async findAll(): Promise<any[]> {
        const users = await this.prisma.user.findMany();
        let travelPlans = await this.prisma.travelPlan.findMany({
            include: {
                travelPlanDay: true,
                likes: true,
                travelPlanChildren: true
            }
        });

        const plans = []

        for (let travelPlan of travelPlans) {
            const user = users.filter(({ id }) => id == travelPlan.authorId)[0];
            const plan = { ...travelPlan, userNickname: user?.nickname };

            plans.push(plan);
        }

        return plans;
    }

    async getTravelPlanId(): Promise<any[]> {
        let travelPlans = await this.prisma.travelPlan.findMany({});
        console.log('travelPlans', travelPlans)

        let totalPlanId = []

        for (let travelPlan of travelPlans) {
            totalPlanId.push(travelPlan.id)
        }

        let newTravelPlanId = (totalPlanId[totalPlanId.length - 1]) + 1
        // console.log('totalPlanId', totalPlanId[totalPlanId.length - 1])
        // console.log('newTravelPlanId', newTravelPlanId)

        return newTravelPlanId;
    }

    async findMyselfPlan(id: number, name: string): Promise<any[]> {
        console.log('name', name)
        const users = await this.prisma.user.findMany({ where: { id } });
        let travelPlans;

        if (name) {
            travelPlans = await this.prisma.travelPlan.findMany({
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
        } else {
            travelPlans = await this.prisma.travelPlan.findMany({
                where: { authorId: id },
                include: {
                    travelPlanDay: true,
                    likes: true,
                    travelPlanChildren: true
                }
            });
        }

        const plans = []

        for (let travelPlan of travelPlans) {
            const user = users.filter(({ id }) => id == travelPlan.authorId)[0];
            const tripStartDate = travelPlan.startDay;
            const tripEndDate = travelPlan.endDay;

            let date_1 = new Date(tripEndDate)
            let date_2 = new Date(tripStartDate);

            let difference = date_1.getTime() - date_2.getTime();

            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

            const plan = { ...travelPlan, userNickname: user?.nickname, TotalDays: TotalDays };

            plans.push(plan);
        }

        return plans;
    }

    async findHitPlan(name: string): Promise<any[]> {
        console.log('name', name)
        const users = await this.prisma.user.findMany();
        const travelPlans = await (async () => {
            if (name) {
                return await this.prisma.travelPlan.findMany({
                    where: {
                        name: { contains: name, },
                    },
                    include: {
                        travelPlanDay: true,
                        likes: true,
                        travelPlanChildren: true
                    }
                });
            }

            return await this.prisma.travelPlan.findMany({
                include: {
                    travelPlanDay: true,
                    likes: true,
                    travelPlanChildren: true
                }
            });
        })();

        const plans = []

        for (let travelPlan of travelPlans) {
            const user = users.filter(({ id }) => id == travelPlan.authorId)[0];
            const tripStartDate = travelPlan.startDay;
            const tripEndDate = travelPlan.endDay;

            let date_1 = new Date(tripEndDate)
            let date_2 = new Date(tripStartDate);

            let difference = date_1.getTime() - date_2.getTime();

            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

            const plan = { ...travelPlan, userNickname: user?.nickname, TotalDays: TotalDays };

            plans.push(plan);
        }

        let likes = [];

        for await (let plan of plans) {
            if (plan.status == "PUBLIC") {
                if (plan.likes.length > 0) {
                    const planLike = { ...plan, planLikes: plan.likes.length }
                    likes.push(planLike)
                } else {
                    const planLike = { ...plan, planLikes: 0 }
                    likes.push(planLike)
                }
            }
        }

        const searchHitPlan = likes.sort((a, b) => b.planLikes - a.planLikes)

        console.log('searchHitPlan', searchHitPlan)
        return searchHitPlan;
    }

    async findPlansCreatedByUser(userId: number): Promise<Array<TravelPlan & {
        likes: Array<PlanLikes>,
        travelPlanChildren: Array<TravelPlan>,
        travelPlanDay: Array<TravelPlanDay>,
        TravelPlanShare: Array<TravelPlanShare>,
        author: User
    }>> {
        const travelPlans = await this.prisma.travelPlan.findMany({
            where: { authorId: userId },
            include: {
                travelPlanDay: true,
                likes: true,
                travelPlanChildren: true,
                TravelPlanShare: true,
                author: true
            }
        });
        console.log('findPlansCreatedByUser: ', travelPlans);

        return travelPlans;
    }

    async findOne(id: number) {
        let foundTravelPlan = await this.prisma.travelPlan.findFirst({
            where: { id },
            include: {
                travelPlanDay: true,
                likes: true,
                travelPlanChildren: true
            }
        })
        console.log('foundTravelPlan', foundTravelPlan)

        const users = await this.prisma.user.findFirst({ where: { id: foundTravelPlan.authorId } })
        console.log('users', users)
        const tripStartDate = foundTravelPlan.startDay;
        const tripEndDate = foundTravelPlan.endDay;

        let date_1 = new Date(tripEndDate)
        let date_2 = new Date(tripStartDate);

        let difference = date_1.getTime() - date_2.getTime();

        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

        const planResult = []

        if (foundTravelPlan.likes.length > 0) {
            const plan = { ...foundTravelPlan, userNickname: users?.nickname, userIcon: users.icon, TotalDays: TotalDays, planLikes: foundTravelPlan.likes.length };
            planResult.push(plan)
        } else {
            const plan = { ...foundTravelPlan, userNickname: users?.nickname, userIcon: users.icon, TotalDays: TotalDays, planLikes: 0 };
            planResult.push(plan)
        }

        console.log('planResult', planResult)

        if (!foundTravelPlan) throw new NotFoundException("TravelPlan not found!")
        return planResult;
    }

    async update(id: number, updateTravelPlanDto: UpdateTravelPlanDto) {
        let result = await this.prisma.travelPlan.update({
            where: { id },
            data: updateTravelPlanDto
        })
        return result;
    }

    async remove(id: number) {
        let result = [];
        let travelPlanId;
        // console.log('id', id)

        const travelPlanShare = await this.prisma.travelPlanShare.findMany({ where: { travelPlanId: id } })

        for await (let planShare of travelPlanShare) {
            console.log('travelPlanShare', travelPlanShare)
            if (planShare.travelPlanId == id) {
                travelPlanId = planShare.id
            }
        }

        if (travelPlanShare.length !== 0) {
            let travelPlanShareResult = await this.prisma.travelPlanShare.delete({ where: { id: travelPlanId } })
            result.push(travelPlanShareResult)
        }

        const travelPlanDays = await this.prisma.travelPlanDay.findMany({ where: { travelPlanId: id } })
        // console.log('travelPlanDays', travelPlanDays)

        for await (let planDay of travelPlanDays) {
            if (planDay.travelPlanId == id) {
                travelPlanId = planDay.id
            }
        }

        if (travelPlanDays.length !== 0) {
            for (let travelPlanDay of travelPlanDays) {
                let travelPlanDayResult = await this.prisma.travelPlanDay.deleteMany({ where: { travelPlanId: id } })
                result.push(travelPlanDayResult)
            }
        }

        let travelPlanResult = await this.prisma.travelPlan.delete({ where: { id } })
        result.push(travelPlanResult)

        return result;
    }
}
