// CPMS 회사 리스트 응답 인터페이스
export interface ResCompanyListDTO {
    companyId: number;
    authType: string;
    companyNm: string;
    address: string;
    useYn: string;
    regDt: string;
};

// CPMS 회사 리스트 요청 인터페이스
export interface ReqCompanyListDTO {
    pageNo: number;
    pageSize: number;
    companyNm: string;
    useYn: string;
};

// CPMS 업체 등록(수정) 인터페이스
export interface ReqCompanyDTO {
    authType: string;
    companyNm: string;
    zipCode: string;
    address: string;
    extraAddress: string;
    homepage: string;
    companyInfo: string;
    adminNote: string;
};

// 회사 리스트 검색 초기값
export const defaultCompanyListParams = (): ReqCompanyListDTO => ({
    pageNo: 1,
    pageSize: 10,
    companyNm: "",
    useYn: ""
});

export const getInitCompany = (): ReqCompanyDTO => ({
    authType: 'USER',
    companyNm: '',
    zipCode: '',
    address: '',
    extraAddress: '',
    homepage: '',
    companyInfo: '',
    adminNote: ''
});
