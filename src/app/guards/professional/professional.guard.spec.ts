import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { professionalGuard } from './professional.guard';

describe('professionalGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => professionalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
