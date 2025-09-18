import { apiClient } from "@/server/api/client.ts";

import type { PageResponse } from "@/types/cmmn.ts";
import type { ResCompanyListDTO, ReqCompanyListDTO, ReqCompanyDTO } from "@/types/setting/companyTypes.ts";

export const companyList = async (
    companyId: number
): Promise<ResCompanyListDTO[]> => {

    const response
        = await apiClient.get<ResCompanyListDTO[]>(
        '/api/setting/company/list',
        { params: companyId }
    );

    return response ?? [];
};

export const adminCompanyList = async (
    reqDTO: ReqCompanyListDTO
): Promise<PageResponse<ResCompanyListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResCompanyListDTO>>(
        '/api/setting/company/admin-list',
            { params: reqDTO }
        );

    return response ?? {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
    };
};

export const saveCompany = async (
    reqDTO: ReqCompanyDTO
): Promise<void> => {
    await apiClient.post('/api/setting/company/create', reqDTO);
};