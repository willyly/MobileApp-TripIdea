import { PartialType } from '@nestjs/swagger';
import { CreateTravelPlanDetailDto } from './create-travel_plan_detail.dto';

export class UpdateTravelPlanDetailDto extends PartialType(CreateTravelPlanDetailDto) {}
