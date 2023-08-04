import { Injectable } from '@angular/core';
import { OrdersTrackingService } from '../orders-tracking.service';
import { Observable } from 'rxjs';
import { EmployeeTrackingDTO } from '../../dtos/employee-tracking.dto';

declare var PubNub: any;
@Injectable()
export class OrdersTrackingPubnubService extends OrdersTrackingService {
  private readonly publishKey = 'pub-c-c11f9b2e-b194-40b6-946c-7e7083493bfc';
  private readonly subscribeKey = 'sub-c-e4db1460-c190-46a1-b9fd-70c31bd65a17';
  private readonly userId = 'OrdersTrackingWeb';

  private pubNubReference: any;
  constructor() {
    super();
    this.pubNubReference = new PubNub({
      publishKey: this.publishKey,
      subscribeKey: this.subscribeKey,
      userId: this.userId,
    });
  }

  override subscribeToChannel(
    channel: string
  ): Observable<EmployeeTrackingDTO> {
    this.pubNubReference.subscribe({ channels: [channel] });
    return new Observable((subscriber) => {
      const listener = {
        message: (messageEvent: any) => {
          if (!messageEvent) return;
          const message = messageEvent?.message as EmployeeTrackingDTO;
          console.log(
            '🚀 ~ file: orders-tracking-pubnub.service.ts:36 ~ OrdersTrackingPubnubService ~ returnnewObservable ~ messageEvent:',
            messageEvent
          );
          subscriber.next(message);
        },
      };

      this.pubNubReference.addListener(listener);
    });
  }
}
