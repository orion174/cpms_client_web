/* 📁 common.types */

// API 응답 인터페이스
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message: string;
    errorCode?: string;
}

export interface PageResponse<T = any> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
}

// 리프레쉬 토큰 응답 인터페이스
export interface ResRefreshTokenDTO {
    accessToken: string;
    accessTokenExpiration: number;
}

// 로그인 응답 인터페이스
export interface ResLoginDTO {
    authType: string;
    loginHistoryId: number;
    userId: number;
    userNm: string;
    companyId: number;
    loginId: string;
    loginPw: string;
    useYn: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
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

// 공통 코드 목록 인터페이스
export interface ResCommonCodeDTO {
    codeId: number;
    codeNm: string;
}

// CPMS 업체 목록 인터페이스
export interface ResCompanyDTO {
    companyId: number;
    companyNm: string;
}

// CPMS 프로젝트 목록 인터페이스
export interface ResProjectDTO {
    projectId: number;
    projectNm: string;
}
