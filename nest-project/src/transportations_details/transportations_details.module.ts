import { Module } from '@nestjs/common';
import { TransportationsDetailsService } from './transportations_details.service';
import { TransportationsDetailsController } from './transportations_details.controller';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';

@Module({
  controllers: [TransportationsDetailsController],
  providers: [TransportationsDetailsService, PrismaService]
})
export class TransportationsDetailsModule { }
