import { OmitType } from "@nestjs/swagger";
import { CountriesCity } from "../entities/countries_city.entity";

export class CreateCountriesCityDto extends OmitType(CountriesCity, ['id'] as const) { }
