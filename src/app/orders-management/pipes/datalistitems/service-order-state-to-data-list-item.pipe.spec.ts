import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderStateToDataListItemPipe } from './service-order-state-to-data-list-item.pipe';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

describe('ServiceOrderStateToDataListItemPipe', () => {
  it('create an instance', () => {
    const pipe = new ServiceOrderStateToDataListItemPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform data successfuly', () => {
    const initialState: ServiceOrderStateDTO[] = [
      {
        code: 'PENDING',
        description: '',
        name: 'Pendiente',
      },
    ];
    const pipe = new ServiceOrderStateToDataListItemPipe();
    const datalistItems: DatalistItem[] = pipe.transform(initialState);
    expect(datalistItems[0].id).toBe(initialState[0].code);
    expect(datalistItems[0].value).toBe(initialState[0].name);
  });
});
