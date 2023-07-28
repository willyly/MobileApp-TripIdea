import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CountriesArea {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    engName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chName: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    countryId: number;
}
