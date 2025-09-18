import {
    Row, Col, Input, Button, InputGroup,
    InputGroupAddon, InputGroupText, FormGroup
} from 'reactstrap';
import React, { useState, useEffect } from 'react';

import useModalHook from '@/hooks/useModal';
import { identityCode } from '@/server/api/user/verifyService';
import { HttpError } from '@/types/cmmn';

interface NumberAccessProps {
    originPhone: string;
    onSuccess: () => void;
}

const TIME_LIMIT = 300; // 5분

const NumberAccess: React.FC<NumberAccessProps> = ({ originPhone, onSuccess }) => {

    const { openCustomModal, openErrorModal } = useModalHook();

    const [code, setCode] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(
            () => setTimeLeft((prev) => prev - 1), 1000
        );

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target.value;

        if (/^\d{0,6}$/.test(input)) {
            setCode(input);

        } else {
            openCustomModal({
                title: '입력 오류',
                message: '숫자 6자리만 입력 가능합니다.',
                isConfirm: false,
            });
        }
    };

    const handleVerify = async (): Promise<void> => {
        if (code.length !== 6) {
            openCustomModal({
                title: '인증 오류',
                message: '인증번호는 6자리 숫자여야 합니다.',
                isConfirm: false,
            });

            return;
        }

        try {
            const result = await identityCode({
                originPhone: originPhone.replace(/-/g, ''),
                checkCode: code,
            });

            if (result.success) {
                openCustomModal({
                    title: '알림',
                    message: result.message ?? '인증이 완료되었습니다.',
                    isConfirm: false,
                });

                setIsVerified(true);
                onSuccess();
            } else {
                openErrorModal({
                    errorCode: result.errorCode ?? '0000',
                    message: result.message ?? '인증 실패',
                });
            }
        } catch (e: unknown) {
            if (e instanceof HttpError) {
                // 특정 실패 코드 처리
                if (['1006', '1007', '1009'].includes(e.code)) {
                    openErrorModal({
                        errorCode: e.code,
                        message: e.message
                    });

                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    openErrorModal({
                        errorCode: e.code,
                        message: e.message
                    });
                }
            } else {
                openErrorModal({
                    errorCode: '0000',
                    message: '예상치 못한 오류가 발생했습니다.'
                });
            }
        }
    };

    if (isVerified) return null;

    return (
        <FormGroup className="mb-3">
            <Row>
                <Col xs="8">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-key-25" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            maxLength={6}
                            placeholder="인증번호 6자리"
                            value={code}
                            onChange={handleChange}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText className="text-muted" style={{ fontSize: '0.8rem' }}>
                                {formatTime(timeLeft)}
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col xs="4" className="pl-0">
                    <Button
                        color="success"
                        className="w-100"
                        onClick={handleVerify}
                        disabled={timeLeft === 0}
                    >
                        인증하기
                    </Button>
                </Col>
            </Row>
        </FormGroup>
    );
};

export default NumberAccess;
