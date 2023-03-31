import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListComponent } from './orders-list.component';
import { provideHttpClient } from '@angular/common/http';
import { ClarityModule, ClrDatagrid } from '@clr/angular';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersListComponent ],
      imports: [ClarityModule],
      providers: [provideHttpClient(), ClrDatagrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
