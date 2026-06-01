import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserUsageEntity } from 'src/resources/user-usage/entities/user-usage.entity';
import { UserUsageService } from 'src/resources/user-usage/user-usage.service';

@Injectable()
export class TrialGuard implements CanActivate {

  constructor(private readonly userUsageService: UserUsageService) {}

  async canActivate( context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const trialEndsAt = request.user.trialEndsAt;

    if (new Date() > new Date(trialEndsAt)) {
      throw new ForbiddenException("Período de teste expirado.");
    }

    const userUsage = await this.userUsageService.findOne(userId);

    if (userUsage && userUsage.requestsCount >= 3) {
      throw new ForbiddenException("Você atingiu o limite diário de 3 gerações.");
    }

    if (userUsage) {
      userUsage.requestsCount++;
      await this.userUsageService.save(userUsage);
      return true;
    }

    const newUserUsage = new UserUsageEntity();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    newUserUsage.userId = userId;
    newUserUsage.date = new Date().toISOString().split('T')[0]; 
    newUserUsage.requestsCount = 1;
    await this.userUsageService.save(newUserUsage);
    return true;
  }
}
