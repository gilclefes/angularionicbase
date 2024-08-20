export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyD_jVtRorS4_hNWozI8nH8cIp4WG6aP1EI',
    authDomain: 'yabotest.firebaseapp.com',
    projectId: 'yabotest',
    storageBucket: 'yabotest.appspot.com',
    messagingSenderId: '1010152877586',
    appId: '1:1010152877586:web:33b7222ebf795278da72cb',
    measurementId: 'G-557GY5H582',
    vapidKey:
      'BBZHjgJF6IhL6ZIu8JUiDeIIZi1KhZ7nG0NN9oo6nJjDNecXBW_sYmdMUK-8KwbiQB5Iy2zhTlyFfibB3JXIXlg',
  },
  appShellConfig: {
    debug: false,
    networkDelay: 500,
  },
  //apiUrl: 'http://localhost:5218/',
  apiUrl: 'http://5.161.118.86:8080/',
  mapKey: 'AIzaSyDhpSzvUdXpJMswFxTQ94Jt5Qp5jInbYVI',
  opencageAPI: 'cb88f2b1cf5a42cba2f94573091d7567',
  keys: {
    googleMaps: 'AIzaSyDhpSzvUdXpJMswFxTQ94Jt5Qp5jInbYVI',
  },

  orderstatus: {
    newOrderStatusId: 1,
    paidOrderStatusId: 2,
    cancelledOrderStatusId: 3,
    pickedOrderStatusId: 4,
    serviceInProgressOrderStatusId: 5,
    completedOrderStatusId: 6,
    confirmedOrderStatusId: 7,
  },
  regStatusId: 1,
  genericError: 'An error occurred, please try again later',
  AdminRole: 'ADMIN',
};
