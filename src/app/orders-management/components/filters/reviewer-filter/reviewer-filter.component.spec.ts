import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerFilterComponent } from './reviewer-filter.component';

describe('ReviewerFilterComponent', () => {
  let component: ReviewerFilterComponent;
  let fixture: ComponentFixture<ReviewerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewerFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
