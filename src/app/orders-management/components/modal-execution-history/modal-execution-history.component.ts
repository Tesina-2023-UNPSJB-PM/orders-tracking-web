import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ExecutionHistoryService } from '../../services/apis/execution-history.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataReasonStatusDTO } from 'src/app/dtos/master-data/master-data-reason-status.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';

export type EXECUTION_HISTORY_OPERATIONS = 'assign' | 'cancel';

@Component({
  selector: 'modal-execution-history',
  templateUrl: './modal-execution-history.component.html',
  styleUrls: []
})
export class ModalExecutionHistoryComponent implements OnInit{
  @Input() openModal = false;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Input() serviceOrder?: ServiceOrderItem;
  @Input() operation?: EXECUTION_HISTORY_OPERATIONS = 'assign';

  disabledStatusInput = true;
  title = '';

  form: FormGroup<{
    status: FormControl<MasterDataOrderStatusDTO | null>;
    employee: FormControl<MasterDataEmployeeDTO | null>;
    reason: FormControl<MasterDataReasonStatusDTO | null>;
    observations: FormControl<string | null>;
  }>;

  constructor(private service: ExecutionHistoryService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      status: new FormControl<MasterDataOrderStatusDTO | null>({ value: null, disabled: true }),
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      reason: new FormControl<MasterDataReasonStatusDTO | null>(null),
      observations: new FormControl<string | null>(null),
    });
  }

  ngOnInit(): void {
    console.log(`Modal History ... ${this.operation}`);

    switch(this.operation) {
      case 'assign': {
        this.title = 'Asignar Orden';
        this.form.get('status')?.setValue({ code: 'PENDING', name: 'Pendiente' });
        break;
      }
      case 'cancel': {
        this.title = 'Cancelar Orden';
        this.form.get('status')?.setValue({ code: 'CANCELED', name: 'Cancelado' });
      }
    }
  }

  createExecutionHistory(): void {}

  close(): void {
    this.openModal = false;
    this.openModalChange.emit(false);
  }
}
