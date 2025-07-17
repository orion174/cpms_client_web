import { Button } from 'reactstrap';
import React, { useState } from 'react';
import axios from 'axios';

import useModalHook from '@/hook/useModal';

import { ApiResponse } from '@/definition/common.types.ts';
import { ResCheckIdDTO } from '@/view/page/main/types';

interface Props {
    loginId: string;
    classNm: string;
    onValid: () => void; // 중복검사 통과 시 호출
};

const IdCheckModule: React.FC<Props> = ({ loginId, classNm, onValid }) => {
    const { openCustomModal } = useModalHook();
    const [ isValid, setIsValid ] = useState(false);

    // 아아디 중복 검사 API
    const handleCheckDuplicate = async () => {
        if (!loginId || loginId.trim().length < 4) {
            openCustomModal({ title: '알림', message: '아이디는 최소 4자리 이상 입력해주세요.', isConfirm: false });
            return;
        }

        try {
            const endPoint = `${import.meta.env.VITE_API_URL}/api/user/verify/id-check`;

            const jsonData = {
                loginId: loginId.trim()
            };

            const response
                = await axios.post<ApiResponse<ResCheckIdDTO>>(endPoint, jsonData, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { success, data, message } = response.data;

            if (success && data?.loginId === loginId.trim()) {
                openCustomModal({
                    title: '알림',
                    message: message,
                    isConfirm: true,
                    onConfirm: () => {
                        setIsValid(true);
                        onValid();
                    }
                });
            }
        } catch (error: any) {
            const message = error?.response?.data?.message ?? '중복검사 중 오류가 발생했습니다.';
            openCustomModal({ title: '오류', message, isConfirm: false });
        }
    };

    return (
        <>
            <Button color="info" className={classNm} disabled={isValid} onClick={handleCheckDuplicate}>
                {isValid ? '사용가능' : '중복검사'}
            </Button>
        </>
    );
};

export default IdCheckModule;
