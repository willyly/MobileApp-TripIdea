import { Module } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { TransportationsController } from './transportations.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';


@Module({
  controllers: [TransportationsController],
  providers: [TransportationsService, PrismaService]
})
export class TransportationsModule { }
