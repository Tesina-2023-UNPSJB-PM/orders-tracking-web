const host = 'localhost';
const PREFIX_PATH = 'api';

const endpoints = {
  serviceOrders: `http://${host}:8080/${PREFIX_PATH}/tracking-so/orders`,
  employees: `http://${host}:8080/${PREFIX_PATH}/tracking-so/employees`,
  customers: `http://${host}:8080/${PREFIX_PATH}/tracking-so/customers`,
  masterData: `http://${host}:8080/${PREFIX_PATH}/tracking-so/master-data`,
};
export const environment = {
  production: false,
  endpoints,
};
