const host = 'vps-3107443-x.dattaweb.com';
const endpoints = {
  serviceOrders: `http://${host}/service_orders/`,
  employees: `http://${host}:3000/tracking-so/employees`,
  customers: `http://${host}:3000/tracking-so/customers`,
  masterData: `http://${host}:8080/tracking-so/master-data`,
};
export const environment = {
  production: false,
  endpoints,
};
