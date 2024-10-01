/* 전화번호 형식 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.startsWith('02') && phoneNumber.length === 10) {
        // 02로 시작하는 번호 (예: 02-1234-5678)
        return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phoneNumber.length === 11 && phoneNumber.startsWith('010')) {
        // 010으로 시작하는 번호 (예: 010-1234-5678)
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phoneNumber.length === 11 && /^[0-9]{3}/.test(phoneNumber)) {
        // 대한민국 지역번호로 시작하는 11자리 번호 (예: 031-123-4567)
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (phoneNumber.length === 10 && /^[0-9]{3}/.test(phoneNumber)) {
        // 대한민국 지역번호로 시작하는 10자리 번호 (예: 031-1234-5678)
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        // 예외 처리: 잘못된 형식의 전화번호
        return phoneNumber;
    }
};