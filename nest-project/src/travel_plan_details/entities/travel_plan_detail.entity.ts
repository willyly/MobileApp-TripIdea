import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";
import { Timestamp } from "typeorm";


export class TravelPlanDetail {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    travelPlanDayId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    countryId: number;

    @ApiProperty({ default: null })
    @IsInt()
    areaId: number;

    @ApiProperty({ default: null })
    @IsInt()
    cityId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    locationName: string;

    @ApiProperty()
    @IsString()
    locationImg: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    tel: string;

    // @ApiProperty()
    // @IsDate()
    // @IsNotEmpty()
    // startDay: Date;

    // @ApiProperty()
    // @IsDate()
    // @IsNotEmpty()
    // endDay: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endTime: string;

    @ApiProperty()
    @IsString()
    transportation: string;

    @ApiProperty()
    @IsString()
    notes: string;
}
