import axios, { AxiosResponse } from 'axios';

import useModalHook from '@/hooks/useModal';
import type { ApiResponse } from '@/types/cmmn';

interface SafeError {
    errorCode: string;
    message: string;
};

export const safeRequest
    = async <T>(promise: Promise<AxiosResponse<ApiResponse<T>>>): Promise<ApiResponse<T>> => {

    const { openErrorModal } = useModalHook();

    try {
        const response = await promise;
        return response.data;

    } catch (error: unknown) {
        let finalError: SafeError;

        if (axios.isAxiosError(error)) {
            const errData = error.response?.data;

            finalError = {
                errorCode: errData?.errorCode ?? '0000',
                message: errData?.message ?? '오류가 발생했습니다.'
            };
        } else {
            finalError = {
                errorCode: '0000',
                message: '예상치 못한 오류가 발생했습니다.'
            };
        }

        openErrorModal({
            errorCode: finalError.errorCode,
            message: finalError.message
        });

        throw finalError;
    }
};
