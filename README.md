# OLA Maps SDK
This JavaScript SDK provides a seamless interface to interact with the OLA Maps API, simplifying geocoding, reverse geocoding, and routing operations.
<br />
<br />
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cebb7bf6c07048ccbd6fdf756d56b0bf)](https://app.codacy.com/gh/iSanjayAchar/ola-maps-node-sdk/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/cebb7bf6c07048ccbd6fdf756d56b0bf)](https://app.codacy.com/gh/iSanjayAchar/ola-maps-node-sdk/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
![NPM Version](https://img.shields.io/npm/v/ola-maps)
![Licence](https://img.shields.io/badge/license-MIT-blue)

### Installation
Install the SDK using npm:
```bash
npm i --save ola-maps
```
Or using yarn:
```bash
yarn add ola-maps
```

### Modules
The SDK consists of two main modules:
1. **Places**: Provides functionality for autocomplete, geocoding, and reverse geocoding. For more details, check the [Places documentation](/documentation/places.md).
2. **Routing**: Enables the calculation of directions between locations. For more details, check the [Routing documentation](/documentation/routing.md)

### Authentication
This SDK supports authentication using `API_KEY`. Generate your API key by following the instructions in the OLA Maps documentation: https://maps.olakrutrim.com/docs/auth

### Basic Example
```javascript
import { Places, Routing } from "ola-maps";

const placesClient = new Places("YOUR_API_KEY");
const routingClient = new Routing("YOUR_API_KEY");

async function main() {
  const autocompleteResult = await placesClient.autocomplete("Koramangala");
  console.log(autocompleteResult);

  const geocodeResult = await placesClient.geocode("Regent Insignia, 4th Block, 17th Main, Koramangala");
  console.log(geocodeResult);

  const reverseGeocodeResult = await placesClient.reverse_geocode(12.9716, 77.5946);
  console.log(reverseGeocodeResult);

  const origin = { lat: 12.9716, lng: 77.5946 }; // Bengaluru
  const destination = { lat: 19.0760, lng: 72.8777 }; // Mumbai
  const directionResult = await routingClient.direction(origin, destination);
  console.log(directionResult);
}

main();
```

### Issues
If you encounter any problems or have feature requests, please file an issue on our GitHub repository - https://github.com/iSanjayAchar/ola-maps-node-sdk/issues/new

### Contributors ✨
<table>
  <tbody>
    <td align="center" valign="top" width="14.28%">
      <a href="https://github.com/iSanjayAchar">
        <img src="https://avatars.githubusercontent.com/u/11937721?v=3?s=100" width="100px;" alt="Kent C. Dodds" />
        <br />
        <sub>
          <b>Sanjay Achar</b>
        </sub>
      </a>
    </td>
    <td align="center" valign="top" width="14.28%">
      <a href="https://github.com/JeevanAchar">
        <img src="https://avatars.githubusercontent.com/u/114219448?v=3?s=100" width="100px;" alt="Kent C. Dodds" />
        <br />
        <sub>
          <b>Jeevan V</b>
        </sub>
      </a>
    </td>    
  </tbody>
</table>

### Licence
This SDK is released under the MIT License.
