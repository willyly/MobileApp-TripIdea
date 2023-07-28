import { OmitType } from "@nestjs/swagger";
import { TransportationsDetail } from "../entities/transportations_detail.entity";

export class CreateTransportationsDetailDto extends OmitType(TransportationsDetail, ['id'] as const) { }
