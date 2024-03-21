import http from "k6/http";
import { sleep } from "k6";

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
    //spike testing
    stages: [
        { duration: "1m", target: 10000 }, //ramp up
        { duration: "30s", target: 0 }, //ramp-down to 0
        { duration: "1m", target: 10000 }, //ramp up
        { duration: "30s", target: 0 }, //ramp-down to 0
    ],
};

export default () => {
    http.get("http://localhost:4567/topic/1/welcome-to-your-nodebb");
    sleep(1);
};
