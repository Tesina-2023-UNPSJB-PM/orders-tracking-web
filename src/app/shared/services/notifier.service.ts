import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationDTO } from '../dtos/notification.dto';
declare var PubNub: any;
@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private readonly publishKey = 'pub-c-c11f9b2e-b194-40b6-946c-7e7083493bfc';
  private readonly subscribeKey = 'sub-c-e4db1460-c190-46a1-b9fd-70c31bd65a17';
  private readonly userId = 'OrdersTrackingWebNotifications';
  private error$: Subject<string> = new Subject<string>();
  private success$: Subject<string> = new Subject<string>();
  private warning$: Subject<string> = new Subject<string>();
  private info$: Subject<string> = new Subject<string>();
  private pubNubReference: any;
  constructor() {
    console.log('NotifierService');

    this.pubNubReference = new PubNub({
      publishKey: this.publishKey,
      subscribeKey: this.subscribeKey,
      userId: this.userId,
    });

    this.subscribeToChannel('web_notifications').subscribe();
  }

  get errorObs(): Observable<string> {
    return this.error$.asObservable();
  }

  get successObs(): Observable<string> {
    return this.success$.asObservable();
  }

  get warningObs(): Observable<string> {
    return this.warning$.asObservable();
  }

  get infoObs(): Observable<string> {
    return this.info$.asObservable();
  }

  pushError(message: string): void {
    this.error$.next(message);
  }

  pushSuccess(message: string): void {
    this.success$.next(message);
  }

  pushWarning(message: string): void {
    this.warning$.next(message);
  }

  pushInfo(message: string): void {
    this.info$.next(message);
  }

  private subscribeToChannel(channel: string): Observable<NotificationDTO> {
    this.pubNubReference.subscribe({ channels: [channel] });
    return new Observable((subscriber) => {
      const listener = {
        message: (messageEvent: any) => {
          if (!messageEvent) return;

        const { type, body, title } =
            messageEvent?.message.pn_gcm?.notification as NotificationDTO;
          const label = `${title}: ${body}`;

          switch (type) {
            case 'success':
              this.success$.next(label);
              break;
            case 'warning':
              this.warning$.next(label);
              break;
            case 'error':
              this.error$.next(label);
              break;
          }
        },
      };

      this.pubNubReference.addListener(listener);
    });
  }
}
