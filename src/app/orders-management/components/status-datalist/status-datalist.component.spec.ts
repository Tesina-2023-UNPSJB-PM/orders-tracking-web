import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDatalistComponent } from './status-datalist.component';

describe('StatusFilterComponent', () => {
  let component: StatusDatalistComponent;
  let fixture: ComponentFixture<StatusDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusDatalistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
