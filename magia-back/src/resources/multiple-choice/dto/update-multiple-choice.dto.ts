import { PartialType } from '@nestjs/mapped-types';
import { CreateMultipleChoiceDto } from './create-multiple-choice.dto';

export class UpdateMultipleChoiceDto extends PartialType(CreateMultipleChoiceDto) {}
