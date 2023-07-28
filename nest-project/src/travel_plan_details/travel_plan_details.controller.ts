import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, NotFoundException, Query } from '@nestjs/common';
import { TravelPlanDetailsService } from './travel_plan_details.service';
import { CreateTravelPlanDetailDto } from './dto/create-travel_plan_detail.dto';
import { UpdateTravelPlanDetailDto } from './dto/update-travel_plan_detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { TravelPlanDetail } from './entities/travel_plan_detail.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
];

let defaultLocationImgFile = 'default_locationImg.jpeg';

@ApiTags('travel-plan-details')
@Controller('travel-plan-details')
export class TravelPlanDetailsController {
  constructor(private readonly travelPlanDetailsService: TravelPlanDetailsService) { }

  @Post(':id')
  @UseInterceptors(FileInterceptor('locationImgFile'))
  async create(
    @Param('id', ParseIntPipe) id: string,
    @Body() createTravelPlanDetailDto: CreateTravelPlanDetailDto,
    @UploadedFile() locationImgFile,
  ) {
    const data: any = {};

    for (let key in createTravelPlanDetailDto) {
      if (key == "locationImgFile") continue;
      data[key] = createTravelPlanDetailDto[key];
      // console.log('detail key', key)
    }

    if (locationImgFile == null) {
      data.locationImg = defaultLocationImgFile;
    } else {
      data.locationImg = locationImgFile.path
    }

    if (locationImgFile && (!locationImgFile?.mimetype || !allowedMimeTypes.includes(locationImgFile.mimetype.toLowerCase()))) {
      fs.unlinkSync(locationImgFile.path)
      throw new NotFoundException("Invalid image type")
    }

    switch (true) {
      case !data.areaId && !data.cityId:
        console.log('no for both');

        data.areaId = null;
        data.cityId = null;
        break;
      case data.areaId && !data.cityId:
        console.log('no city');

        data.areaId = parseInt(`${createTravelPlanDetailDto.areaId}`);
        data.cityId = null;
        break;

      default:
        console.log('have both');

        console.log({ createTravelPlanDetailDto });

        data.areaId = parseInt(`${createTravelPlanDetailDto.areaId}`);

        if (createTravelPlanDetailDto.cityId !== null) {
          console.log('dooooooooooooooo');

          data.cityId = parseInt(`${createTravelPlanDetailDto.cityId}`);
        }
        break;
    }

    data.travelPlanDayId = +id;
    data.countryId = parseInt(`${createTravelPlanDetailDto.countryId}`);

    console.log('whyyyy', data);

    return await this.travelPlanDetailsService.create(+id, data);
  }

  @Get()
  async findAll(): Promise<TravelPlanDetail[]> {
    return await this.travelPlanDetailsService.findAll();
  }

  @Get('/getDayDetail/:id')
  async getTotalDay(@Param('id') id: string, @Query('whichDay') whichDay: string) {
    return await this.travelPlanDetailsService.getTotalDay(+id, +whichDay);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelPlanDetailsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('locationImgFile'))
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTravelPlanDetailDto: UpdateTravelPlanDetailDto,
    @UploadedFile() locationImgFile,
  ) {
    let originalPlanDetails = await this.travelPlanDetailsService.findOne(+id);
    let originalCountryId = originalPlanDetails.countryId;

    const data: any = {};

    for (let key in updateTravelPlanDetailDto) {
      if (key == "locationImgFile") continue;
      data[key] = updateTravelPlanDetailDto[key];
    }

    if (originalCountryId !== data.countryId) {

      if (locationImgFile == null) {
        data.locationImg = defaultLocationImgFile;
      } else {
        data.locationImg = locationImgFile.path
      }

      if (locationImgFile && (!locationImgFile?.mimetype || !allowedMimeTypes.includes(locationImgFile.mimetype.toLowerCase()))) {
        fs.unlinkSync(locationImgFile.path)
        throw new NotFoundException("Invalid image type")
      }

      switch (true) {
        case !data.areaId && !data.cityId:
          data.areaId = null;
          data.cityId = null;
          break;
        case data.areaId && !data.cityId:
          data.areaId = parseInt(`${updateTravelPlanDetailDto.areaId}`);
          data.cityId = null;
          break;
        default:
          data.areaId = parseInt(`${updateTravelPlanDetailDto.areaId}`);
          data.cityId = parseInt(`${updateTravelPlanDetailDto.cityId}`);
      }

      data.travelPlanDayId = parseInt(`${updateTravelPlanDetailDto.travelPlanDayId}`);
      data.countryId = parseInt(`${updateTravelPlanDetailDto.countryId}`);
      // data.startDay = new Date(`${updateTravelPlanDetailDto.startTime}`);
      // data.endDay = new Date(`${updateTravelPlanDetailDto.endTime}`);

      return await this.travelPlanDetailsService.update(+id, data);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.travelPlanDetailsService.remove(+id);
  }
}
