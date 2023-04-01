const host = 'localhost'
const endpoints = {
  serviceOrders: `http://${host}:3000/tracking-so/orders`,
}
export const environment = {
  production: false,
  endpoints,
}
