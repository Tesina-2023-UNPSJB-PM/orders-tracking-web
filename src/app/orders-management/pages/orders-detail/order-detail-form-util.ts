import { FormBuilder, FormControl, FormGroup } from "@angular/forms"
import { MasterDataCustomerDTO } from "src/app/dtos/master-data/master-data-customer.dto";
import { MasterDataEmployeeDTO } from "src/app/dtos/master-data/master-data-employee.dto";
import { MasterDataOrderPriorityDTO } from "src/app/dtos/master-data/master-data-order-priority.dto";
import { MasterDataOrderStatusDTO } from "src/app/dtos/master-data/master-data-order-status.dto";
import { MasterDataOrderTypeDTO } from "src/app/dtos/master-data/master-data-order-type.dto";
import { SectorDTO } from "src/app/dtos/sector.dto";
import { ServiceOrderDetailResponse } from "src/app/dtos/service-order-detail.dto";

export type OrderDetailFormType = FormGroup<{
  formBasic: FormGroup<{
    number: FormControl<string | null>;
    description: FormControl<string | null>;
    type: FormControl<MasterDataOrderTypeDTO | null>;
    state: FormControl<MasterDataOrderStatusDTO | null>;
    priority: FormControl<MasterDataOrderPriorityDTO | null>;
    customer: FormControl<MasterDataCustomerDTO | null>;
  }>;
  formExecution: FormGroup<{
    sector: FormControl<SectorDTO | null>;
    employee: FormControl<MasterDataEmployeeDTO | null>;
    estimatedResolutionDate: FormControl<Date | null>;
    estimatedResolutionTime: FormControl<string | null>;
    observationsExecution: FormControl<string | null>;
  }>;
  formLocation: FormGroup<{
    descriptionAddress: FormControl<string | null>;
    cityAddress: FormControl<string | null>;
    zipCodeAddress: FormControl<string | null>;
    stateAddress: FormControl<string | null>;
    countryAddress: FormControl<string | null>;
    latitudeAddress: FormControl<string | null>;
    longitudeAddress: FormControl<string | null>;
    referenceInfo: FormControl<string | null>;
  }>;}>;

export function createOrderDetailForm(builder: FormBuilder): OrderDetailFormType {
  const valueStatusDefault = { code: 'PENDING', name: 'Pendiente' };

  return builder.group({
    formBasic: builder.group({
      number: new FormControl<string | null>(''),
      description: new FormControl<string | null>(''),
      type: new FormControl<MasterDataOrderTypeDTO | null>(null),
      state: new FormControl<MasterDataOrderStatusDTO | null>(
        valueStatusDefault
      ),
      priority: new FormControl<MasterDataOrderPriorityDTO | null>(null),
      customer: new FormControl<MasterDataCustomerDTO | null>(null),
    }),
    formExecution: builder.group({
      sector: new FormControl<SectorDTO | null>(null),
      employee: new FormControl<MasterDataEmployeeDTO | null>(null),
      estimatedResolutionDate: new FormControl<Date | null>(null),
      estimatedResolutionTime: new FormControl<string | null>('12:00'),
      observationsExecution: new FormControl<string | null>(null),
    }),
    formLocation: builder.group({
      descriptionAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      cityAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      zipCodeAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      stateAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      countryAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      latitudeAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      longitudeAddress: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
      referenceInfo: new FormControl<string | null>(null),
    }),
  });
}

export function initializeFormData(form: OrderDetailFormType, data:ServiceOrderDetailResponse) {
  form.setValue({
    formBasic: {
      number: data?.number ?? null,
      description: data?.description ?? null,
      type: data?.type ?? null,
      state: data?.status ?? null,
      priority: getMasterDataPriority(data?.priority),
      customer: data?.customer ?? null,
    },
    formExecution: {
      employee: data.execution?.executorEmployee ?? null,
      sector: data.execution?.assignedSector ?? null,
      estimatedResolutionDate: null,
      estimatedResolutionTime: null,
      observationsExecution: data.execution?.observations ?? null
    },
    formLocation: {
      descriptionAddress: data?.destination?.address?.description ?? null,
      cityAddress: data?.destination?.address?.city ?? null,
      countryAddress: data?.destination?.address?.country ?? null,
      stateAddress: data?.destination?.address?.state ?? null,
      zipCodeAddress: data?.destination?.address?.zipCode ?? null,
      latitudeAddress: '' + data?.destination?.address?.latitude,
      longitudeAddress: '' + data?.destination?.address?.longitude,
      referenceInfo: data?.destination?.referenceInfo ?? null
    }
  });
}

function getMasterDataPriority(priority: string | undefined): MasterDataOrderPriorityDTO | null {
  if (!priority) return null;

  switch (priority) {
    case 'LOW':
      return {code: 'LOW', name : 'Baja'} as MasterDataOrderPriorityDTO;
    case 'MEDIUM':
      return {code: 'MEDIUM', name : 'Media'} as MasterDataOrderPriorityDTO;
    case 'HIGH':
      return {code: 'HIGH', name : 'Alta'} as MasterDataOrderPriorityDTO;
    default:
      return null;
  }
}
function getDateEstimatedResolution(estimatedResolutionTime: Date | undefined): Date | null {
  throw new Error("Function not implemented.");
}

