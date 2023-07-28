import { ApiProperty } from "@nestjs/swagger/dist";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class UserFollow {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    followerId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    followingId: number;
}

