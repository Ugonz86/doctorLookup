let Promise = require('es6-promise-polyfill').Promise;
// eslint-disable-next-line
    export function practiceLookup(name){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      console.log(name);
      let url = 'https://api.betterdoctor.com/2016-03-01/practices?name='+name+'&location=47.624569%2C-122.351059%2C100&skip=0&limit=10&user_key=cb0cb401317acaef5e79e512214daf52';
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  export function illnessLookup(query){
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    console.log(query);
    let url = 'https://api.betterdoctor.com/2016-03-01/doctors?query='+query+'&location=47.624569%2C-122.351059%2C100&skip=0&limit=10&user_key=cb0cb401317acaef5e79e512214daf52';
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}
