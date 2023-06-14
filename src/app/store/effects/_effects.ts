import { CustomerEffects } from './customer.effect';
import { EmployeeEffects } from './employee.effect';
import { ServiceOrderStateEffects } from './service-order-state.effect';
import { ServiceOrderTypeEffects } from './service-order-type.effect';

export const effects = [
  ServiceOrderStateEffects,
  ServiceOrderTypeEffects,
  CustomerEffects,
  EmployeeEffects
];
