import { apiClient } from "@/core/api/client.ts";
import type { PageResponse } from "@/types/cmmn.ts";
import type { ResCompanyListDTO, ReqCompanyListDTO, ReqCompanyDTO } from "@/types/admin/companyTypes.ts";

export const companyList
    = async (data: number): Promise<ResCompanyListDTO[]> => {

    const response
        = await apiClient.get<ResCompanyListDTO[]>(
        '/api/setting/company/list'
        , { params: data }
    );

    return response;
};

export const adminCompanyList
    = async (data: ReqCompanyListDTO): Promise<PageResponse<ResCompanyListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResCompanyListDTO>>(
        '/api/setting/company/admin-list'
            , { params: data }
        );

    return response;
};

export const saveCompany
    = async (data: ReqCompanyDTO): Promise<void> => {

    await apiClient.post('/api/setting/company/create', data);
};