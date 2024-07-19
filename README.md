# OLA Maps SDK (WIP)
A Node.js Library for Easy Integration with OLA Maps API

### Installation
```
npm i -S ola-maps
# OR
yarn add ola-maps
```

### Places (Autocomplete)
```
import { Places } from "ola-maps";

const places = new Places("API_KEY", "VERSION"); // Version is optional

async function query(input) {
    const result = places.autocomplete(input);
    console.log(result);
}
```