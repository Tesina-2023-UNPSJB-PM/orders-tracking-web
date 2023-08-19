const host = 'vps-3107443-x.dattaweb.com';
const PREFIX_PATH = 'api';

const endpoints = {
  serviceOrders: `http://${host}/${PREFIX_PATH}/tracking-so/orders`,
  employees: `http://${host}/${PREFIX_PATH}/tracking-so/employees`,
  customers: `http://${host}/${PREFIX_PATH}/tracking-so/customers`,
  masterData: `http://${host}/${PREFIX_PATH}/tracking-so/master-data`,
  login: `http://${host}/${PREFIX_PATH}/tracking-so/auth/login`
};
export const environment = {
  production: false,
  endpoints,
};
