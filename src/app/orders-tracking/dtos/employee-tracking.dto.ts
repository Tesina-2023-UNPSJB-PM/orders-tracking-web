export type EmployeeTrackingDTO = {
  employeeStatus: 'available' | 'on_duty';
  employee: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};
