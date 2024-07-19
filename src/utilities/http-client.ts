import axios from "axios";

function httpClientInit(apiKey: string) {
    const baseURL = process.env.baseUrl as string;
    const version = process.env.API_VERSION as string;

    const client = axios.create({
        baseURL,
    });

    client.interceptors.request.use((request) => {
        request.headers.Accept = "application/json";
        request.headers["Content-Type"] = "application/json";
        request.params = {
            api_key: apiKey,
        }

        request.url = request.url?.replace("{version}", version);

        return request;
    });

    client.interceptors.response.use((response) => {
        response.data = {
            headers: response.headers,
            statusCode: response.status,
            statusText: response.statusText,
            body: response.data,
        }

        return response;
    });

    return client;
}

export {
    httpClientInit,
};
