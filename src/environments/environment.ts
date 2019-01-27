// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCVdYoA0evGQ2Xx_O_WM7568adUN0CiGII",
    authDomain: "kbooks-4db0c.firebaseapp.com",
    databaseURL: "https://kbooks-4db0c.firebaseio.com",
    projectId: "kbooks-4db0c",
    storageBucket: "kbooks-4db0c.appspot.com",
    messagingSenderId: "14291448898"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
