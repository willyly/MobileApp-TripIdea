import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransportationsDetailsService } from './transportations_details.service';
import { CreateTransportationsDetailDto } from './dto/create-transportations_detail.dto';
import { UpdateTransportationsDetailDto } from './dto/update-transportations_detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransportationsDetail } from './entities/transportations_detail.entity';

@ApiTags('transportations-details')
@Controller('transportations-details')
export class TransportationsDetailsController {
  constructor(private readonly transportationsDetailsService: TransportationsDetailsService) { }

  @Post()
  async create(@Body() createTransportationsDetailDto: CreateTransportationsDetailDto) {
    return await this.transportationsDetailsService.create(createTransportationsDetailDto);
  }

  @Get()
  async findAll(): Promise<TransportationsDetail[]> {
    return await this.transportationsDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transportationsDetailsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateTransportationsDetailDto: UpdateTransportationsDetailDto) {
    return await this.transportationsDetailsService.update(+id, updateTransportationsDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.transportationsDetailsService.remove(+id);
  }
}
