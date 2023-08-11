import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeMarker } from '../interfaces/employee-marker.interface';
import { EmployeeTrackingDTO } from '../dtos/employee-tracking.dto';

@Pipe({
  name: 'employeeMarker',
})
export class EmployeeMarkerPipe implements PipeTransform {
  transform({
    location,
    employee,
    employeeStatus,
  }: EmployeeTrackingDTO): EmployeeMarker {
    const { latitude: lat, longitude: lng } = location;
    const { id, username, firstName, lastName } = employee;
    const fullName = `${firstName} ${lastName}`;
    const icon =
      employeeStatus === 'available' ? 'green-dot.png' : 'blue-dot.png';
    return {
      position: { lat, lng },
      label: {
        text: username,
      },
      title: username,
      info: `
      Num. Empleado: <b>1234</b></br>
      Estado: <b>En reparto</b></br>
      Cant. Ordenes asignadas: <b>3</b></br>
      Cant. Ordenes pendientes: <b>2</b></br>
      `,
      icon: {
        url: `http://maps.google.com/mapfiles/ms/icons/${icon}`,
      },
      employeeId: id
    };
  }
}
