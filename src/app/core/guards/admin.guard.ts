import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


//Debe de retornar un boolean o una redirección
export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  return inject(Store).select(selectIsAdmin).pipe(
    map((isAdmin) => {
      if(!isAdmin) { 
        console.log(adminGuard.name, 'Redirigiendo al inicio')
        return router.createUrlTree(['/dashboard/home'])
      }
      return true;
    })
  )
};
