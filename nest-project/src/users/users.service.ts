import { Request, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    // private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let users = await this.prisma.user.create({ data: { ...createUserDto } })
    console.log(users)
    return users;
  }

  async findOne(id: number): Promise<User> {
    let foundUser = await this.prisma.user.findFirst({
      where: { id },
      include: {
        followers: true,
        followings: true,
        createPlans: true,
        likePlans: true,
        travelPlanShare: true,
      }
    })

    if (!foundUser) throw new NotFoundException('User not found!')
    return foundUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    let foundUser = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })

    // console.log('UsersService findOneByEmail foundUser: ', foundUser);

    if (!foundUser) throw new NotFoundException('User not found!')

    return foundUser;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        followers: true,
        followings: true,
        createPlans: true,
        likePlans: true,
        travelPlanShare: true,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let result = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.user.delete({ where: { id } })
    return result;
  }
}
