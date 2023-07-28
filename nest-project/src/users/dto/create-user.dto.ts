import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends OmitType(User, ["id"] as const) {

}
