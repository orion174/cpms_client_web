import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';

interface CustomrModalOptions {
    title: string;
    message: string;
    isConfirm?: boolean;
    onConfirm?: () => void;
    redirectUrl?: string;
};

interface ErrorModalOptions {
    errorCode: string;
    message: string;
    redirectUrl?: string;
};

const useModalHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 일반 알림 모달
    const openCustomModal = ({
        title
        , message
        , isConfirm = false
        , onConfirm
        , redirectUrl
    }: CustomrModalOptions) => {

        const modalId = uuidv4();

        if (isConfirm && onConfirm) {
            callbackStore.setCallback(modalId, onConfirm);
        }

        dispatch(openModal({
            modalId,
            title,
            message,
            isConfirm,
            redirectUrl,
        }));
    };

    // 에러 모달
    const openErrorModal = ({
        errorCode,
        message,
        redirectUrl
    }: ErrorModalOptions) => {

        const modalId = uuidv4();
        const title = `오류 [에러코드 ${errorCode}]`;

        if (redirectUrl) {
            callbackStore.setCallback(
                modalId
                , () => navigate(redirectUrl)
            );
        }

        dispatch(
            openModal({
                modalId,
                title,
                message,
                isConfirm: true, // 에러 모달은 확인 버튼만
                redirectUrl,     // 필요 시 확인 후 이동
            })
        );
    };

    return { openCustomModal, openErrorModal };
};

export default useModalHook;