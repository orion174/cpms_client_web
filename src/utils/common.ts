import {DetailedHTMLProps, InputHTMLAttributes } from "react";

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