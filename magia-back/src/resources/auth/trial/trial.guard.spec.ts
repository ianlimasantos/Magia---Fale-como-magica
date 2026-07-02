/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { TrialGuard } from './trial.guard';
import { ForbiddenException } from '@nestjs/common';

describe('TrialGuard', () => {
  let guard: TrialGuard;

  const userUsageService = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    guard = new TrialGuard(userUsageService as any);
  });

  function mockContext(user: any) {
    return {
      switchToHttp: () => ({
        getRequest: () => user,
      }),
    };
  }

  it('deve bloquear quando trial expirou', async () => {
    const context = mockContext({
      user: {
        id: '1',
        trialEndsAt: '2020-01-01',
      },
    });

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      'Período de teste expirado.',
    );
  });

  it('deve bloquear quando atingir limite diário', async () => {
    const userUsageService = {
      findOne: jest.fn().mockResolvedValue({
        requestsCount: 3,
      }),
      save: jest.fn(),
    };

    const guard = new TrialGuard(userUsageService as any);

    const context = mockContext({
      user: {
        id: '1',
        trialEndsAt: '2099-01-01',
      },
    });

    await expect(guard.canActivate(context as any)).rejects.toThrow(
      'Você atingiu o limite diário de 3 gerações.',
    );
  });

  it('deve permitir acesso e incrementar uso', async () => {
    const saveMock = jest.fn();

    const userUsageService = {
      findOne: jest.fn().mockResolvedValue({
        requestsCount: 1,
      }),
      save: saveMock,
    };

    const guard = new TrialGuard(userUsageService as any);

    const context = mockContext({
      user: {
        id: '1',
        trialEndsAt: '2099-01-01',
      },
    });

    const result = await guard.canActivate(context as any);

    expect(result).toBe(true);
    expect(saveMock).toHaveBeenCalled();
  });
});
