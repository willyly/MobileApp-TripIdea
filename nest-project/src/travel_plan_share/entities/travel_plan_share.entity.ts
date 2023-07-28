import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class TravelPlanShare {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    travelPlanId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    shareUserId: number;
}
