import React, {DetailedHTMLProps, InputHTMLAttributes } from "react";

export const isBase64 = (str: string): boolean => {
    if (!str || str.trim() === "") return false;

    if (str.length % 4 !== 0) return false;

    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(str);
};

export const utf8ToBase64 = (str: string): string => {
    return btoa(unescape(encodeURIComponent(str)));
}

export const base64ToUtf8 = (str: string): string => {
    return decodeURIComponent(escape(atob(str)));
}

/*
 * 공백 유효성
 * @param event
 * @param setError
 */
export const clearErrorOnInput = (
    event : React.ChangeEvent<HTMLInputElement>
    , setError : React.Dispatch<React.SetStateAction<boolean>>
) => {
    if(event.target.value.trim() !== '') {
        setError(false);
    }
}

/*
 * 엔터 키 이벤트
 * @param event
 * @param func
 */
export const handleInputKeyDown = async (
    event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    func: () => Promise<void>
): Promise<void> => {
    if (event?.key === 'Enter') {
        await func();
    }
};

/*
 * 네이버 스마트 에디터 데이터 유효성 검사
 * @param html
 */
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