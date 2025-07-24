import { useState } from "react";

interface ModalConfig {
    title: string;
    formComponent: React.ReactNode;
    onConfirm: () => void;
};

export function useFormModal() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ modalConfig, setModalConfig ] = useState<ModalConfig | null>(null);

    const openFormModal = (config: ModalConfig) => {
        setModalConfig(config);
        setIsOpen(true);
    };

    const closeFormModal = () => {
        setIsOpen(false);
        setModalConfig(null);
    };

    return {
        isOpen,
        modalConfig,
        openFormModal,
        closeFormModal,
    };
};
