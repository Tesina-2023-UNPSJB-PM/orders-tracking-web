export type EmployeeTrackingDTO = {
  employeeStatus: 'available' | 'on_duty';
  employee: {
    username: string;
    firstName: string;
    lastName: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};
