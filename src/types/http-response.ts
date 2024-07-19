export type IBaseResponse<T = null> = {
    headers: Record<string, string>;
    statusCode: number;
    statusText: string;
    body: T;
}

type IStatus = "ok" | "zero_result" | "bad_request";
type IPlusCode = {
    compound_code: string;
    global_code: string;
}

export type IPlacesAutoCompleteResult = {
    error_message: string;
    info_messages: string[];
    status: "ok"; // for some reasons, this API doesn't return zero_result or bad_request according to their documentation
    predictions: Array<{
        place_id: string;
        geometry: {
            location: {
                lng: number;
                lat: number;
            };
        };
        description: string;
        structured_formatting: {
            main_text: string;
            secondary_text: string;
            main_text_matched_substrings: Array<{
                offset: number;
                length: number;
            }>
        };
        terms: Array<{
            offset: number;
            value: string;
        }>;
        distance_meters: number;
        matched_substrings: Array<{
            offset: number;
            length: number;
        }>;
        types: Array<string>;
        reference: string;
    }>;
};

export type IGeocodingResult = {
    status: IStatus;
    request_id?: string;
    geocodingResults: Array<{
        formatted_address: string;
        types: Array<string>;
        name: string;
        geometry: {
            viewport: {
                southwest: {
                    lng: number;
                    lat: number;
                },
                northeast: {
                    lng: number;
                    lat: number;
                }
            },
            location_type: string;
        },
        address_components: Array<{
            types: Array<string>;
            short_name: string;
            long_name: string;
        }>;
        plus_code: IPlusCode,
        place_id: string;
        layer: Array<string>;
    }>;
};

export type IReverseGeocodingResult = {
    status: IStatus;
    plus_code: IPlusCode;
    request_id?: string;
    error_message: string;
    info_messages: Array<string>;
    results: Array<{
        formatted_address: string;
        types: Array<string>;
        name: string;
        geometry: {
            viewport: {
                southwest: {
                    lng: number;
                    lat: number;
                },
                northeast: {
                    lng: number;
                    lat: number;
                }
            },
            location: {
                lng: number;
                lat: number;
            };
        };
        address_components: Array<{
            types: string;
            short_name: string;
            long_name: string;
        }>;
        plus_code: IPlusCode;
        place_id: string;
        layer: Array<string>;
    }>;
};

export type IDirectionResult = {
    status: IStatus;
    source_from: string;
    geocoded_waypoints: Array<{
        geocoder_status: IStatus;
        place_id: string;
        types: Array<string>;
    }>;
    routes: Array<{
        bounds: Record<string, string | number>;
        copyrights: string;
        legs: Array<{
            distance: number;
            readable_distance: string;
            duration: string;
            readable_duration: string;
            start_address: string;
            end_address: string;
            start_location: {
                lat: number;
                lng: number;
            };
            end_location: {
                lat: number;
                lng: number;
            };
            steps: Array<{
                distance: number;
                readable_distance: string;
                duration: number;
                readable_duration: string;
                start_location: {
                    lat: number;
                    lng: number;
                };
                end_location: {
                    lat: number;
                    lng: number;
                };
                instructions: string;
                maneuver: string;
                bearing_before: number;
                bearing_after: number;
            }>
        }>;
        overview_polyline: string;
        travel_advisory: string;
        summary: string;
        warnings: Array<string>;
        waypoint_order: Record<string, string>;
    }>;
};
