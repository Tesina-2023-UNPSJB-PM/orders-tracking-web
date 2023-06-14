const host = 'localhost';

const endpoints = {
  serviceOrders: `http://${host}:3000/tracking-so/orders`,
  employees: `http://${host}:3000/tracking-so/employees`,
  customers: `http://${host}:3000/tracking-so/customers`,
};
export const environment = {
  production: false,
  endpoints,
};
