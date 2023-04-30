import { Observable } from 'rxjs';

export interface CommonApi<T> {
  get?(): Observable<T[]>;
  add?(item: T): Observable<void>;
}
