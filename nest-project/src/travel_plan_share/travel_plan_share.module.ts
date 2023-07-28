import { Module } from '@nestjs/common';
import { TravelPlanShareService } from './travel_plan_share.service';
import { TravelPlanShareController } from './travel_plan_share.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { UsersService } from 'src/users/users.service';
import { TravelPlansService } from 'src/travel_plans/travel_plans.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TravelPlanShareController],
  providers: [TravelPlanShareService, PrismaService, UsersService, TravelPlansService, JwtService]
})
export class TravelPlanShareModule { }
