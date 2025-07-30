/* 📁 공통 인터페이스 */

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

// 공통 코드 인터페이스
export interface ResCmmnCodeDTO {
    codeId: number;
    codeNm: string;
}

// 파일 공통 인터페이스
export interface FileList {
    [key: string]: any;
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
}

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