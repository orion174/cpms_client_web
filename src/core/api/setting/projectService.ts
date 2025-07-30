import { apiClient } from "@/core/api/client.ts";
import type { PageResponse } from "@/types/cmmn.ts";
import type { ResProjectListDTO, ReqProjectListDTO, ReqProjectDTO }  from "@/types/admin/projectTypes.ts";

export const projectList
    = async (data: number): Promise<ResProjectListDTO[]> => {

    const response
     = await apiClient.get<ResProjectListDTO[]>(
        '/api/setting/project/list'
        , { params: data}
    );

    return response;
};

export const fetchAdminProjectList = async (
    request: ReqProjectListDTO
): Promise<PageResponse<ResProjectListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResProjectListDTO>>(
            '/api/setting/project/admin-list',
            { params: request }
        );

    return response;
};

export const saveProject = async (data: ReqProjectDTO): Promise<void> => {
    await apiClient.post('/api/setting/project/create', data);
};