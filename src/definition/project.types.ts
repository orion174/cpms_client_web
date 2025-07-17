// CPMS 관리 프로젝트 응답 인터페이스
export interface ResProjectListDTO {
    projectId: number;
    companyNm: string;
    projectNm: string;
    projectInfo: string;
    progressYn: string;
    regDt: string;
};

// CPMS 관리 프로젝트 요청 인터페이스
export interface ReqProjectListDTO {
    pageNo: number;
    pageSize: number;
    companyId: number;
    projectNm: string;
    progressYn: string;
};

export interface ReqProjectDTO {
    companyId: number;
    projectNm: string;
    projectInfo: string;
};

export const defaultProjectListParams = (): ReqProjectListDTO => ({
    pageNo: 1,
    pageSize: 10,
    companyId: 0,
    progressYn: "",
    projectNm: ""
});

export const getInitProject = (): ReqProjectDTO => ({
    companyId: 0
    , projectNm: ''
    , projectInfo: ''
});