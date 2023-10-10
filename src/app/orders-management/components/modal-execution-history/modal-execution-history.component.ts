import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ExecutionHistoryService } from '../../services/apis/execution-history.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataReasonStatusDTO } from 'src/app/dtos/master-data/master-data-reason-status.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { NotifierService } from 'src/app/shared/services/notifier.service';

export type EXECUTION_HISTORY_OPERATIONS = 'assign' | 'cancel';

@Component({
  selector: 'modal-execution-history',
  templateUrl: './modal-execution-history.component.html',
  styleUrls: []
})
export class ModalExecutionHistoryComponent implements OnChanges{
  @Input() openModal = false;
  @Output() openModalChange = new EventEmitter<boolean>();
  @Input() serviceOrder?: ServiceOrderItem;
  @Input() operation?: EXECUTION_HISTORY_OPERATIONS = 'assign';

  title = '';
  disabledEmployeeControl = false;

  form: FormGroup<{
    status: FormControl<MasterDataOrderStatusDTO | null>;
    employee: FormControl<MasterDataEmployeeDTO | null >;
    reason: FormControl<MasterDataReasonStatusDTO | null>;
    observations: FormControl<string | null>;
  }>;

  constructor(
    private service: ExecutionHistoryService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,) {

    this.form = this.formBuilder.group({
      status: new FormControl<MasterDataOrderStatusDTO | null>(null),
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      reason: new FormControl<MasterDataReasonStatusDTO | null>(null , [Validators.required]),
      observations: new FormControl<string | null>(null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValueOperation = changes['operation']?.currentValue;
    switch(currentValueOperation) {
      case 'assign': {
        this.title = `Asignar Orden - ${this.serviceOrder?.number}`;
        this.form.get('status')?.setValue({ code: 'PENDING', name: 'Pendiente' });
        this.form.get('employee')?.addValidators(Validators.required);
        this.disabledEmployeeControl = false;
        break;
      }
      case 'cancel': {
        this.title = `Cancelar Orden - ${this.serviceOrder?.number}`;
        this.form.get('status')?.setValue({ code: 'CANCELED', name: 'Cancelado' });
        this.form.get('employee')?.clearValidators();
        this.disabledEmployeeControl = true;
      }
    }

  }

  createExecutionHistory(): void {
    this.service.createHistoryExecution({
      serviceOrderId: this.serviceOrder?.id ?? 0,
      assignedEmployeeId: this.employeeValue?.id ?? this.serviceOrder?.execution.executorEmployeId,
      status: this.statusValue?.code ?? 'PENDING',
      reasonId: this.reasonValue?.id ?? 0,
      observations: this.observationValue ?? ''
    })
    .subscribe({
      next: (_) => {
        this.notifier.pushSuccess('Se actualizo la orden');
        this.close();
      },
      error: (err) => {
        const messageError = err.error.message ?? err.message;
        this.notifier.pushError(messageError);
        this.close();
      }
    });
  }

  close(): void {
    this.openModal = false;
    this.openModalChange.emit(false);
  }

  private get employeeValue(): MasterDataEmployeeDTO | null | undefined {
    return this.form.get('employee')?.value;
  }

  private get statusValue(): MasterDataOrderStatusDTO | null | undefined {
    return this.form.get('status')?.value;
  }

  private get reasonValue(): MasterDataReasonStatusDTO | undefined | null {
    return this.form.get('reason')?.value;
  }

  private get observationValue(): string | null | undefined {
    return this.form.get('observations')?.value;
  }

  isFormInvalid(): boolean {
    const reasonControl = this.form.get('reason');
    const employeeControl = this.form.get('employee');
    return reasonControl?.invalid
      ?? employeeControl?.invalid ?? false;
  }
}
