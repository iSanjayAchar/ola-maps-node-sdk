export type IBaseResponse<T = {}> = {
    headers: Record<string, string>;
    statusCode: number;
    statusText: string;
    body: T;
}

export type IPlacesAutoCompleteResult = {
    error_message: string;
    info_messages: string[];
    status: string;
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
