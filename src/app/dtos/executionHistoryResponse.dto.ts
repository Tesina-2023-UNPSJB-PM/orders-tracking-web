import { MasterDataReasonStatusDTO } from "./master-data/master-data-reason-status.dto";
import { OrderExecutionDTO } from "./service-order.dto";

export interface ExecutionHistoryResponseDto {
  id?: number;
  execution: OrderExecutionDTO;
  status: string;
  reason: MasterDataReasonStatusDTO;
  observations: string;
  attachments: string;
  registrationDate: Date;
}
