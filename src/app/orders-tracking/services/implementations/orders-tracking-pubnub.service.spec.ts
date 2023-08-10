import { TestBed } from '@angular/core/testing';

import { OrdersTrackingPubnubService } from './orders-tracking-pubnub.service';

describe('OrdersTrackingPubnubService', () => {
  let service: OrdersTrackingPubnubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersTrackingPubnubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
