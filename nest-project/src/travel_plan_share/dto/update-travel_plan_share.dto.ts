import { PartialType } from '@nestjs/swagger';
import { CreateTravelPlanShareDto } from './create-travel_plan_share.dto';

export class UpdateTravelPlanShareDto extends PartialType(CreateTravelPlanShareDto) {}
