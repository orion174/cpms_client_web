import axios, { AxiosResponse } from 'axios';
import { ApiResponse, HttpError } from '@/types/cmmn';

export const safeRequest
    = async <T>(promise: Promise<AxiosResponse<ApiResponse<T>>>): Promise<ApiResponse<T>> => {
    try {
        const response = await promise;
        return response.data;

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;

            // 서버가 주는 에러 포맷이 문자열/객체 섞일 수 있으니 안전하게 파싱
            const payload = err.response?.data as Partial<ApiResponse<never>> | string | undefined;

            let code = '0000';
            let message = '오류가 발생했습니다.';

            if (typeof payload === 'object' && payload !== null) {
                code = (payload.errorCode as string) ?? code;
                message = (payload.message as string) ?? message;

            } else if (typeof payload === 'string') {
                message = payload;

            } else if (status) {
                message = `HTTP ${status} 오류가 발생했습니다.`;
            }

            throw new HttpError(message, code, status);
        }

        throw new HttpError('예상치 못한 오류가 발생했습니다.');
    }
};
