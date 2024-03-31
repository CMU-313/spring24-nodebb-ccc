import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//     vus: 1,
//     duration: '10s'
// };

// export const options = {
//     //short test with 200 users holding steady
//     stages : [
//         { duration: '1m', target: 200 }, //ramp up
//         { duration: '10m', target: 200 }, //stable
//         { duration: '5m', target: 0 } //ramp-down to 0
//     ],
// };
// 
// export const options = {
//     //longer stage of test with more users
//     stages : [
//         { duration: '2m', target: 3000 }, //ramp up
//         // { duration: '10m', target: 20000 }, //stable
//         { duration: '5m', target: 0 } //ramp-down to 0
//     ],
// };

// export const options = {
//     //spike testing
//     stages : [
//         { duration: '1m', target: 10000 }, //ramp up
//         { duration: '30s', target: 0 }, //ramp-down to 0
//         { duration: '1m', target: 10000 }, //ramp up
//         { duration: '30s', target: 0 } //ramp-down to 0
//     ],
// };

export const options = {
    duration: '1m',
    vus: 50,
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
  };

export default () => {
    http.get('http://127.0.0.1:4567/forum');
    sleep(1);
}