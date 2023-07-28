import { OmitType } from "@nestjs/swagger";
import { TravelPlanDay } from "../entities/travel_plan_day.entity";

export class CreateTravelPlanDayDto extends OmitType(TravelPlanDay, ['id'] as const) { }
