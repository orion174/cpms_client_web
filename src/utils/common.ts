import React, {DetailedHTMLProps, InputHTMLAttributes } from "react";

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

export const utf8ToBase64 = (str: string): string => {
    return btoa(unescape(encodeURIComponent(str)));
}

export const base64ToUtf8 = (str: string): string => {
    return decodeURIComponent(escape(atob(str)));
}
