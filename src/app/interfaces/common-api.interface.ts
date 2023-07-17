import { Observable } from 'rxjs';
import { PageDto } from '../shared/pagination/page.dto';
import { PageOptionsDto } from '../shared/pagination/page-options.dto';

export interface CommonApi<T> {
  getAll?(): Observable<T[]>;
  getPage?(pageOptionsDto: PageOptionsDto): Observable<PageDto<T>>;
  get?(): Observable<T>;
  add?(item: T): Observable<void>;
  save?(item: any): Observable<number>;
  delete?(item: T): Observable<void>;
}
