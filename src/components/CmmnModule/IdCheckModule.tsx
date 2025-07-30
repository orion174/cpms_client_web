import { Button } from 'reactstrap';
import React, { useState } from 'react';

import useModalHook from '@/hooks/useModal';
import { idCheck } from '@/core/api/user/verifyService';

interface idCheckProps {
    loginId: string;
    classNm: string;
    onValid: () => void; // 중복검사 통과 시 호출
};

const IdCheckModule: React.FC<idCheckProps> = ({
                                                   loginId,
                                                   classNm,
                                                   onValid
                                               }: idCheckProps) => {
    const { openCustomModal } = useModalHook();
    const [ isValid, setIsValid ] = useState(false);

    // 아아디 중복 검사
    const handleCheckDuplicate = async (): Promise<void> => {

        if (!loginId || loginId.trim().length < 4) {
            openCustomModal({
                title: '알림',
                message: '아이디는 최소 4자리 이상 입력해주세요.',
                isConfirm: false
            });

            return;
        }

        const jsonData = {
            loginId: loginId.trim()
        };

        try {
            const result = await idCheck(jsonData);

            if (result.success && result.data?.loginId === loginId.trim()) {
                openCustomModal({
                    title: '알림',
                    message: result.message,
                    isConfirm: true,
                    onConfirm: (): void => {
                        setIsValid(true);
                        onValid();
                    }
                });
            } else {
                openCustomModal({
                    title: '알림',
                    message: result.message ?? '아이디 중복검사 중 오류가 발생했습니다.'
                });
            }
        } catch {
            console.warn('handleCheckDuplicate error!');
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
