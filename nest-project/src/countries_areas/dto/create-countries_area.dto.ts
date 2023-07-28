import { OmitType } from "@nestjs/swagger";
import { CountriesArea } from "../entities/countries_area.entity";

export class CreateCountriesAreaDto extends OmitType(CountriesArea, ['id'] as const) { }
