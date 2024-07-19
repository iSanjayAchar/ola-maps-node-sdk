import {AxiosInstance, AxiosResponse} from "axios";
import {ENV} from "./const";
import {IBaseResponse, IDirectionResult, ILanguage, IVersion} from "./types";
import {httpClientInit} from "./utilities/http-client";

type Coordinates = {
    lat: string | number;
    lng: string | number;
}

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

/**
 * Client for interacting with the OLA Maps Routing API.
 *
 * This class provides methods for calculating directions between locations,
 * handling authentication, and managing API requests.
 */
export class Routing {
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
     * Calculates directions between an origin and destination, with optional parameters.
     *
     * @async
     * @param {Coordinates} origin - An object with `lat` (latitude) and `lng` (longitude) properties representing the starting point.
     * @param {Coordinates} destination - An object with `lat` and `lng` properties representing the ending point.
     * @param {DirectionOptions} [options] - Optional parameters for customizing the direction request.
     * @returns {Promise<IBaseResponse<IDirectionResult>>} A Promise that resolves to a standardized API response containing the direction results.
     * @throws {Error} If an error occurs during the API request, the Promise will be rejected with the error.
     */
    public async direction(origin: Coordinates, destination: Coordinates, options?: DirectionOptions): Promise<IBaseResponse<IDirectionResult>> {
        try {
            let path = `${process.env.directionPath}?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&`;

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

                if (typeof options.alternatives === "boolean") {
                    path += `alternatives=${options.alternatives}&`;
                }

                if (typeof options.traffic_metadata === "boolean") {
                    path += `traffic_metadata=${options.traffic_metadata}&`;
                }

                if (typeof options.steps === "boolean") {
                    path += `steps=${options.steps}&`;
                }

                if (typeof options.overview === "boolean" || typeof options.overview === "string") {
                    path += `overview=${options.overview}&s`;
                }

                if (options.waypoints) {
                    path += `waypoints=${options.waypoints.map((points) => points.join(",")).join("|")}&`;
                }
            }

            if (path.endsWith("&") || path.endsWith("?")) {
                path = path.slice(0, -1);
            }

            const {data}: AxiosResponse<IBaseResponse<IDirectionResult>> = await this.httpClient.post(path, "");
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
