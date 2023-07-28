import { PartialType } from '@nestjs/swagger';
import { CreateTravelPlanDayDto } from './create-travel_plan_day.dto';

export class UpdateTravelPlanDayDto extends PartialType(CreateTravelPlanDayDto) {}
