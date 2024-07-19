# OLA Maps SDK (WIP)
A Node.js Library for Easy Integration with OLA Maps API
<br /><br />
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cebb7bf6c07048ccbd6fdf756d56b0bf)](https://app.codacy.com/gh/iSanjayAchar/ola-maps-node-sdk/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/cebb7bf6c07048ccbd6fdf756d56b0bf)](https://app.codacy.com/gh/iSanjayAchar/ola-maps-node-sdk/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
### Installation
```
npm i -S ola-maps
# OR
yarn add ola-maps
```

### Authentication
While OLA Map APIs support two type of authentication, this SDK only supports only authentication using `API_KEY`. To generate `API_KEY`, check the documentation - https://maps.olakrutrim.com/docs/auth

### Support
1. Places
    - [x] Autocomplete
    - [x] Geocode
    - [x] Reverse Geocode
2. Routing
    - [ ] Direction 

### Places
Comprehensive set of APIs to access OLA Maps API with ease

#### Auto Complete
Autocomplete provides intuitive suggestions of places to be looked up. This helps accurate lookup of places based on the text provided. This solves a lot of use cases like lookup of popular places like restaurants, malls, etc.

```
import { Places } from "ola-maps";

const places = new Places("API_KEY", "VERSION"); // Version is optional

async function query(input) {
    const result = places.autocomplete(input);
    console.log(result);
}
```

#### Geocode
Forward Geocoding API helps translate real-world text-based addresses into geographic coordinates. This is useful in mapping services, route planning, location-based searches, and delivery logistics.

```
import { Places } from "ola-maps";

const places = new Places("API_KEY", "VERSION"); // Version is optional

async function query(input) {
    const result = places.geocode(input);
    console.log(result);
}
```

#### Reverse Geocode
Reverse Geocoding API helps in translating coordinates to real world text based addressing. This is helpful in scenarios like taxi pickup, taxi drop, delivery/courier, etc.

```
import { Places } from "ola-maps";

const places = new Places("API_KEY", "VERSION"); // Version is optional

async function query(input) {
    const result = places.reverse_geocode(input);
    console.log(result);
}
```
