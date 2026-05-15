import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityAttemptDto } from './create-activity_attempt.dto';

export class UpdateActivityAttemptDto extends PartialType(CreateActivityAttemptDto) {}
