import { PartialType } from '@nestjs/swagger';
import { CreateFoulLanguageDto } from './create-foul_language.dto';

export class UpdateFoulLanguageDto extends PartialType(CreateFoulLanguageDto) {}
