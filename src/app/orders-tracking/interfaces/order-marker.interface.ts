import { IMarker } from "./marker.interface";

export interface OrderMarker extends IMarker {
  position: {
    lat: number;
    lng: number;
  };
  label: {
    text: string;
  };
  title: string;
  info: string;
  icon: {
    url: string;
  };
  serviceOrderId: number;
}
