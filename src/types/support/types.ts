/* 📁 support interface */

// 프로젝트 유지보수 문의 인터페이스
export interface ResSupportListDTO {
    totalCnt: number;
    supportList: SupportList[];
    authType: string;
}

// 문의 리스트 인터페이스
export interface SupportList {
    supportRequestId: number;
    userCompanyNm: string;
    requestProjectNm: string;
    responseUserNm: string;
    requestCd: number;
    requestNm: string;
    statusCd: number;
    statusNm: string;
    requestDate: string;
    supportTitle: string;
    regDt: string;
}

// 문의 리스트 요청 인터페이스
export interface ReqSupportListDTO {
    pageNo: number;
    pageSize: number;
    searchCompanyId: number;
    searchRequestCd: number;
    searchStatusCd: number;
    searchStartDt: string;
    searchEndDt: string;
    searchTitle: string;
};

// 문의 등록 인터페이스
export interface ReqSupportDTO {
    requestCompanyId: number;
    requestProjectId: number;
    requestCd: number;
    statusCd: number;
    supportTitle: string;
    requestDate: string;
};

// 문의 상세 조회 인터페이스
export interface ResSupportViewDTO {
    authType: string;
    supportRequestId: number;
    requestCompanyNm: string;
    userCompanyNm: string;
    requestProjectNm: string;
    responseUserNm: string;
    requestCd: number;
    requestNm: string;
    statusCd: number;
    statusNm: string;
    requestDate: string;
    responseDate: string;
    supportTitle: string;
    supportEditor: string;
    supportResponse : supportResponse | null;
    fileList: supportFileList[];
}

// 문의 응답 인터페이스
export interface supportResponse {
    supportResponseId: number;
    responseTitle: string;
    responseEditor: string;
}

// 첨부 파일 인터페이스
export interface supportFileList {
    supportFileId: number;
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
    fileCategory : string;
}

// 문의 응답 저장 인터페이스
export interface ReqSupportResponse {

}
