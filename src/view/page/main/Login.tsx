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
            const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;
            const response = await axios.post<ApiResponse<ResLoginDTO>>(
                url,
                { loginId, loginPw },
                {
                    headers: { 'Content-Type': 'application/json' },
                    // refreshToken 쿠키를 심어야 하므로 유지
                    withCredentials: true,
                },
            );

            const { success, message, data } = response.data;

            if (success && data?.accessToken) {
                /* ───────────────────────────────
                 * ① 토큰 & 메타데이터 저장
                 *    accessToken  : 세션스토리지
                 *    accessExpire : (선택) 만료값
                 *    loginHistoryId : refresh 호출 때 사용
                 * ─────────────────────────────── */
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('accessExp', String(data.accessTokenExpiration));
                sessionStorage.setItem('loginHistoryId', String(data.loginHistoryId));

                navigate('/admin/support/list');
            } else {
                openCustomModal({
                    title: '알림',
                    message: message ?? '로그인 실패',
                    isConfirm: false,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleErrorByCode(
                    error.response?.data?.errorCode as string | undefined,
                    error.response?.data?.message as string | undefined,
                );
            }
        }
    };

    return (
        <>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="mb-4" style={{ minHeight: "10px" }} />

                        <div className="text-center text-muted mb-4">
                            <span className="custom-text">CPMS</span>
                        </div>

                        <div className="mb-4" style={{ minHeight: "10px" }} />
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
                                <Button
                                    onClick={handleLogin}
                                    className="my-4 w-100"
                                    color="primary"
                                    type="button"
                                    style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                                >
                                    로그인
                                </Button>
                                <div className="mb-4" style={{ minHeight: "40px" }} />
                            </div>
                            테스트계정 ID: test / PW: test
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Login;
