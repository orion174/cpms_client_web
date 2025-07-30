import axios, { AxiosResponse } from 'axios';
import { safeRequest } from '@/core/api/axiosHandler';
import type { ApiResponse } from "@/types/cmmn.ts";
import type { ResCheckIdDTO, ReqCheckIdDTO, ReqSmsCodeDTO, SmsDTO } from "@/types/user/verifyTypes.ts";

export const idCheck
    = async (data: ReqCheckIdDTO): Promise<ApiResponse<ResCheckIdDTO>> => {

    return await safeRequest(
        axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/verify/id-check`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
    );
};

export const identityCode
    = async (data: ReqSmsCodeDTO): Promise<AxiosResponse<ApiResponse>> => {

    return await axios.post<ApiResponse>(
        `${import.meta.env.VITE_API_URL}/api/user/verify/identity-code`,
        data
    );
};

export const sendSms = async (data: SmsDTO): Promise<ApiResponse> => {

    return await safeRequest(
        axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/verify/send-sms`,
            data
        )
    );
};
