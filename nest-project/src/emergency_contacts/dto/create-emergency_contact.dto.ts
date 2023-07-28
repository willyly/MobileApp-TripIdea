import { OmitType } from "@nestjs/swagger";
import { EmergencyContact } from "../entities/emergency_contact.entity";

export class CreateEmergencyContactDto extends OmitType(EmergencyContact, ['id'] as const) { }
