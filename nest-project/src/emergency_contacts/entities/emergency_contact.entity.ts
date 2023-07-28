import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class EmergencyContact {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    CountryId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tel: string;

    @ApiProperty()
    @IsString()
    address: string;
}
