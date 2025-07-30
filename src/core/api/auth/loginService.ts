import axios from 'axios';
import { safeRequest } from '@/core/api/axiosHandler';

import type { ApiResponse } from "@/types/cmmn.ts";
import type { ReqLoginDTO, ResLoginDTO } from "@/types/auth/types.ts";

export const userLogin
	= async (data: ReqLoginDTO): Promise<ApiResponse<ResLoginDTO>> => {

	return await safeRequest(
		axios.post(
			`${import.meta.env.VITE_API_URL}/api/auth/login`,
			data,
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true
			}
		)
	);
};

