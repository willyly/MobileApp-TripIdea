import { OmitType } from "@nestjs/swagger";
import { UserFollow } from "../entities/user_follow.entity";

export class CreateUserFollowDto extends OmitType(UserFollow, ["id", "followerId"] as const) {
    followerId: number;
}

