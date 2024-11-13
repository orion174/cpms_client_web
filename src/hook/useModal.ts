import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';
import { v4 as uuidv4 } from 'uuid';

interface ModalOptions {
    title: string;
    message: string;
    isConfirm?: boolean;
    onConfirm?: () => void;
    redirectUrl?: string;
}

const useModalHook = () => {
    const dispatch = useDispatch();

    const openCustomModal = ({ title, message, isConfirm = false, onConfirm, redirectUrl }: ModalOptions) => {
        const modalId = uuidv4();

        if (isConfirm && onConfirm) {
            callbackStore.setCallback(modalId, onConfirm);
        }

        dispatch(openModal({
            title,
            message,
            isConfirm,
            modalId,
            redirectUrl,
        }));
    };

    return { openCustomModal };
};

export default useModalHook;