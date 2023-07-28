import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransportationsDetailDto } from './dto/create-transportations_detail.dto';
import { UpdateTransportationsDetailDto } from './dto/update-transportations_detail.dto';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { TransportationsDetail } from './entities/transportations_detail.entity';

@Injectable()
export class TransportationsDetailsService {
  constructor(private prisma: PrismaService) { }

  async create(createTransportationsDetailDto: CreateTransportationsDetailDto): Promise<TransportationsDetail> {
    let transportationsDetail = await this.prisma.transportationsDetail.create({ data: { ...createTransportationsDetailDto } })
    console.log(transportationsDetail)
    return transportationsDetail;
  }

  async findAll(): Promise<TransportationsDetail[]> {
    return await this.prisma.transportationsDetail.findMany();
  }

  async findOne(id: number) {
    let foundTransportationsDetail = await this.prisma.transportationsDetail.findFirst({ where: { id } })

    if (!foundTransportationsDetail) throw new NotFoundException('TransportationsDetail not found!')
    return foundTransportationsDetail;
  }

  async update(id: number, updateTransportationsDetailDto: UpdateTransportationsDetailDto) {
    let result = await this.prisma.transportationsDetail.update({
      where: { id },
      data: updateTransportationsDetailDto
    })
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.transportationsDetail.delete({ where: { id } })
    return result;
  }
}
