import { Component, Input, OnInit } from '@angular/core';
import { ExecutionHistoryResponseDto } from 'src/app/dtos/executionHistoryResponse.dto';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ExecutionHistoryService } from '../../services/apis/execution-history.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'execution-order-history-detail',
  templateUrl: './execution-order-history-detail.component.html',
  styleUrls: []
})
export class ExecutionOrderHistoryDetailComponent implements OnInit{
  @Input() serviceOrder?: ServiceOrderItem;
  items: ExecutionHistoryResponseDto[] = [];
  loading: boolean = true;
  openModalShowAttachment = false;
  imageSource?: SafeResourceUrl;

  constructor(private readonly executionHistory: ExecutionHistoryService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const executionId = this.serviceOrder?.execution.id ?? 0;
    this.executionHistory.getHistoryByExecutionId(executionId)
      .subscribe ( data => {
        this.items = data;
        this.loading = false;
      } );
  }

  showModalAttachment(attachment: string) {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${attachment}`);
    this.openModalShowAttachment = true;
  }
}
