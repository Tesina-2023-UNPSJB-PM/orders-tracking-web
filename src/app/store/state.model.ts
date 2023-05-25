import { ServiceOrderStateDTO } from '../dtos/service-order-state.dto';
import { ServiceOrderTypeDTO } from '../dtos/service-order-type.dto';

export interface AppState {
  readonly serviceOrderStates: ServiceOrderStateDTO[];
  readonly serviceOrderTypes: ServiceOrderTypeDTO[];
}
