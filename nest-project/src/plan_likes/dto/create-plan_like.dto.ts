import { OmitType } from "@nestjs/swagger";
import { PlanLike } from "../entities/plan_like.entity";

export class CreatePlanLikeDto extends OmitType(PlanLike, ['id', 'likeUserId'] as const) { }
