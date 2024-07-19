import {Routing} from "../src";

const apiKey = process.env.OLA_MAPS_API_KEY as string;

const routing = new Routing(apiKey);

routing.direction({
    lat: "18.76029027465273",
    lng: "73.3814242364375"
}, {
    lat: "18.73354223011708",
    lng: "73.44587966939002"
}).then(console.log).catch(console.error);