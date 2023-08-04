export interface EmployeeMarker {
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
}
