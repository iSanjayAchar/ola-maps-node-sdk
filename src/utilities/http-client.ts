import axios from "axios";

/**
 * Initializes an Axios HTTP client with default configurations for making API requests.
 *
 * @param apiKey - The API key to use for authentication with the API.
 * @returns An Axios instance configured with base URL, headers, and response formatting.
 *
 * @remarks
 * This function assumes the following environment variables are set:
 *   - `process.env.baseUrl`: The base URL of the API.
 *   - `process.env.API_VERSION`: The version of the API.
 *
 * The client is configured with the following:
 *   - Base URL set to `process.env.baseUrl`.
 *   - Request interceptor to add:
 *     - `Accept` header: "application/json"
 *     - `Content-Type` header: "application/json"
 *     - `api_key` query parameter
 *     - Replaces `{version}` placeholder in the URL with the value from `process.env.API_VERSION`.
 *   - Response interceptor to reformat the response data to include headers, status code, status text, and the original response body.
 */
function httpClientInit(apiKey: string) {
    const baseURL = process.env.baseUrl as string;
    const version = process.env.API_VERSION as string;

    const client = axios.create({
        baseURL,
    });

    /**
     * Axios request interceptor to modify outgoing requests.
     *
     * This interceptor performs the following actions on each request:
     *
     * 1. Sets the `Accept` header to "application/json" to indicate that the client expects JSON responses.
     * 2. Sets the `Content-Type` header to "application/json" to inform the server that the request body is in JSON format.
     * 3. Adds an `api_key` query parameter to the request URL with the value provided in the `apiKey` argument.
     * 4. Replaces the placeholder `{version}` in the request URL with the actual API version from the `version` variable.
     *
     * @param request - The Axios request configuration object.
     * @returns The modified request configuration object.
     */
    client.interceptors.request.use((request) => {
        request.headers.Accept = "application/json";
        request.headers["Content-Type"] = "application/json";
        request.params = {
            api_key: apiKey,
        };

        request.url = request.url?.replace("{version}", version);

        return request;
    });

    /**
     * Axios response interceptor to modify incoming responses.
     *
     * This interceptor restructures the response data to include:
     *
     *   - `headers`: The response headers from the server.
     *   - `statusCode`: The HTTP status code of the response (e.g., 200 for success).
     *   - `statusText`: The HTTP status text corresponding to the status code (e.g., "OK" for 200).
     *   - `body`: The original response data returned by the server.
     *
     * This restructuring provides a consistent format for response data, regardless of the specific API endpoint.
     *
     * @param response - The Axios response object.
     * @returns The modified response object with the restructured data.
     */
    client.interceptors.response.use((response) => {
        response.data = {
            headers: response.headers,
            statusCode: response.status,
            statusText: response.statusText,
            body: response.data,
        };

        return response;
    });

    return client;
}

export {
    httpClientInit,
};
