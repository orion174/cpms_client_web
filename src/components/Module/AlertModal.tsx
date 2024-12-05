import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';

const AlertModal: React.FC = () => {

    const dispatch = useDispatch();
    const { currentModal } = useSelector((state: RootState) => state.modal);

    useEffect(() => {
        if (currentModal?.isOpen) {
            document.body.style.removeProperty('padding-right'); // 패딩 제거
        } else {
            // 모달이 닫힐 때 스크롤 활성화
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [currentModal?.isOpen]);

    if (!currentModal) return null;

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleConfirm = () => {
        if (currentModal.modalId) {
            const callback = callbackStore.getCallback(currentModal.modalId);
            if (callback) {
                callback();
                callbackStore.removeCallback(currentModal.modalId);
            }
        }

        dispatch(closeModal());

        if (currentModal.redirectUrl) {
            setTimeout(() => {
                window.location.href = currentModal.redirectUrl!;
            }, 300);
        }
    };

    return (
        <Modal isOpen={currentModal.isOpen || false} toggle={handleClose} backdrop="static" centered>
            <ModalHeader toggle={handleClose} className="my-modal-header-text">{currentModal.title || ''}</ModalHeader>
            <ModalBody className="my-modal-info-text">{currentModal.message || ''}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleConfirm}>확인</Button>
                {currentModal.isConfirm && (
                    <Button color="secondary" onClick={handleClose}>취소</Button>
                )}
            </ModalFooter>
        </Modal>
    );
};

export default AlertModal;