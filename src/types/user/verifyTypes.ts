// 아이디 중복 체크 요청 인터페이스
export interface ReqCheckIdDTO {
    loginId: string;
}

// 아이디 중복 체크 응답 인터페이스
export interface ResCheckIdDTO {
    loginId: string;
}

// 휴대폰 본인인증 요청 인터페이스
export interface ReqSmsCodeDTO {
    originPhone: string;
    checkCode: string;
}

export interface SmsDTO {
    receiver: string;
}
