import { CanActivateChildFn } from '@angular/router';

export const auxAdminGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
