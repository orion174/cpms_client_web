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
} from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';

import useModalHook from '@/hook/useModal.ts';

import PhoneVerifyBlock from './components/PhoneVerifyBlock.tsx';
import NumberAccess from './components/NumberAccess.tsx';
import IdCheckBlock from './components/IdCheckBlock.tsx';

import type { ApiResponse } from '@/types/cmmn.ts';

const CpmsRegister: React.FC = () => {
    const { openCustomModal } = useModalHook();

    const [ showAccess, setShowAccess ] = useState(false);
    const [ isPhoneVerified, setIsPhoneVerified ] = useState(false);
    const [ isIdVerified, setIsIdVerified ] = useState(false);
    const [ phone, setPhone ] = useState('');
    const [ loginId, setLoginId ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSubmit = () => {
        if (!isPhoneVerified) {
            openCustomModal({ title: '알림', message: '휴대폰 인증을 완료해 주세요.', isConfirm: false });
            return;
        }

        if (!isIdVerified) {
            openCustomModal({ title: '알림', message: '아이디 중복검사를 완료해주세요.', isConfirm: false });
            return;
        }

        if (!password || !confirmPassword) {
            openCustomModal({ title: '알림', message: '비밀번호 또는 비밀번호 확인을 입력하세요.', isConfirm: false });
            return;
        }

        if (password !== confirmPassword) {
            openCustomModal({ title: '알림', message: '비밀번호가 일치하지 않습니다.', isConfirm: false });
            return;
        }

        openCustomModal({
            title: '확인',
            message: '입력한 정보로 계정을 생성하시겠습니까?',
            isConfirm: true,
            onConfirm: async () => {
                try {
                    const endPoint = `
                        ${import.meta.env.VITE_API_URL}/api/user/verify/register
                    `;

                    const jsonData = {
                        phone: phone.replace(/-/g, ''),
                        loginId,
                        password,
                        confirmPassword
                    };

                    const response
                        = await axios.post<ApiResponse<null>>(endPoint, jsonData);

                    const { success, message } = response.data;

                    if (success) {
                        openCustomModal({
                            title: '완료',
                            message: message,
                            isConfirm: true,
                            onConfirm: () => {
                                window.location.href = '/auth/login';
                            }
                        });
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const errorRes = error.response?.data as ApiResponse;
                        openCustomModal({
                            title: `오류${errorRes?.errorCode ? ` (${errorRes.errorCode})` : ''}`,
                            message: errorRes?.message ?? '회원가입 중 오류가 발생했습니다.',
                            isConfirm: false
                        });
                    } else {
                        openCustomModal({
                            title: '알림',
                            message: '알 수 없는 오류가 발생했습니다.',
                            isConfirm: false
                        });
                    }
                }
            }
        });
    };

    return (
        <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center mb-4 h2">CPMS 계정을 등록합니다.</div>

                    <Form role="form">

                        {/* 문자전송 */}
                        <PhoneVerifyBlock
                            phone={phone}
                            setPhone={setPhone}
                            onVerified={() => setShowAccess(true)}
                            isVerified={isPhoneVerified}
                        />

                        {/* 문자전송이 성공했으면, 본인인증 번호 입력 창 노출 */}
                        {showAccess && (
                            <NumberAccess
                                originPhone={phone}
                                onSuccess={() => {
                                    setIsPhoneVerified(true);
                                    setShowAccess(false);
                                }}
                            />
                        )}

                        {/* 로그인 아이디 입력 */}
                        <IdCheckBlock
                            loginId={loginId}
                            setLoginId={setLoginId}
                            onValid={() => setIsIdVerified(true)}
                        />

                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="비밀번호"
                                    type="password"
                                    autoComplete="new-password"
                                    maxLength={30}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="비밀번호 확인"
                                    type="password"
                                    autoComplete="new-password"
                                    maxLength={30}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </InputGroup>
                        </FormGroup>

                        <div className="text-center">
                            <div className="mb-4 text-muted">
                                본 계정은 임시로 발급되며,<br />소속 업체 정보 확인 후 정식 계정으로 전환됩니다.
                            </div>
                            <Button
                                className="my-2 w-100"
                                color="primary"
                                type="button"
                                style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                                onClick={handleSubmit}
                            >
                                계정 만들기
                            </Button>
                            <Button
                                className="mt-4 w-100"
                                color="default"
                                type="button"
                                onClick={() => window.history.back()}
                            >
                                로그인 화면으로 돌아가기
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default CpmsRegister;
