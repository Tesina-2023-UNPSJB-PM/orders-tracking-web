import { EmployeeToDataListItemPipe } from './employee-to-data-list-item.pipe';

describe('EmployeeToDataListItemPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeToDataListItemPipe();
    expect(pipe).toBeTruthy();
  });
});
