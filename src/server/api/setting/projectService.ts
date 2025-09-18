import { apiClient } from "@/server/api/client.ts";

import type { PageResponse } from "@/types/cmmn.ts";
import type { ResProjectListDTO, ReqProjectListDTO, ReqProjectDTO }  from "@/types/setting/projectTypes.ts";

export const projectList = async (
    companyId: number
): Promise<ResProjectListDTO[]> => {

    const response
         = await apiClient.get<ResProjectListDTO[]>(
            '/api/setting/project/list',
            { params: companyId }
         );

    return response ?? [];
};

export const fetchAdminProjectList = async (
    reqDTO: ReqProjectListDTO
): Promise<PageResponse<ResProjectListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResProjectListDTO>>(
            '/api/setting/project/admin-list',
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

export const saveProject = async (
    reqDTO: ReqProjectDTO
): Promise<void> => {
    await apiClient.post('/api/setting/project/create', reqDTO);
};