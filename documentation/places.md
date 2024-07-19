# Places API
This JavaScript library provides a client to interact with the Places API. It simplifies the process of making autocomplete, geocoding, and reverse geocoding requests. It uses Axios under the hood for making HTTP requests.

### Usage
To use the client, you'll need an API key. Create a new instance of the Places class and pass your API key and optional version (defaulting to `v1`)

**Note:** An API key from the Places service is required for authentication. More details regarding the authentication can be found here.

### Methods
The `Places` class provides the following methods:
1. `autocomplete(input, options?)`
    - Performs autocomplete based on the provided input.
    - `input` - The user's search input.
    - `options` - (Optional) Additional options like language, location, radius, etc... <br />
    ```typescript
    type PlacesOption = {
        "X-Request-Id"?: string;
        "X-Correlation-Id"?: string;
        language?: ILanguage;
        location?: {
            latitude: string | number;
            longitude: string | number;
        };
        radius?: number;
        strictbounds?: boolean;
    }    
    ```
2. `geocode(address, options?)` 
    - Converts an address into geographic coordinates (latitude and longitude).
    - `address` - The address to geocode.
    - `options` - (Optional) Additional options like language, bounding box, etc... <br />
    ```typescript
    type GeocodingOption = {
        "X-Request-Id"?: string;
        "X-Correlation-Id"?: string;
        language?: ILanguage;
        bounding?: {
            x: {
                latitude: string | number;
                longitude: string | number;
            },
            y: {
                latitude: string | number;
                longitude: string | number;
            }
        }
    }    
    ```
3. `reverse_geocode(lat, lng, options?)`
    - Converts latitude and longitude into an address.
    - `lat` - The latitude coordinate.
    - `lng` - The longitude coordinate.
    - `options` - (Optional) Additional options like correlation ID and request ID.
    ```typescript
    type ReverseGeocodingOption = {
        "X-Request-Id"?: string;
        "X-Correlation-Id"?: string;
    } 
    ```

### Example
```javascript
async function main() {
    import { Places } from "ola-maps";    

    const placesClient = new Places("YOUR_API_KEY");

    // Autocomplete
    const autocompleteResult = await placesClient.autocomplete("Koramangala");
    console.log(autocompleteResult);

    // Geocoding
    const geocodeResult = await placesClient.geocode("Regent Insignia, 4thBlock, 17th Main, Koramangala");
    console.log(geocodeResult);

    // Reverse Geocoding
    const reverseGeocodeResult = await placesClient.reverse_geocode(37.4221, -122.0841);
    console.log(reverseGeocodeResult);
}

main();
```
