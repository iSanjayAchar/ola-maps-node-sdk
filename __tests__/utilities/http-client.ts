// __tests__/http-client.test.ts
import {AxiosInstance} from "axios";
import {httpClientInit} from "../../src/utilities/http-client";
import * as nock from "nock";

describe("httpClientInit", () => {
    let client: AxiosInstance;

    beforeAll(() => {
        process.env.baseUrl = "https://api.example.com";
        process.env.API_VERSION = "v1";
        client = httpClientInit("test_api_key"); // Initialize client with a test API key
    });

    afterAll(() => {
        nock.cleanAll(); // Clean up nock intercepts
    });

    it("should add headers and params to the request", async () => {
        const scope = nock("https://api.example.com")
            .get("/test")
            .query({api_key: "test_api_key"})
            .reply(200, {data: "ok"});

        const response = await client.get("/test");

        console.log(scope);
        console.log(response);
        expect(scope.isDone()).toBe(true);
    });
});
