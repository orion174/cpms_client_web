declare global {

    interface AddressData {
        zonecode: string;
        address: string;
    }

    interface DaumPostcodeOptions {
        oncomplete?: (data: AddressData) => void;
    }

    namespace daum {
        class Postcode {
            constructor(options: DaumPostcodeOptions);
            open(): void;
            close(): void;
        }
    }

    interface Window {
        daum: typeof daum;
    }
}

export {};