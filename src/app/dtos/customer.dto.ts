import { AddressDTO } from "./service-order.dto";

export interface CustomerDTO {
  id?: number | null;
  customerNumber?: string | null;
  documentNumer?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phones?: string | null;
  address? : AddressDTO;
}
