import { PartialType } from '@nestjs/mapped-types';
import { CreateUserActivityProgressDto } from './create-user_activity_progress.dto';

export class UpdateUserActivityProgressDto extends PartialType(CreateUserActivityProgressDto) {}
