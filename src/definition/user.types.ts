// 사용자 목록 데이터 응답 인터페이스
export interface ResUserListDTO {
    userId: number;
    authType: string;
    companyNm: string;
    userNm: string;
    userDept: string;
    userPos: string;
    regDt: string;
    useYn: string;
};

// 사용자 목록 데이터 요청 인터페이스
export interface ReqUserListDTO {
    pageNo: number;
    pageSize: number;
    searchCompanyId: number;
    searchAuthType: string;
    searchUseYn: string;
    searchUserNm: string;
};

// CPMS 사용자 등록 인터페이스
export interface ReqUserDTO {
    loginId: string;
    userNm: string;
    authType: string;
    userPhone: string;
    userEmail: string;
    companyId: number;
    userDept: string;
    userPos: string;
    userInfo: string;
    userNote: string;
};

// 검색 초기값
export const defaultUserListParams = (): ReqUserListDTO => ({
    pageNo: 1,
    pageSize: 10,
    searchCompanyId: 0,
    searchAuthType: "",
    searchUseYn: "",
    searchUserNm: "",
});

// 계정 등록 초기값
export const getInitUser = (): ReqUserDTO => ({
    loginId: '',
    userNm: '',
    authType: '',
    userPhone: '',
    userEmail: '',
    companyId: 0,
    userDept: '',
    userPos: '',
    userInfo: '',
    userNote: '',
});