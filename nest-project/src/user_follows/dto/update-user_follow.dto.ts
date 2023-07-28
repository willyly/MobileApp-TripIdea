import { PartialType } from '@nestjs/swagger';
import { CreateUserFollowDto } from './create-user_follow.dto';

export class UpdateUserFollowDto extends PartialType(CreateUserFollowDto) {}
