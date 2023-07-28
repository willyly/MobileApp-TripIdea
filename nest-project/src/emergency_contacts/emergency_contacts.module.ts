import { Module } from '@nestjs/common';
import { EmergencyContactsService } from './emergency_contacts.service';
import { EmergencyContactsController } from './emergency_contacts.controller';

@Module({
  controllers: [EmergencyContactsController],
  providers: [EmergencyContactsService]
})
export class EmergencyContactsModule {}
