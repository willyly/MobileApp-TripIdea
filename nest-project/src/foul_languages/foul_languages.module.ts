import { Module } from '@nestjs/common';
import { FoulLanguagesService } from './foul_languages.service';
import { FoulLanguagesController } from './foul_languages.controller';

@Module({
  controllers: [FoulLanguagesController],
  providers: [FoulLanguagesService]
})
export class FoulLanguagesModule {}
