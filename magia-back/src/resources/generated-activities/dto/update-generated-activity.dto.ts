import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneratedActivityDto } from './create-generated-activity.dto';

export class UpdateGeneratedActivityDto extends PartialType(CreateGeneratedActivityDto) {}
