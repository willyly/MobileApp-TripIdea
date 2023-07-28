import { Module } from '@nestjs/common';
import { TravelPlansService } from './travel_plans.service';
import { TravelPlansController } from './travel_plans.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from 'src/users/users.service';
import { TravelPlanShareService } from 'src/travel_plan_share/travel_plan_share.service';
import { TravelPlanDaysService } from 'src/travel_plan_days/travel_plan_days.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    MulterModule.register({
      limits: { fieldSize: 25 * 1024 * 1024 },
      storage: diskStorage({
        destination: './public/travelPlan_thumbnalis',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
        },
      }),
    }),
    JwtModule.register({
      secret: jwtConstants.secret, // use to encrypt the payload of login return object
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService, PrismaService, UsersService, TravelPlanShareService, TravelPlanDaysService, JwtStrategy]
})
export class TravelPlansModule { }
