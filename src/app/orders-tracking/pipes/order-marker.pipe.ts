import { Pipe, PipeTransform } from '@angular/core';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { OrderMarker } from '../interfaces/order-marker.interface';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';
import { ORDERS_MANAGEMENT_ROUTES } from 'src/app/orders-management/constants/routes.constant';

@Pipe({
  name: 'orderMarker',
})
export class OrderMarkerPipe implements PipeTransform {
  transform(serviceOrderItems: ServiceOrderItem[]): OrderMarker[] {
    return serviceOrderItems.map(
      ({ id, description, destination, number, status, type }) => {
        const {
          latitude: lat,
          longitude: lng,
          description: addressDescription,
        } = destination.address;
        const { name } = status;
        return {
          position: { lat, lng },
          label: {
            text: `#${number}`,
          },
          title: `${number}`,
          info: `
          <div>Num. Orden: <b>${number}</b></br>
          Tipo: <b>${type.name}</b></br>
          Estado: <b>${name}</b></br>
          Dir: <b>${addressDescription}</b></br>
          Descripción: <b>${description}</b></br>
          Tel.: <b>-</b></br>
    `,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png',
          },
          serviceOrderId: id,
        };
      }
    );
  }
}
