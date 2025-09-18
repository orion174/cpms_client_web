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

import useModalHook from '@/hooks/useModal';
import PhoneVerifyBlock from './components/PhoneVerifyBlock.tsx';
import NumberAccess from './components/NumberAccess.tsx';
import IdCheckBlock from './components/IdCheckBlock.tsx';

import { registerUser } from '@/server/api/user/verifyService';
import { HttpError } from '@/types/cmmn';

const CpmsRegister: React.FC = () => {
    const { openCustomModal, openErrorModal } = useModalHook();

    const [ showAccess, setShowAccess ] = useState<boolean>(false);
    const [ isPhoneVerified, setIsPhoneVerified ] = useState<boolean>(false);
    const [ isIdVerified, setIsIdVerified ] = useState<boolean>(false);
    const [ phone, setPhone ] = useState<string>('');
    const [ loginId, setLoginId ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ confirmPassword, setConfirmPassword ] = useState<string>('');

    const validate = (): string => {
        if (!isPhoneVerified) return '휴대폰 인증을 완료해 주세요.';
        if (!isIdVerified) return '아이디 중복검사를 완료해주세요.';
        if (!password || !confirmPassword) return '비밀번호 또는 비밀번호 확인을 입력하세요.';
        if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.';

        return "";
    };

    const handleSubmit = (): void => {
        const message = validate();

        if (message) {
            openCustomModal({
                title: "알림",
                message,
                isConfirm: false
            });

            return;
        }

        openCustomModal({
            title: '확인',
            message: '계정을 생성하시겠습니까?',
            isConfirm: true,
            onConfirm: async () => {
                try {
                    const result
                        = await registerUser({
                            phone: phone.replace(/-/g, ''),
                            loginId,
                            password,
                            confirmPassword,
                        });

                    if (result.success) {
                        openCustomModal({
                            title: '완료',
                            message: result.message ?? '회원가입이 완료되었습니다.',
                            isConfirm: true,
                            onConfirm: () => {
                                window.location.href = '/auth/login';
                            },
                        });
                    } else {
                        openErrorModal({
                            errorCode: result.errorCode ?? '0000',
                            message: result.message ?? '회원가입 중 오류가 발생했습니다.',
                        });
                    }
                } catch (e: unknown) {
                    if (e instanceof HttpError) {
                        openErrorModal({
                            errorCode: e.code,
                            message: e.message
                        });
                    } else {
                        openErrorModal({
                            errorCode: '0000',
                            message: '예상치 못한 오류가 발생했습니다.',
                        });
                    }
                }
            },
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
