import { PartialType } from '@nestjs/swagger';
import { CreateTransportationsDetailDto } from './create-transportations_detail.dto';

export class UpdateTransportationsDetailDto extends PartialType(CreateTransportationsDetailDto) {}
