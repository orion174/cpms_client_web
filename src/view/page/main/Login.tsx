import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

import useModalHook from '@/hook/useModal';
import { handleInputKeyDown } from '@/utils/common.ts'
import { saveCookie } from "@/core/auth/cookie.ts";
import { handleErrorByCode } from '@/core/api/interceptor.ts';

import { ApiResponse, ResLoginDTO } from '@/definition/common.types.ts';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { openCustomModal } = useModalHook();

    const [ loginId, setLoginId ] = useState('');
    const [ loginPw, setLoginPw ] = useState('');

    const loginIdRef = useRef<HTMLInputElement>(null);
    const loginPwRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (): Promise<void> => {
        if (loginId.trim() === '') {
            openCustomModal({ title: '알림', message: '아이디를 입력해 주세요.', isConfirm: false });
            loginIdRef.current?.focus();
            return;
        }

        if (loginPw.trim() === '') {
            openCustomModal({ title: '알림', message: '비밀번호를 입력해 주세요.', isConfirm: false });
            loginPwRef.current?.focus();
            return;
        }

        try {
            const jsonData = {
                loginId: loginId,
                loginPw: loginPw
            };

            const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;

            const response = await axios.post<ApiResponse<ResLoginDTO>>(url, jsonData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.status === 200) {
                if (response.data.success && response.data.data) {
                    await saveCookie(response.data.data);
                    navigate('/admin/support/list');

                } else {
                    openCustomModal({
                        title: '알림',
                        message: response.data.message ?? '로그인 실패',
                        isConfirm: false
                    });
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const code = error.response?.data?.errorCode as string | undefined;
                const msg = error.response?.data?.message as string | undefined;

                handleErrorByCode(code, msg);
            }
        }
    };

    return (
        <Col lg="5" md="8">
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small className="custom-text">CPMS</small>
                    </div>
                    <Form role="form">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="ni ni-circle-08" /></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    value={loginId}
                                    placeholder="아이디"
                                    onChange={(e) => setLoginId(e.target.value)}
                                    onKeyDown={(e) => handleInputKeyDown(e, handleLogin)}
                                    innerRef={loginIdRef}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="ni ni-lock-circle-open" /></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="password"
                                    placeholder="비밀번호"
                                    onChange={(e) => setLoginPw(e.target.value)}
                                    onKeyDown={(e) => handleInputKeyDown(e, handleLogin)}
                                    innerRef={loginPwRef}
                                />
                            </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                            <Button onClick={handleLogin} className="my-4" color="primary" type="button">로그인</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Login;
