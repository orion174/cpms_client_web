/* 📁 cookie.ts */
import axios from 'axios';

import { safeRequest } from '@/server/api/axiosHandler';
import type { ApiResponse } from "@/types/cmmn.ts"

// 쿠키 삭제
export const deleteCookie = async (): Promise<ApiResponse<void>> => {
    const url = `${import.meta.env.VITE_API_URL}/api/cookie/delete`;

    return await safeRequest(
        axios.post<ApiResponse<void>>(
            url,
            null,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
    )
};

export const clearCookie = () => {
    sessionStorage.clear();

    deleteCookie().finally((): void => {
        window.location.replace('/auth/login');
    });
};