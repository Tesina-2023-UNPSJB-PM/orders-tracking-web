import { Component, Input, OnInit } from '@angular/core';
import { ExecutionHistoryResponseDto } from 'src/app/dtos/executionHistoryResponse.dto';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ExecutionHistoryService } from '../../services/apis/execution-history.service';

@Component({
  selector: 'execution-order-history-detail',
  templateUrl: './execution-order-history-detail.component.html',
  styleUrls: []
})
export class ExecutionOrderHistoryDetailComponent implements OnInit{
  @Input() serviceOrder?: ServiceOrderItem;
  items: ExecutionHistoryResponseDto[] = [];
  loading: boolean = true;

  constructor(private readonly executionHistory: ExecutionHistoryService) {}

  ngOnInit(): void {
    const executionId = this.serviceOrder?.execution.id ?? 0;
    this.executionHistory.getHistoryByExecutionId(executionId)
      .subscribe ( data => {
        this.items = data;
        this.loading = false;
      } );
  }
}
