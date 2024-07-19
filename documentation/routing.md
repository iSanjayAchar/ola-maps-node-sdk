# Routing API
This JavaScript library provides a client to interact with the OLA Maps Routing API. It simplifies the process of calculating directions between locations using Axios for HTTP requests

### Usage
To use the client, you'll need an API key. Create a new instance of the Routing class and pass your API key and optional version (defaulting to `v1`)

**Note:** An API key from the Places service is required for authentication. More details regarding the authentication can be found here.

### Methods
The `Routing` class provides the following methods:
1. `direction(origin, destination, options?)`
    - `origin` (Coordinates) - Object with lat (latitude) and lng (longitude) of the starting point.
    - `destination` (Coordinates) - Object with lat (latitude) and lng (longitude) of the ending point.
    - `options` - (Optional) Additional options like language, location, radius, etc... <br />
    ```typescript
    type DirectionOptions = {
        "X-Request-Id"?: string;
        "X-Correlation-Id"?: string;
        waypoints?: Array<[string | number, string | number]>;
        alternatives?: boolean;
        steps?: boolean;
        overview?: "full" | "simplied" | false;
        language?: ILanguage;
        traffic_metadata?: boolean;
    }  
    ```

### Example
```javascript
import { Routing } from "ola-maps";

async function main() {
    const routing = new Routing("YOUR_API_KEY");

    const origin = { lat: 12.9716, lng: 77.5946 }; // Bengaluru
    const destination = { lat: 19.0760, lng: 72.8777 }; // Mumbai

    const directionResult = await routing.direction(origin, destination);
    console.log(directionResult);
}

main();
```
