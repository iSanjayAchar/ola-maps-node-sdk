export type IBaseResponse<T = {}> = {
    headers: Record<string, string>;
    statusCode: number;
    statusText: string;
    body: T;
}

type IStatus = "ok" | "zero_result";

export type IPlacesAutoCompleteResult = {
    error_message: string;
    info_messages: string[];
    status: IStatus;
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
        plus_code: {
            compound_code: string;
            global_code: string;
        },
        place_id: string;
        layer: Array<string>;
    }>;
};
