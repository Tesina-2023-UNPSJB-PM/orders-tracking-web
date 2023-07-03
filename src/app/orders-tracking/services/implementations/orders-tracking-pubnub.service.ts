import { Injectable } from '@angular/core';
import { OrdersTrackingService } from '../orders-tracking.service';
import { Observable } from 'rxjs';

declare var PubNub: any;
@Injectable()
export class OrdersTrackingPubnubService extends OrdersTrackingService {
  private readonly publishKey = 'pub-c-c11f9b2e-b194-40b6-946c-7e7083493bfc';

  private readonly subscribeKey = 'sub-c-e4db1460-c190-46a1-b9fd-70c31bd65a17';
  private pubNubReference: any;
  constructor() {
    super();
    this.pubNubReference = new PubNub({
      publishKey: this.publishKey,
      subscribeKey: this.subscribeKey,
      userId: 'myUniqueUserId',
    });
  }

  override subscribeToChannel(channel: string) {
    console.log(
      '🚀 ~ file: orders-tracking-pubnub.service.ts:13 ~ OrdersTrackingPubnubService ~ overridesubscribe ~ channelId:',
      channel
    );
    // this.recieveLocation();
    this.pubNubReference.subscribe({ channels: [channel] });
    return new Observable((subscriber) => {
      const listener = {
        status: (statusEvent: any) => {
          if (statusEvent.category === 'PNConnectedCategory') {
            console.log('Connected');
          }
        },
        message: (messageEvent: any) => {
          console.log("🚀 ~ file: orders-tracking-pubnub.service.ts:36 ~ OrdersTrackingPubnubService ~ returnnewObservable ~ messageEvent:", messageEvent)
          subscriber.next(messageEvent?.message);
        },
      };

      this.pubNubReference.addListener(listener);
    });
  }

  recieveLocation() {
    // paste below "add listener" comment
    const listener = {
      status: (statusEvent: any) => {
        if (statusEvent.category === 'PNConnectedCategory') {
          console.log('Connected');
        }
      },
      message: (messageEvent: any) => {
        console.log('🚀 [Message Received]', messageEvent);
      },
    };
    this.pubNubReference.addListener(listener);
  }
}
