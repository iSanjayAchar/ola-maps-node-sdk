import { IVersion } from "./types";

const ENV: {
    [key in IVersion]: Record<string, string>
} = {
    v1: {
        baseUrl: "https://api.olamaps.io",
        autoCompletePath: "/places/{version}/autocomplete",
        geoCodingPath: "/places/{version}/geocode",
    },
}

export {
    ENV,
};
