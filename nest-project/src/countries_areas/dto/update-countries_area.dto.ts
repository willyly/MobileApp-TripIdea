import { PartialType } from '@nestjs/swagger';
import { CreateCountriesAreaDto } from './create-countries_area.dto';

export class UpdateCountriesAreaDto extends PartialType(CreateCountriesAreaDto) {}
