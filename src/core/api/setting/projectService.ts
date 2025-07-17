import { apiClient } from "@/core/api/client.ts";
import { PageResponse } from "@/definition/common.types.ts";
import { ResProjectListDTO, ReqProjectListDTO, ReqProjectDTO } from "@/definition/project.types.ts";

export const fetchAdminProjectList = async (
    request: ReqProjectListDTO
): Promise<PageResponse<ResProjectListDTO>> => {
    const response = await apiClient.get<PageResponse<ResProjectListDTO>>(
        `/api/setting/project/admin-list`
        , { params: request }
    );

    return response;
};

export const saveProject = async (data: ReqProjectDTO): Promise<void> => {
    await apiClient.post(`/api/setting/project/create`, data);
};