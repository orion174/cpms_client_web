import { apiClient } from "@/core/api/client.ts";
import type { PageResponse } from "@/types/cmmn.ts";
import type { ResCompanyListDTO, ReqCompanyListDTO, ReqCompanyDTO } from "@/pages/admin/setting/company/types.ts";

export const fetchAdminCompanyList
    = async (request: ReqCompanyListDTO): Promise<PageResponse<ResCompanyListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResCompanyListDTO>>(
        '/api/setting/company/admin-list'
            , { params: request }
        );

    return response;
};

export const saveCompany = async (data: ReqCompanyDTO): Promise<void> => {
    await apiClient.post('/api/setting/company/create', data);
};