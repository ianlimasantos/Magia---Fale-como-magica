import { Injectable } from '@nestjs/common';
import { CreateRequestActivityDto } from './dto/create-request-activity.dto';
import { UpdateRequestActivityDto } from './dto/update-request-activity.dto';

@Injectable()
export class RequestActivityService {
  create(createRequestActivityDto: CreateRequestActivityDto) {
    return 'This action adds a new requestActivity';
  }

  findAll() {
    return `This action returns all requestActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestActivity`;
  }

  update(id: number, updateRequestActivityDto: UpdateRequestActivityDto) {
    return `This action updates a #${id} requestActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestActivity`;
  }
}
