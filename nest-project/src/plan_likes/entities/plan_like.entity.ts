import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class PlanLike {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    likeUserId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    travelPlanId: number;
}
