import { CanActivateChildFn } from '@angular/router';

export const professionalGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
