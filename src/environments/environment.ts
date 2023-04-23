const host = 'localhost';

const endpoints = {
  serviceOrders: `http://${host}:3000/tracking-so/orders`,
  reviewers: `http://${host}:3000/tracking-so/reviewers`,
  customers: `http://${host}:3000/tracking-so/customers`,
};
export const environment = {
  production: false,
  endpoints,
};
