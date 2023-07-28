import { Module } from '@nestjs/common';
import { UserFollowsService } from './user_follows.service';
import { UserFollowsController } from './user_follows.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [UserFollowsController],
  providers: [UserFollowsService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // use to encrypt the payload of login return object
      signOptions: { expiresIn: '7d' },
    })
  ],
})
export class UserFollowsModule { }
