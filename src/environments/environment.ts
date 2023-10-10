const host = 'vps-3107443-x.dattaweb.com';
const PREFIX_PATH = 'api';
const googleApiKey = 'AIzaSyCkNjP-5v8Up7aq7cmSV03pUvpCYGSmJps'
const endpoints = {
  serviceOrders: `http://${host}/${PREFIX_PATH}/tracking-so/orders`,
  executionHistory: `http://${host}/${PREFIX_PATH}/tracking-so/execution-history`,
  employees: `http://${host}/${PREFIX_PATH}/tracking-so/employees`,
  customers: `http://${host}/${PREFIX_PATH}/tracking-so/customers`,
  masterData: `http://${host}/${PREFIX_PATH}/tracking-so/master-data`,
  login: `http://${host}/${PREFIX_PATH}/tracking-so/auth/login`,
};
export const environment = {
  production: false,
  endpoints,
  googleApiKey
};
