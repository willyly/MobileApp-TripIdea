import { Module } from '@nestjs/common';
import { TravelPlanDetailsService } from './travel_plan_details.service';
import { TravelPlanDetailsController } from './travel_plan_details.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from 'src/users/users.service';
import { TravelPlanDaysService } from 'src/travel_plan_days/travel_plan_days.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/travelPlanDetail_locationImgs',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
        },
      }),
    }),
  ],
  controllers: [TravelPlanDetailsController],
  providers: [TravelPlanDetailsService, PrismaService, UsersService, TravelPlanDaysService, JwtService]
})
export class TravelPlanDetailsModule { }
