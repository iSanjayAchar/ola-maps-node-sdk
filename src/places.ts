import {AxiosInstance, AxiosResponse} from "axios";
import {IBaseResponse, IGeocodingResult, ILanguage, IPlacesAutoCompleteResult, IReverseGeocodingResult, IVersion} from "./types";
import {ENV} from "./const";
import {httpClientInit} from "./utilities/http-client";

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

type ReverseGeocodingOption = {
    "X-Request-Id"?: string;
    "X-Correlation-Id"?: string;
}

/**
 * Represents a client for interacting with a Places API.
 * Provides methods for autocomplete and geocoding functionality.
 */
export class Places {
    /**
     * API key for authentication with the Places service.
     * @private
     */
    private apiKey = "";

    /**
     * The API version to use. Defaults to 'v1'.
     * @private
     */
    private version: IVersion = "v1";

    /**
     * The Axios instance used for making HTTP requests.
     * @private
     */
    private httpClient: AxiosInstance = {} as AxiosInstance;

    /**
     * Creates a new Places client.
     * @param apiKey - Your API key for the Places service.
     * @param version - (Optional) The API version to use. Defaults to 'v1'.
     * @throws {Error} If the API key is missing or invalid.
     */
    constructor(
        apiKey: string,
        version: IVersion = "v1",
    ) {
        if (!apiKey || apiKey.trim() === "") {
            throw new Error("API Key is required. Check documentation - https://maps.olakrutrim.com/docs/auth");
        }

        this.apiKey = apiKey;
        this.version = version;
        this.init();
    }

    /**
     * Initializes the Places client by setting up the Axios instance and environment variables.
     * @private
     */
    private init(): void {
        const env = ENV[this.version];
        process.env.API_VERSION = this.version;

        for (const variable in env) {
            if (env[variable]) {
                process.env[variable] = env[variable];
            }
        }

        this.httpClient = httpClientInit(this.apiKey);
    }

    /**
     * Performs autocomplete based on the provided input and options.
     * @param input - The user's search input.
     * @param options - (Optional) Additional options to customize the request.
     * @returns A Promise that resolves to the autocomplete results.
     */
    public async autocomplete(input: string, options?: PlacesOption): Promise<IBaseResponse<IPlacesAutoCompleteResult>> {
        try {
            let path = `${process.env.autoCompletePath}?input=${encodeURI(input)}`;

            if (options) {
                if (options["X-Correlation-Id"]) {
                    path += `X-Correlation-Id=${options["X-Correlation-Id"]}&`;
                }

                if (options["X-Request-Id"]) {
                    path += `X-Request-Id=${options["X-Request-Id"]}&`;
                }

                if (options.language) {
                    path += `language=${options.language}&`;
                }

                if (typeof options.radius === "number" && options.radius >= 0) {
                    path += `radius=${options.radius}&`;
                }

                if (typeof options.strictbounds === "boolean") {
                    path += `strictbounds=${options.strictbounds}&`;
                }

                if (options.location) {
                    path += `location=${options.location.latitude},${options.location.longitude}&`;
                }
            }

            if (path.endsWith("&") || path.endsWith("?")) {
                path = path.slice(0, -1);
            }

            const {data}: AxiosResponse<IBaseResponse<IPlacesAutoCompleteResult>> = await this.httpClient.get(path);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Performs geocode based on the provided address and options.
     * @param address - The address to geocode.
     * @param options - (Optional) Additional options to customize the request.
     * @returns A Promise that resolves to the geocoding results.
     */
    public async geocode(address: string, options?: GeocodingOption): Promise<IBaseResponse<IGeocodingResult>> {
        try {
            let path = `${process.env.geoCodingPath}?address=${encodeURI(address)}`;

            if (options) {
                if (options["X-Correlation-Id"]) {
                    path += `X-Correlation-Id=${options["X-Correlation-Id"]}&`;
                }

                if (options["X-Request-Id"]) {
                    path += `X-Request-Id=${options["X-Request-Id"]}&`;
                }

                if (options.language) {
                    path += `language=${options.language}&`;
                }

                if (options.bounding) {
                    const x = [options.bounding.x.latitude, options.bounding.x.longitude].join(",");
                    const y = [options.bounding.y.latitude, options.bounding.y.longitude].join(",");

                    path += `bounding=${[x, y].join("|")}&`;
                }
            }

            if (path.endsWith("&") || path.endsWith("?")) {
                path = path.slice(0, -1);
            }

            const {data}: AxiosResponse<IBaseResponse<IGeocodingResult>> = await this.httpClient.get(path);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Performs reverse geocode to get address details from latitude and longitude coordinates.
     *
     * @param lat - The latitude coordinate.
     * @param lng - The longitude coordinate.
     * @param options - (Optional) Additional options to customize the request:
     *   - X-Correlation-Id: (Optional) A correlation ID for tracking the request.
     *   - X-Request-Id: (Optional) A unique request ID.
     * @returns A Promise that resolves to the reverse geocoding results.
     * @throws {Error} If an error occurs during the request.
     */
    public async reverse_geocode(lat: string | number, lng: string| number, options?: ReverseGeocodingOption): Promise<IBaseResponse<IReverseGeocodingResult>> {
        try {
            let path = `${process.env.reverseGeoCodingPath}?latlng=${lat},${lng}?`;

            if (options) {
                if (options["X-Correlation-Id"]) {
                    path += `X-Correlation-Id=${options["X-Correlation-Id"]}&`;
                }

                if (options["X-Request-Id"]) {
                    path += `X-Request-Id=${options["X-Request-Id"]}&`;
                }
            }

            if (path.endsWith("&") || path.endsWith("?")) {
                path = path.slice(0, -1);
            }

            const {data}: AxiosResponse<IBaseResponse<IReverseGeocodingResult>> = await this.httpClient.get(path);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
