import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { jwtDecode } from 'jwt-decode';
import { clearCookie } from "@/core/certification/cookie.ts";

interface JwtPayload {
    authType: string;
    [key: string]: any;
}

// 로그아웃
export const logOut = (): void => {
    clearCookie();
};

// 사용자 정보 조회
export const getUserAuthInfo = (): { authType: string; loginId: string } | null => {

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const { authType, loginId } = decoded;

        return authType && loginId ? { authType, loginId } : null;

    } catch (e) {
        console.error('JWT 디코딩 실패:', e);
        return null;
    }
};

// 사용자 권한 조회
export const getUserAuthType = async (): Promise<string | null> => {

    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        return decoded.authType ?? null;

    } catch (e) {
        console.error("JWT 디코딩 실패:", e);
        return null;
    }
};

export const isBase64 = (str: string): boolean => {
    if (!str || str.trim() === "") return false;
    if (str.length % 4 !== 0) return false;

    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

    return base64Regex.test(str);
};

export const utf8ToBase64 = (value: string | number): string => {

    return btoa(
        encodeURIComponent(value.toString())
            .replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)))
    );
};

export const base64ToUtf8 = (base64Value: string): string => {

    return decodeURIComponent(
        atob(base64Value)
            .split('')
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
            .join('')
    );
};

export const handleInputKeyDown = async (
    event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    func: () => Promise<void>
): Promise<void> => {

    if (event?.key === 'Enter') {
        await func();
    }
};

export const isValidHtmlContent = (html: string | undefined | null): boolean => {

    if (!html) return false;

    // 텍스트 기반 콘텐츠 확인
    const strippedContent = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
    if (strippedContent.length > 0) return true;

    // 이미지 태그(<img>)가 있는지 확인
    const hasImage = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/i.test(html);
    if (hasImage) return true;

    return false;
};