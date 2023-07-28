import { OmitType } from "@nestjs/swagger";
import { TravelPlanShare } from "../entities/travel_plan_share.entity";

export class CreateTravelPlanShareDto extends OmitType(TravelPlanShare, ['id'] as const) { }
