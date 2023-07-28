import { OmitType } from "@nestjs/swagger";
import { FoulLanguage } from "../entities/foul_language.entity";

export class CreateFoulLanguageDto extends OmitType(FoulLanguage, ['id'] as const) { }
