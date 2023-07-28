import { Module } from '@nestjs/common';
import { PlanLikesService } from './plan_likes.service';
import { PlanLikesController } from './plan_likes.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // use to encrypt the payload of login return object
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [PlanLikesController],
  providers: [PlanLikesService, PrismaService, JwtStrategy]
})
export class PlanLikesModule { }
