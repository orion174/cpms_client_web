import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import React, { useEffect } from "react";

interface FormModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
};

const FormModal: React.FC<FormModalProps> = ({
    isOpen, title, children, onConfirm, onClose
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.removeProperty('padding-right');
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>
                {title}
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>취소</Button>
                <Button color="primary" onClick={onConfirm}>저장</Button>
            </ModalFooter>
        </Modal>
    );
};

export default FormModal;

