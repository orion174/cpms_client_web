import axios, { AxiosResponse } from 'axios';
import type { ApiResponse, ReqLoginDTO, ResLoginDTO } from '@/types/cmmn';

export const userLogin
	= async (data: ReqLoginDTO): Promise<AxiosResponse<ApiResponse<ResLoginDTO>>> => {

	return await axios.post<ApiResponse<ResLoginDTO, ReqLoginDTO>>(
		`${import.meta.env.VITE_API_URL}/api/auth/login`,
		data,
		{
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}
	);
};
