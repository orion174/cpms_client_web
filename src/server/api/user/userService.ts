import { apiClient } from "@/server/api/client.ts";

import type { PageResponse } from "@/types/cmmn.ts";
import type { ReqUserDTO, ReqUserListDTO, ResUserListDTO } from "@/types/user/userTypes.ts";

export const adminUserList = async (
    data: ReqUserListDTO
): Promise<PageResponse<ResUserListDTO>> => {

    const response
        = await apiClient.get<PageResponse<ResUserListDTO>>(
            '/api/user/list',
            { params: data }
        );

    return response ?? {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
    };
};

export const saveUser = async (
    data: ReqUserDTO
): Promise<void> => {
    await apiClient.post('/api/user/create', data);
};