import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { ServiceOrderTypeToDataListItemPipe } from './service-order-type-to-data-list-item.pipe';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

describe('ServiceOrderTypeToDataListItemPipe', () => {
  it('create an instance', () => {
    const pipe = new ServiceOrderTypeToDataListItemPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform data successfuly', () => {
    const initialState: ServiceOrderTypeDTO[] = [
      {
        id: 1,
        name: 'Reparación',
        description: ''
      },
    ];
    const pipe = new ServiceOrderTypeToDataListItemPipe();
    const datalistItems: DatalistItem[] = pipe.transform(initialState);
    expect(datalistItems[0].id).toBe(initialState[0].id + '');
    expect(datalistItems[0].value).toBe(initialState[0].name);
  });
});
