/* 📁 cookie.ts */
import axios from 'axios';

import { ApiResponse, ResCookieDTO } from '@/definition/common.types';
const API_URL = import.meta.env.VITE_API_URL;

// ✅ 쿠키 조회
export const getCookie = async (key?: string): Promise<Record<string, string> | string | null> => {
    try {
        const endPoint = `${API_URL}/api/cookie/get`;

        const response = await axios.post<ApiResponse<ResCookieDTO>>(
            endPoint,
            null,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        const cookies = response.data?.data?.cookies ?? {};

        return key ? cookies[key] ?? null : cookies;
    } catch (error) {
        console.error('getCookie error:', error);
        return null;
    }
};

// ✅ 전체 쿠키 삭제
export const deleteCookie = async (): Promise<void> => {
    try {
        const endPoint = `${API_URL}/api/cookie/delete`;

        await axios.post(
            endPoint,
            null,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    } catch (error) {
        console.error('deleteCookie error:', error);
    }
};