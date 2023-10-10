export class CreateExecutionHistory {
  serviceOrderId: number = 0;
  executionId?: number;
  assignedEmployeeId?: number;
  status: string = '';
  reasonId: number = 0;
  observations?: string;
  attachments?: string;
}
