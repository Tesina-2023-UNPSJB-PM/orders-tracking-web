import { TestBed } from '@angular/core/testing';

import { ServiceOrderApiService } from './service-order.api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ServiceOrderApiService', () => {
  let service: ServiceOrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ServiceOrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
