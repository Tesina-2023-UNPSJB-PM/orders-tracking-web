import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDatalistComponent } from './employee-datalist.component';

describe('EmployeeFilterComponent', () => {
  let component: EmployeeDatalistComponent;
  let fixture: ComponentFixture<EmployeeDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDatalistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
