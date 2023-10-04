import { MasterDataOrderStatusDTO } from "./master-data/master-data-order-status.dto";

export class CreateExecutionHistory {
  serviceOrderId: number = 0;
  executionId?: number;
  assignedEmployeeId?: number;
  status: MasterDataOrderStatusDTO = { code: 'UNASSIGNED', name: 'Sin asignar' };
  reasonId: number = 0;
  observations?: string;
  attachments?: string;
}
