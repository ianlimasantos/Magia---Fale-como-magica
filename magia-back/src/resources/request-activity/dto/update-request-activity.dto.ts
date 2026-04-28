import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestActivityDto } from './create-request-activity.dto';

export class UpdateRequestActivityDto extends PartialType(CreateRequestActivityDto) {}
