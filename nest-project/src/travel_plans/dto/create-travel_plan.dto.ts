import { OmitType } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
import { ValidationOptions, registerDecorator } from 'class-validator';
import { TravelPlan } from "../entities/travel_plan.entity";

export class CreateTravelPlanDto extends OmitType(TravelPlan, ['id', 'thumbnail'] as const) {
}