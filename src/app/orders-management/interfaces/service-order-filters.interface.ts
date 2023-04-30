import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { ReviewerDTO } from 'src/app/dtos/reviewer.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';

export interface ServiceOrderFilters {
  reviewer?: ReviewerDTO;
  customer?: CustomerDTO;
  state?: ServiceOrderStateDTO;
  creationDate?: Date;
}
