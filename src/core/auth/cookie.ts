/* 📁 cookie.ts */
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

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