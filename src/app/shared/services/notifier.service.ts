import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private error$: Subject<string> = new Subject<string>();
  private success$: Subject<string> = new Subject<string>();
  private warning$: Subject<string> = new Subject<string>();
  private info$: Subject<string> = new Subject<string>();

  get errorObs(): Observable<string> {
    return this.error$.asObservable();
  }

  get successObs(): Observable<string> {
    return this.success$.asObservable();
  }

  get warningObs(): Observable<string> {
    return this.warning$.asObservable();
  }

  get infoObs(): Observable<string> {
    return this.info$.asObservable();
  }

  pushError(message: string): void {
    this.error$.next(message);
  }

  pushSuccess(message: string): void {
    this.success$.next(message);
  }

  pushWarning(message: string): void {
    this.warning$.next(message);
  }

  pushInfo(message: string): void {
    this.info$.next(message);
  }
}
