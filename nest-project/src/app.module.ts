import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserFollowsModule } from './user_follows/user_follows.module';
import { CountriesModule } from './countries/countries.module';
import { CountriesAreasModule } from './countries_areas/countries_areas.module';
import { CountriesCitiesModule } from './countries_cities/countries_cities.module';
import { FoulLanguagesModule } from './foul_languages/foul_languages.module';
import { TravelPlansModule } from './travel_plans/travel_plans.module';
import { TravelPlanDetailsModule } from './travel_plan_details/travel_plan_details.module';
import { PlanLikesModule } from './plan_likes/plan_likes.module';
import { EmergencyContactsModule } from './emergency_contacts/emergency_contacts.module';
import { TransportationsModule } from './transportations/transportations.module';
import { TransportationsDetailsModule } from './transportations_details/transportations_details.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthModule } from './auth/auth.module';
import { TravelPlanDaysModule } from './travel_plan_days/travel_plan_days.module';
import { TravelPlanShareModule } from './travel_plan_share/travel_plan_share.module';

@Module({
  imports: [UsersModule,
    PrismaModule.forRoot(),
    UserFollowsModule,
    CountriesModule,
    CountriesAreasModule,
    CountriesCitiesModule,
    FoulLanguagesModule,
    TravelPlansModule,
    TravelPlanDetailsModule,
    PlanLikesModule,
    EmergencyContactsModule,
    TransportationsModule,
    TransportationsDetailsModule,
    AuthModule,
    TravelPlanDaysModule,
    TravelPlanShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

