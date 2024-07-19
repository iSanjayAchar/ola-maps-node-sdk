import { AxiosInstance, AxiosResponse } from "axios";
import { IBaseResponse, ILanguage, IPlacesAutoCompleteResult, IVersion } from "./types";
import { ENV } from "./const";
import { httpClientInit } from "./utilities/http-client";

type Options = {
    'X-Request-Id'?: string;
    'X-Correlation-Id'?: string;
    location?: {
        latitude: string | number;
        longitude: string | number;
    };
    radius?: number;
    strictbounds?: boolean;
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

    public async autocomplete(input: string, language?: ILanguage, options?: Options): Promise<IBaseResponse<IPlacesAutoCompleteResult>> {
        try {
        let path = `${process.env.autoCompletePath}?input=${input}`;

        if (options) {
            if (options["X-Correlation-Id"]) {
                path += `X-Correlation-Id=${options["X-Correlation-Id"]}&`;
            }
    
            if (options["X-Request-Id"]) {
                path += `X-Request-Id=${options["X-Request-Id"]}&`;
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
}