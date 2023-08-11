import { IMarker } from "./marker.interface";

export interface EmployeeMarker extends IMarker {
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
  employeeId: number;
}
