import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDatalistComponent } from './customer-datalist.component';

describe('CustomerFilterComponent', () => {
  let component: CustomerDatalistComponent;
  let fixture: ComponentFixture<CustomerDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDatalistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
