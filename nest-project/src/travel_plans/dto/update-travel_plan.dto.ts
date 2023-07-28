import { PartialType } from '@nestjs/swagger';
import { CreateTravelPlanDto } from './create-travel_plan.dto';

export class UpdateTravelPlanDto extends PartialType(CreateTravelPlanDto) { }
