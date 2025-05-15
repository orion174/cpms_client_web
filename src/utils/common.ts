import React, {DetailedHTMLProps, InputHTMLAttributes } from "react";
import { jwtDecode } from 'jwt-decode';

import { getCookie, deleteCookie } from "@/core/auth/cookie.ts";

interface JwtPayload {
    authType: string;
    [key: string]: any;
}

// 로그아웃
export const logOut = async () => {
    await deleteCookie();
    window.location.href = '/auth/login';
};

// 사용자 정보 조회
export const getUserAuthInfo = async (): Promise<{ authType: string; loginId: string } | null> => {
    const cookies = await getCookie() as Record<string, string | undefined>;
    const accessToken = cookies?.accessToken;

    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const authType = decoded.authType ?? null;
        const loginId = decoded.loginId ?? null;

        if (!authType || !loginId) return null;

        return { authType, loginId };
    } catch (e) {
        console.error("JWT 디코딩 실패:", e);
        return null;
    }
};

// 사용자 권한 조회
export const getUserAuthType = async (): Promise<string | null> => {
    const cookies = await getCookie() as Record<string, string | undefined>;
    const accessToken = cookies?.accessToken;

    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        return decoded.authType ?? null;
    } catch (e) {
        console.error("JWT 디코딩 실패:", e);
        return null;
    }
};

export const tokenError = () => {
    deleteCookie().then(() => {
        window.location.href = '/auth/login';
    });
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

export const base64ToInteger = (base64Value: string): number => {
    const utf8String = base64ToUtf8(base64Value);
    const parsedInt = parseInt(utf8String, 10);

    if (isNaN(parsedInt)) {
        throw new Error(`Invalid Base64 value: ${base64Value}`);
    }

    return parsedInt;
};

export const clearErrorOnInput = (
    event : React.ChangeEvent<HTMLInputElement>
    , setError : React.Dispatch<React.SetStateAction<boolean>>
) => {
    if(event.target.value.trim() !== '') {
        setError(false);
    }
}

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