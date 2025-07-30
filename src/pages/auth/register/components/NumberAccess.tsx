import { Row, Col, Input, Button, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useModalHook from '@/hooks/useModal.ts';
import { identityCode } from '@/core/api/user/verifyService';

interface NumberAccessProps {
    originPhone: string;
    onSuccess: () => void;
};

const TIME_LIMIT = 500; // 인증 유효기간 5분

const NumberAccess: React.FC<NumberAccessProps> = ({ originPhone, onSuccess }) => {
    const { openCustomModal, openErrorModal } = useModalHook();

    const [ code, setCode ] = useState('');
    const [ timeLeft, setTimeLeft ] = useState(TIME_LIMIT);
    const [ isVerified, setIsVerified ] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer
            = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // 인증번호 만료시간 UI
    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // 6자리 숫자만 입력가능
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target.value;

        if (/^\d{0,6}$/.test(input)) {
            setCode(input);

        } else {
            openCustomModal({
                title: '입력 오류',
                message: '숫자 6자리만 입력 가능합니다.',
                isConfirm: false
            });
        }
    };

    // 인증번호 검사
    const handleVerify = async (): Promise<void> => {

        if (code.length !== 6) {
            openCustomModal({
                title: '인증 오류',
                message: '인증번호는 6자리 숫자여야 합니다.',
                isConfirm: false
            });

            return;
        }

        const data = {
            originPhone: originPhone.replace(/-/g, ''),
            checkCode: code
        };

        try {
            const response = await identityCode(data);
            const { success, message } = response.data;

            if (success) {
                openCustomModal({
                    title: '알림',
                    message: message,
                    isConfirm: false
                });

                setIsVerified(true);
                onSuccess(); // 외부 상태 변경
            }

        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                const { message, errorCode } = error.response?.data || {};

                // 인증 실패 코드 처리
                if (['1006', '1007', '1009'].includes(errorCode)) {
                    openErrorModal({
                        errorCode: errorCode,
                        message: message
                    });

                    setTimeout((): void => {
                        window.location.reload();
                    }, 1500);
                } else {
                    openErrorModal({
                        errorCode: errorCode ?? '0000',
                        message: message ?? 'API 오류'
                    });
                }
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
                                <i className="ni ni-key-25"/>
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
                    >인증하기
                    </Button>
                </Col>
            </Row>
        </FormGroup>
    );
};

export default NumberAccess;
