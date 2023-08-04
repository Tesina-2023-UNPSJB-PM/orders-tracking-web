import { Observable } from "rxjs";
import { EmployeeTrackingDTO } from "../dtos/employee-tracking.dto";

export abstract class OrdersTrackingService {
    abstract subscribeToChannel(channelId: string): Observable<EmployeeTrackingDTO>;
}