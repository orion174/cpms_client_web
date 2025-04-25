/* 📁 common interface */

// API 응답 인터페이스
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errorCode?: string;
}

// 로그인 응답 인터페이스
export interface ResLoginDTO {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    authType: string;
    loginHistoryId: number;
    userId: number;
    companyId: number;
    loginId: string;
    loginPw: string;
    useYn: string;
    option: string;
}

// Jwt 토큰 인터페이스
export interface JwtDto {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    authType: string;
    loginHistoryId: number;
    userId: number;
    companyId: number;
    loginId: string;
    loginPw: string;
}

// 파일 인터페이스
export interface ExistingFileItem {
    id: number,
    name: string,
    isNew: false;
}

// 업로드 첨부파일 인터페이스
export interface NewFileItem  {
    id: number;
    file?: File;
    name: string;
    isNew: boolean;
}

export type FileItem = ExistingFileItem | NewFileItem;

// 공통 코드 인터페이스
export interface ResCommonCodeDTO {
    codeId: number;
    codeNm: string;
}
