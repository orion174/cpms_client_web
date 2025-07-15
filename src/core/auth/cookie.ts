/* 📁 cookie.ts */
import axios from 'axios';

// 쿠키 삭제
export const deleteCookie = async (): Promise<void> => {
    try {
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/cookie/delete`
            , null
            , { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
    } catch (error) {
        console.error('deleteCookie error: ', error);
    }
};