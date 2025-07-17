import { apiClient } from "@/core/api/client.ts";
import { PageResponse } from "@/definition/common.types.ts";
import { ResCompanyListDTO, ReqCompanyListDTO, ReqCompanyDTO } from "@/definition/company.types.ts";

export const fetchAdminCompanyList = async (
    request: ReqCompanyListDTO
): Promise<PageResponse<ResCompanyListDTO>> => {
    const response
        = await apiClient.get<PageResponse<ResCompanyListDTO>>(
        `/api/setting/company/admin-list`
            , { params: request }
        );

    return response;
};

export const saveCompany = async (data: ReqCompanyDTO): Promise<void> => {
    await apiClient.post(`/api/setting/company/create`, data);
};

export const updateCompany = async (data: ReqCompanyDTO): Promise<void> => {
    await apiClient.post(`/api/setting/company/update`, data);
};