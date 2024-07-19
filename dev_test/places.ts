import {Places} from "../src";

const apiKey = process.env.OLA_MAPS_API_KEY as string;

const places = new Places(apiKey);

// places.autocomplete("sadsadsadsadsadsdsads").then(console.log).catch(console.error)
// places.geocoding("271").then(console.log).catch(console.error);
places.reverse_geocode("12.931316595874005", "77.61649243443775").then(console.log).catch(console.error);