import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class TransportationsDetail {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    img: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}
