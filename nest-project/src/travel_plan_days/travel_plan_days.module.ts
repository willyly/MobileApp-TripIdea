import { Module } from '@nestjs/common';
import { TravelPlanDaysService } from './travel_plan_days.service';
import { TravelPlanDaysController } from './travel_plan_days.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { TravelPlansService } from 'src/travel_plans/travel_plans.service';

@Module({
  controllers: [TravelPlanDaysController],
  providers: [TravelPlanDaysService, PrismaService, TravelPlansService]
})
export class TravelPlanDaysModule { }
