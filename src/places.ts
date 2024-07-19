import { AxiosInstance, AxiosResponse } from "axios";
import { IBaseResponse, IGeocodingResult, ILanguage, IPlacesAutoCompleteResult, IVersion } from "./types";
import { ENV } from "./const";
import { httpClientInit } from "./utilities/http-client";

type PlacesOption = {
    'X-Request-Id'?: string;
    'X-Correlation-Id'?: string;
    language?: ILanguage;
    location?: {
        latitude: string | number;
        longitude: string | number;
    };
    radius?: number;
    strictbounds?: boolean;
}

type GeocodingOption = {
    'X-Request-Id'?: string;
    'X-Correlation-Id'?: string;
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


export class Places {
    private apiKey: string = "";
    private version: IVersion = "v1";
    private httpClient: AxiosInstance = {} as AxiosInstance;

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

    private init(): void {
        const env = ENV[this.version];
        process.env.API_VERSION = this.version;

        for (const variable in env) {
            process.env[variable] = env[variable];
        }

        this.httpClient = httpClientInit(this.apiKey);
    }

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
                path += `radius=${options.radius}&`
            }
    
            if (typeof options.strictbounds === "boolean") {
                path += `strictbounds=${options.strictbounds}&`;
            }
    
            if (options.location) {
                path += `location=${options.location.latitude},${options.location.longitude}&`;
            }
    
            if (path.endsWith("&") || path.endsWith("?")) {
                path = path.slice(0, -1);
            }
        }

        const {data}: AxiosResponse<IBaseResponse<IPlacesAutoCompleteResult>> = await this.httpClient.get(path);
        return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async geocoding(address: string, options?: GeocodingOption): Promise<IBaseResponse<IGeocodingResult>> {
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

            const {data}: AxiosResponse<IBaseResponse<IGeocodingResult>> = await this.httpClient.get(path);
            return Promise.resolve(data);            
        } catch (err) {
            return Promise.reject(err);
        }
    }
}