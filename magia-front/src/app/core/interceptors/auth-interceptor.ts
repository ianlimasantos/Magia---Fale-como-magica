import { HttpInterceptorFn } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  
  return from(
    Preferences.get({ key: 'token' })
  ).pipe(

    switchMap(({ value }) => {

      if (!value) {
        return next(req);
      }

      const reqWithAuth = req.clone({
        setHeaders: {
          Authorization: `Bearer ${value}`
        }
      });

      return next(reqWithAuth);
    })

  );
};
