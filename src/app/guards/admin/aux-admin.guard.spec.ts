import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { auxAdminGuard } from './aux-admin.guard';

describe('auxAdminGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auxAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
