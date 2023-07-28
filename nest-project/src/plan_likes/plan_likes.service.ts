import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanLikeDto } from './dto/create-plan_like.dto';
import { UpdatePlanLikeDto } from './dto/update-plan_like.dto';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { PlanLike } from './entities/plan_like.entity';

@Injectable()
export class PlanLikesService {
    constructor(private prisma: PrismaService) { }

    async create(travelPlanId: number, likeUserId: number): Promise<PlanLike> {
        let like = await this.prisma.planLikes.create({ data: { travelPlanId, likeUserId } })
        // console.log(like)
        return like;
    }

    async findAll(): Promise<PlanLike[]> {
        return await this.prisma.planLikes.findMany();
    }

    async findByPlanId(travelPlanId: number): Promise<PlanLike[]> {
        let result = await this.prisma.planLikes
            .findMany({ where: { travelPlanId } });

        return result;
    }

    async findOneByTravelPlanIdAndLikeUserId(travelPlanId: number, likeUserId: number) {

        let planLikes = await this.prisma.planLikes.findMany(
            {
                where: {
                    travelPlanId, likeUserId
                }
            })

        if (!planLikes) throw new NotFoundException('Like not found!')
        return planLikes;
    }

    async update(id: number, updatePlanLikeDto: UpdatePlanLikeDto) {
        let result = await this.prisma.planLikes.update({
            where: { id },
            data: updatePlanLikeDto
        })
        return result;
    }

    async remove(id: number) {
        let result = await this.prisma.planLikes.delete({ where: { id } })
        return result;
    }
}
