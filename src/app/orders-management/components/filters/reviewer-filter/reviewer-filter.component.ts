import {
  Component,
  OnInit,
  forwardRef
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { ReplaySubject, map, takeUntil, tap } from 'rxjs'
import { ReviewerDTO } from 'src/app/dtos/reviewer.dto'
import { ReviewerApiService } from 'src/app/orders-management/services/apis/reviewer.api.service'
import { DatalistComponent } from 'src/app/shared/components/datalist/datalist.component'
import { DatalistItem } from 'src/app/shared/components/datalist/datalist.interfaces'

@Component({
  selector: 'app-reviewer-filter',
  template: '<shd-datalist [label]="label"  [placeholder]="placeholder" [items]="datalistItems" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./reviewer-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReviewerFilterComponent),
      multi: true,
    },
  ],
})
export class ReviewerFilterComponent extends DatalistComponent<ReviewerDTO>
  implements OnInit {
  
  
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject()
  private _reviewers: ReviewerDTO[] = []
  protected datalistItems: DatalistItem[] = []

  constructor(private readonly _reviewerApiSrv: ReviewerApiService) {
    super()
  }

  ngOnInit(): void {
    this._reviewerApiSrv
      .get()
      .pipe(
        takeUntil(this._destroy), 
        tap((reviewers: ReviewerDTO[]) => (this._reviewers = reviewers)),
        map((reviewers: ReviewerDTO[]) => reviewers.map((reviewer: ReviewerDTO) => ({
          id: `${reviewer.userId}`,
          value: `${reviewer.firstName} ${reviewer.lastName}`,
        } as DatalistItem)))
      )
      .subscribe({
        next: (datalistItems: DatalistItem[]) => (this.datalistItems = datalistItems),
        error: (error) => console.error(error),
      })
  }

  protected override getEntityValue(dataListItem: DatalistItem): ReviewerDTO | undefined{
    return this._reviewers.find((reviewer: ReviewerDTO) => reviewer.userId == +dataListItem.id)
  }
}
