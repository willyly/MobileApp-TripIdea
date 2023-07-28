import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TravelPlanDaysService } from './travel_plan_days.service';
import { CreateTravelPlanDayDto } from './dto/create-travel_plan_day.dto';
import { UpdateTravelPlanDayDto } from './dto/update-travel_plan_day.dto';
import { ApiTags } from '@nestjs/swagger';
import { TravelPlanDay } from './entities/travel_plan_day.entity';

@ApiTags('travel-plan-days')
@Controller('travel-plan-days')
export class TravelPlanDaysController {
  constructor(private readonly travelPlanDaysService: TravelPlanDaysService) { }

  @Post()
  async create(@Body() createTravelPlanDayDto: CreateTravelPlanDayDto) {
    return await this.travelPlanDaysService.create(createTravelPlanDayDto);
  }

  @Get()
  async findAll(): Promise<TravelPlanDay[]> {
    return await this.travelPlanDaysService.findAll();
  }

  // @Get('/getTotalDay/:id')
  // async findPlanDay(@Param('id') id: string) {
  //   return await this.travelPlanDaysService.getTotalDay(+id);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelPlanDaysService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateTravelPlanDayDto: UpdateTravelPlanDayDto) {
    return await this.travelPlanDaysService.update(+id, updateTravelPlanDayDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.travelPlanDaysService.remove(+id);
  }
}
