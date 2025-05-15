import { Row, Col, Input, Button, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useModalHook from '@/hook/useModal';

interface Props {
    originPhone: string;
    onSuccess: () => void;
}

const NumberAccess: React.FC<Props> = ({ originPhone, onSuccess }) => {
    const { openCustomModal } = useModalHook();

    const [ code, setCode ] = useState('');
    const [ timeLeft, setTimeLeft ] = useState(300); // 인증 유효기간 5분
    const [ isVerified, setIsVerified ] = useState(false); // ✅ 인증 성공 여부 상태

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer
            = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // 인증번호 만료기간 UI
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // 6자리 숫자만 입력가능
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const handleVerify = async () => {
        if (code.length !== 6) {
            openCustomModal({
                title: '인증 오류',
                message: '인증번호는 6자리 숫자여야 합니다.',
                isConfirm: false
            });

            return;
        }

        try {
            const endPoint = `${import.meta.env.VITE_API_URL}/api/user/verify/identity-code`;

            const response = await axios.post(endPoint, {
                originPhone: originPhone.replace(/-/g, ''),
                checkCode: code
            });

            const { success, message } = response.data;

            if (success) {
                openCustomModal({ title: '알림', message, isConfirm: false });
                setIsVerified(true);
                onSuccess(); // 외부 상태 변경
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message, errorCode } = error.response?.data || {};

                // 인증 실패 코드 처리
                if (errorCode === '1006' || errorCode === '1007' || errorCode === '1009') {
                    openCustomModal({
                        title: `오류 (${errorCode})`,
                        message: message,
                        isConfirm: false
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    openCustomModal({
                        title: `오류 (${errorCode})`,
                        message: message,
                        isConfirm: false
                    });
                }
            } else {
                openCustomModal({ title: '알림', message: '알 수 없는 오류가 발생했습니다.', isConfirm: false });
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
