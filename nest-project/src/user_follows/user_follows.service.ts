import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserFollowDto } from './dto/create-user_follow.dto';
import { UpdateUserFollowDto } from './dto/update-user_follow.dto';
import { UserFollow } from './entities/user_follow.entity';

@Injectable()
export class UserFollowsService {
  constructor(
    private prisma: PrismaService,
    // private readonly jwtService: JwtService,
  ) { }

  async create(createUserFollowDto: CreateUserFollowDto): Promise<UserFollow> {

    // follower同following user不可是同一人
    if (createUserFollowDto.followerId === createUserFollowDto.followingId)
      throw new NotAcceptableException(
        `Cannot insert userFollow! 
      followerId: ${createUserFollowDto.followerId}, 
      followingId: ${createUserFollowDto.followingId}
      `)

    let userFollow = await this.prisma.userFollow.create({
      data: { ...createUserFollowDto },
      include: {
        follower: {
          include: {
            followers: true,
            followings: true,
            createPlans: true,
            likePlans: true
          }
        },
        following: {
          include: {
            followers: true,
            followings: true,
            createPlans: true,
            likePlans: true
          }
        },
      }
    });

    // 如insert失敗，可能是已存在重疊follow關係, e.g. 1 -> 3, 1 -> 3
    if (!userFollow)
      throw new NotAcceptableException(
        `Cannot insert userFollow! 
      followerId: ${createUserFollowDto.followerId}, 
      followingId: ${createUserFollowDto.followingId}
      `)
    console.log('userFollow: ', userFollow);
    // let user = await this.prisma.user.findFirst({
    //   where: {
    //     id: userFollow.followerId
    //   }
    // })

    return userFollow;
  }


  findAll() {
    return `This action returns all userFollows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFollow`;
  }

  update(id: number, updateUserFollowDto: UpdateUserFollowDto) {
    return `This action updates a #${id} userFollow`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFollow`;
  }
}
