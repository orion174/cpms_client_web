/* 📁 공통 인터페이스 */

// API 응답 인터페이스
export interface ApiResponse<T = void> {
    success: boolean;
    data: T | null;
    message: string;
    errorCode?: string;
}

// 페이징 인터페이스
export interface PageResponse<T> {
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

export class HttpError extends Error {
    code: string;
    status?: number;

    constructor(message: string, code = '0000', status?: number) {
        super(message);
        this.name = 'HttpError';
        this.code = code;
        this.status = status;
    }
}
