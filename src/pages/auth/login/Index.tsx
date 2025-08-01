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
    Col
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import useModalHook from '@/hooks/useModal.ts';
import { handleInputKeyDown } from '@/utils/cmmn.ts'
import { userLogin } from "@/core/api/auth/loginService.ts";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { openCustomModal } = useModalHook();

    const [ loginId, setLoginId ] = useState('');
    const [ loginPw, setLoginPw ] = useState('');

    const loginIdRef = useRef<HTMLInputElement>(null);
    const loginPwRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (): Promise<void> => {

        if (loginId.trim() === '') {
            openCustomModal({
                title: '알림',
                message: '아이디를 입력해 주세요.',
                isConfirm: false
            });

            loginIdRef.current?.focus();
            return;
        }

        if (loginPw.trim() === '') {
            openCustomModal({
                title: '알림',
                message: '비밀번호를 입력해 주세요.',
                isConfirm: false
            });

            loginPwRef.current?.focus();
            return;
        }

        const data = {
            loginId: loginId.trim()
            , loginPw: loginPw.trim()
        };

        try {
            const result = await userLogin(data);

            if (result.success && result.data?.accessToken) {
                sessionStorage.setItem('accessToken', result.data.accessToken);
                sessionStorage.setItem('accessExp', String(result.data.accessTokenExpiration));
                sessionStorage.setItem('loginHistoryId', String(result.data.loginHistoryId));

                navigate('/admin/support/list');
            } else {
                openCustomModal({
                    title: '알림',
                    message: result.message ?? '로그인 중 오류가 발생했습니다.'
                });
            }
        } catch {
            console.warn('handleLogin error!');
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
                                >로그인
                                </Button>

                                <div className="mb-4" style={{ minHeight: "40px" }} />
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Login;
