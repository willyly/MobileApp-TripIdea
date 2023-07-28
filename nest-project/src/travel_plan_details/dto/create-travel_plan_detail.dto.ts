import { OmitType } from "@nestjs/swagger";
import { TravelPlanDetail } from "../entities/travel_plan_detail.entity";

export class CreateTravelPlanDetailDto extends OmitType(TravelPlanDetail, ['id'] as const) { }
