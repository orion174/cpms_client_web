import axios from 'axios';

import { apiClient  } from "@/server/api/client";
import { safeRequest } from '@/server/api/axiosHandler';

import type { ApiResponse } from "@/types/cmmn.ts";
import type { ReqLoginDTO, ResLoginDTO, ResAuthDTO } from "@/types/auth/types.ts";

export const userLogin
    = async (reqDTO: ReqLoginDTO): Promise<ApiResponse<ResLoginDTO>> => {

    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;

	return safeRequest<ResLoginDTO>(
		axios.post<ApiResponse<ResLoginDTO>>(
            url, reqDTO,
			{ headers: { 'Content-Type': 'application/json' }, withCredentials: true,}
		)
	);
};

export const cpmsAuthList = async (): Promise<ResAuthDTO[]> => {
    const response
        = await apiClient.get<ResAuthDTO[]>('/api/auth/list');

    return response ?? [];
};
