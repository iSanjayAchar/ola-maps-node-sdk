// __tests__/const.test.ts
import {ENV} from "../src/const";

describe("ENV constants", () => {
    it("should have the correct structure for v1", () => {
        const v1Env = ENV.v1;

        expect(v1Env).toHaveProperty("baseUrl", "https://api.olamaps.io");
        expect(v1Env).toHaveProperty("autoCompletePath", "/places/{version}/autocomplete");
    });
});
