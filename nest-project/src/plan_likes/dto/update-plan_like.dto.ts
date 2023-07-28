import { PartialType } from '@nestjs/swagger';
import { CreatePlanLikeDto } from './create-plan_like.dto';

export class UpdatePlanLikeDto extends PartialType(CreatePlanLikeDto) {}
