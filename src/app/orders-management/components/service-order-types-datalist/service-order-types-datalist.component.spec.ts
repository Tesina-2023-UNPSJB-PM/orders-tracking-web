import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderTypesDatalistComponent } from './service-order-types-datalist.component';

describe('ServiceOrderTypesDatalistComponent', () => {
  let component: ServiceOrderTypesDatalistComponent;
  let fixture: ComponentFixture<ServiceOrderTypesDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceOrderTypesDatalistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderTypesDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
