// __tests__/index.test.ts

import * as index from "../src/index";
import * as places from "../src/places";

describe("index.ts re-exports", () => {
    it("should re-export everything from places", () => {
        // Check if all exports from 'places' exist in 'index'
        for (const key in places) {
            if (Object.hasOwnProperty.call(places, key)) {
                expect(index).toHaveProperty(key);
            }
        }
    });
});
