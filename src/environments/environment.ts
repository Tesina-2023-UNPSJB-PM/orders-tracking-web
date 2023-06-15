const host = 'localhost';

const endpoints = {
  serviceOrders: `http://${host}:8080/tracking-so/orders`,
  employees: `http://${host}:8080/tracking-so/employees`,
  customers: `http://${host}:8080/tracking-so/customers`,
  masterData: `http://${host}:8080/tracking-so/master-data`,
};
export const environment = {
  production: false,
  endpoints,
};
