import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { UserFollowsService } from './user_follows.service';
import { CreateUserFollowDto } from './dto/create-user_follow.dto';
import { UpdateUserFollowDto } from './dto/update-user_follow.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { UserFollow } from './entities/user_follow.entity';
import { jwtConstants } from 'src/auth/constants';

@ApiTags('user-follows')
@Controller('user-follows')
export class UserFollowsController {
  constructor(
    private readonly userFollowsService: UserFollowsService,
    private jwtService: JwtService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createUserFollowDto: CreateUserFollowDto, @Headers("authorization") authHeader: string): Promise<UserFollow> {
    let access_token = authHeader.replace("Bearer ", "");

    let userObject = await this.jwtService.verifyAsync(access_token, {
      secret: jwtConstants.secret
    });

    createUserFollowDto.followerId = userObject.id;

    return this.userFollowsService.create(createUserFollowDto);
  }

  @Get()
  findAll() {
    return this.userFollowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFollowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFollowDto: UpdateUserFollowDto) {
    return this.userFollowsService.update(+id, updateUserFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFollowsService.remove(+id);
  }
}
