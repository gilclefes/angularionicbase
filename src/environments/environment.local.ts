// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
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
  apiUrl: 'http://localhost:5218/',
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
