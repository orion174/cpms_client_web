// 사용자 목록 데이터 응답 인터페이스
export interface ResUserListDTO {
    userId: number;
    authType: string;
    companyNm: string;
    userNm: string;
    userDept: string;
    userPos: string;
    useYn: string;
};

// 사용자 목록 데이터 요청 인터페이스
export interface ReqUserListDTO {
    pageNo: number;
    pageSize: number;
    seachCompanyId: number;
    searchAuthType: string;
    searchUseYn: string;
    searchUserNm: string;
};

// 검색 기본값
export const defaultUserListParams = (): ReqUserListDTO => ({
    pageNo: 1,
    pageSize: 10,
    seachCompanyId: 0,
    searchAuthType: "",
    searchUseYn: "",
    searchUserNm: "",
});