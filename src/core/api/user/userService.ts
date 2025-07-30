import { apiClient } from "@/core/api/client.ts";

import type { PageResponse } from "@/types/cmmn.ts";
import type { ReqUserDTO, ReqUserListDTO, ResUserListDTO } from "@/types/user/userTypes.ts";

export const adminUserList
    = async (data: ReqUserListDTO): Promise<PageResponse<ResUserListDTO>> => {

    const response
        = await apiClient.post<PageResponse<ResUserListDTO>>('/api/user/list', data);

    return response;
};

export const saveUser
    = async (data: ReqUserDTO): Promise<void> => {

    await apiClient.post('/api/user/create', data);
};