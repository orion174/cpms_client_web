declare global {
    /* 주소 데이터 타입 */
    interface AddressData {
        zonecode: string;
        address: string;
        // 필요 시 추가 필드 정의
    }

    /* Daum 우편번호 서비스 옵션 인터페이스 */
    interface DaumPostcodeOptions {
        oncomplete?: (data: AddressData) => void;
        // 필요 시 추가 옵션 정의
    }

    /* Daum 네임스페이스 선언 */
    namespace daum {
        class Postcode {
            constructor(options: DaumPostcodeOptions);
            open(): void;
            close(): void;
            // 필요 시 추가 메서드 정의
        }
    }

    /* Window 인터페이스 확장 */
    interface Window {
        daum: typeof daum;
    }
}

export {};