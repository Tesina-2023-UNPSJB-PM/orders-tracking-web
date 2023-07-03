import { Observable } from "rxjs";

export abstract class OrdersTrackingService {
    abstract subscribeToChannel(channelId: string): Observable<any>;
}