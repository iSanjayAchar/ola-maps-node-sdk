import {Places} from "../src";

const apiKey = process.env.OLA_MAPS_API_KEY as string;

const places = new Places(apiKey);

places.autocomplete("sadsadsadsadsadsdsads").then(console.log).catch(console.error)