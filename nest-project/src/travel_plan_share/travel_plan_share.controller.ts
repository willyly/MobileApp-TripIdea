import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TravelPlanShareService } from './travel_plan_share.service';
import { CreateTravelPlanShareDto } from './dto/create-travel_plan_share.dto';
import { UpdateTravelPlanShareDto } from './dto/update-travel_plan_share.dto';
import { ApiTags } from '@nestjs/swagger';
import { TravelPlanShare } from './entities/travel_plan_share.entity';

@ApiTags('travel-plan-share')
@Controller('travel-plan-share')
export class TravelPlanShareController {
  constructor(private readonly travelPlanShareService: TravelPlanShareService) { }

  @Post()
  async create(@Body() createTravelPlanShareDto: CreateTravelPlanShareDto) {
    return await this.travelPlanShareService.create(createTravelPlanShareDto);
  }

  @Get()
  async findAll(): Promise<TravelPlanShare[]> {
    return await this.travelPlanShareService.findAll();
  }

  @Get('/sharePlan/:id')
  async findShare(@Param('id') id: string, @Query('name') name: string): Promise<any> {
    return await this.travelPlanShareService.findShare(+id, name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelPlanShareService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateTravelPlanShareDto: UpdateTravelPlanShareDto) {
    return await this.travelPlanShareService.update(+id, updateTravelPlanShareDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.travelPlanShareService.remove(+id);
  }
}
