import { PartialType } from '@nestjs/swagger';
import { CreateCountriesCityDto } from './create-countries_city.dto';

export class UpdateCountriesCityDto extends PartialType(CreateCountriesCityDto) {}
