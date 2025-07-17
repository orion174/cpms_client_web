import { Input, InputGroup, InputGroupAddon, InputGroupText, Button, Col, Row, FormGroup } from 'reactstrap';
import React, { useState } from 'react';
import axios from 'axios';

import useModalHook from '@/hook/useModal';

import { ApiResponse } from '@/definition/common.types.ts';
import { ResCheckIdDTO } from "../../types.ts";

interface Props {
    loginId: string;
    setLoginId: (value: string) => void;
    onValid: () => void; // 중복검사 통과 시 호출
}

const IdCheckBlock: React.FC<Props> = ({ loginId, setLoginId, onValid }) => {
    const { openCustomModal } = useModalHook();
    const [ isValid, setIsValid ] = useState(false);

    const handleChange = (value: string) => {
        // 변경되면 상태 초기화
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setLoginId(value);
            setIsValid(false);
        }
    };

    // 아아디 중복 검사 API
    const handleCheckDuplicate = async () => {
        if (!loginId || loginId.trim().length < 6) {
            openCustomModal({ title: '알림', message: '아이디는 최소 6자리 이상 입력해주세요.', isConfirm: false });
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
        <FormGroup className="mb-3">
            <Row>
                <Col xs="8">
                    <InputGroup className={`input-group-alternative ${isValid ? 'custom-disabled-group' : ''}`}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-circle-08" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="아이디"
                            type="text"
                            value={loginId}
                            maxLength={20}
                            disabled={isValid}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs="4" className="pl-0">
                    <Button
                        color="info"
                        className="w-100"
                        onClick={handleCheckDuplicate}
                        disabled={isValid}
                    >
                        {isValid ? '사용가능' : '중복검사'}
                    </Button>
                </Col>
            </Row>
        </FormGroup>
    );
};

export default IdCheckBlock;
