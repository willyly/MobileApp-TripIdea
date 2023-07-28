import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoulLanguagesService } from './foul_languages.service';
import { CreateFoulLanguageDto } from './dto/create-foul_language.dto';
import { UpdateFoulLanguageDto } from './dto/update-foul_language.dto';

@Controller('foul-languages')
export class FoulLanguagesController {
  constructor(private readonly foulLanguagesService: FoulLanguagesService) {}

  @Post()
  create(@Body() createFoulLanguageDto: CreateFoulLanguageDto) {
    return this.foulLanguagesService.create(createFoulLanguageDto);
  }

  @Get()
  findAll() {
    return this.foulLanguagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foulLanguagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoulLanguageDto: UpdateFoulLanguageDto) {
    return this.foulLanguagesService.update(+id, updateFoulLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foulLanguagesService.remove(+id);
  }
}
