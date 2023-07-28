import { Injectable } from '@nestjs/common';
import { CreateFoulLanguageDto } from './dto/create-foul_language.dto';
import { UpdateFoulLanguageDto } from './dto/update-foul_language.dto';

@Injectable()
export class FoulLanguagesService {
  create(createFoulLanguageDto: CreateFoulLanguageDto) {
    return 'This action adds a new foulLanguage';
  }

  findAll() {
    return `This action returns all foulLanguages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foulLanguage`;
  }

  update(id: number, updateFoulLanguageDto: UpdateFoulLanguageDto) {
    return `This action updates a #${id} foulLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} foulLanguage`;
  }
}
