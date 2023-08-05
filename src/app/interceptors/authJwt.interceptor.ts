import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, first, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/selectors/token.selector';
import { AppState } from '../store/state.model';

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken)
      .pipe(
        first(),
        mergeMap((token) => {
          const authReq = token ? request.clone({
              setHeaders: { Authorization: 'Bearer ' + token }
            }) : request;
          return next.handle(authReq);
        })
      );

  }
}
