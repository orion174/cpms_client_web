import { NavigateFunction } from 'react-router-dom';
import store from '@/store';
import { v4 as uuidv4 } from 'uuid';

import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';

interface CustomModalOptions {
    title: string;
    message: string;
    isConfirm?: boolean;
    onConfirm?: () => void;
    redirectUrl?: string;
    navigate?: NavigateFunction;
}

interface ErrorModalOptions {
    errorCode: string;
    message: string;
    redirectUrl?: string;
    navigate?: NavigateFunction;
}

// 커스텀 모달
export const openCustomModal = ({
    title,
    message,
    isConfirm = false,
    onConfirm,
    redirectUrl,
    navigate
}: CustomModalOptions): void => {

    const modalId = uuidv4();

    if (isConfirm && onConfirm) {
        callbackStore.setCallback(modalId, onConfirm);
    }

    if (redirectUrl && navigate) {
        callbackStore.setCallback(modalId, () => navigate(redirectUrl));
    }

    store.dispatch(
        openModal({
            modalId,
            title,
            message,
            isConfirm,
            redirectUrl,
        })
    );
};

// 에러 모달
export const openErrorModal = ({
    errorCode,
    message,
    redirectUrl,
    navigate,
}: ErrorModalOptions): void => {

    const modalId = uuidv4();
    const title = `오류 [에러코드 ${errorCode}]`;

    if (redirectUrl && navigate) {
        callbackStore.setCallback(modalId, () => navigate(redirectUrl));
    }

    store.dispatch(
        openModal({
            modalId,
            title,
            message,
            isConfirm: true,
            redirectUrl,
        })
    );
};
