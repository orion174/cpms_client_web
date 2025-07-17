import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    title: string;
    message?: string;
    formComponent?: React.ReactNode;
    isConfirm: boolean;
    modalId: string | null;
    redirectUrl?: string;
}

interface ModalSliceState {
    currentModal: ModalState | null;
    pendingModal: ModalState | null;
}

const initialState: ModalSliceState = {
    currentModal: null,
    pendingModal: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
            const modal = { ...action.payload, isOpen: true };

            if (!state.currentModal) {
                state.currentModal = modal;
            } else {
                state.pendingModal = modal; // 현재 모달이 열려있으면 다음 모달로 대기
            }
        },
        closeModal: (state) => {
            state.currentModal = null;
            if (state.pendingModal) {
                state.currentModal = state.pendingModal; // 대기 중 모달 열기
                state.pendingModal = null;
            }
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;