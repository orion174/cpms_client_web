import axios from 'axios';

import { safeRequest } from '@/server/api/axiosHandler';
import type { ApiResponse } from "@/types/cmmn.ts";
import type { ResCheckIdDTO, ReqCheckIdDTO, ReqSmsCodeDTO, SmsDTO, ReqRegisterDTO } from "@/types/user/verifyTypes.ts";

export const idCheck = async (
    data: ReqCheckIdDTO
): Promise<ApiResponse<ResCheckIdDTO>> => {
    const url = `${import.meta.env.VITE_API_URL}/api/user/verify/id-check`;

    return await safeRequest<ResCheckIdDTO>(
        axios.post<ApiResponse<ResCheckIdDTO>>(
            url, data,
            { headers: { 'Content-Type': 'application/json' } }
        )
    );
};

// 서버에서 data를 보내지않음.
// <null>을 쓰면 res.data가 항상 null이어야 한다는 계약이 생기는데, 서버가 아예 안 내려주므로 void가 더 자연스러움.
export const identityCode = async (
    data: ReqSmsCodeDTO
): Promise<ApiResponse<void>> => {
    const url = `${import.meta.env.VITE_API_URL}/api/user/verify/identity-code`;

    return await safeRequest(
        axios.post<ApiResponse<void>>(url, data)
    );
};

export const sendSms = async (
    data: SmsDTO
): Promise<ApiResponse<void>> => {
    const url = `${import.meta.env.VITE_API_URL}/api/user/verify/send-sms`;

    return await safeRequest(
        axios.post<ApiResponse<void>>(url, data)
    );
};

export const registerUser = async (
    data: ReqRegisterDTO
): Promise<ApiResponse<void>> => {
    const url = `${import.meta.env.VITE_API_URL}/api/user/verify/register`;

    return await safeRequest(
        axios.post<ApiResponse<void>>(url, data)
    );
};
