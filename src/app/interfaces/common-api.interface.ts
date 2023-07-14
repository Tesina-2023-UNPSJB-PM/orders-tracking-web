import { Observable } from 'rxjs';

export interface CommonApi<T> {
  getAll?(): Observable<T[]>;
  get?(): Observable<T>;
  add?(item: T): Observable<void>;
  save?(item: any): Observable<number>;
  delete?(item: T): Observable<void>;
}
