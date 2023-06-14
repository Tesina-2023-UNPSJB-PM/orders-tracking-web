const host = 'vps-3107443-x.dattaweb.com';
const endpoints = {
  serviceOrders: `http://${host}/service_orders/`,
  employees: `http://${host}:3000/tracking-so/employees`,
  customers: `http://${host}:3000/tracking-so/customers`,
};
export const environment = {
  production: false,
  endpoints,
};
