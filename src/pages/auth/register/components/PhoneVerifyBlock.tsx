import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
} from 'reactstrap';
import { useState } from 'react';

import { formatPhoneNumber } from '@/utils/format';
import useModalHook from '@/hooks/useModal';
import { sendSms } from '@/server/api/user/verifyService';
import { HttpError } from '@/types/cmmn';

interface PhoneVerifyBlockProps {
    phone: string;
    setPhone: (value: string) => void;
    onVerified: () => void;
    isVerified: boolean;
}

const PhoneVerifyBlock: React.FC<PhoneVerifyBlockProps> = ({
    phone,
    setPhone,
    onVerified,
    isVerified
}) => {
    const { openCustomModal, openErrorModal } = useModalHook();
    const [ phoneLocked, setPhoneLocked ] = useState<boolean>(false);

    const handlePhoneVerify = async (): Promise<void> => {
        if (!/^\d{11}$/.test(phone)) {
            openCustomModal({
                title: '알림',
                message: '전화번호는 숫자 11자리만 입력해주세요.',
                isConfirm: false,
            });

            return;
        }

        try {
            const result
                = await sendSms({ receiver: phone.replace(/-/g, '') });

            if (result.success) {
                setPhoneLocked(true);

                openCustomModal({
                    title: '알림',
                    message: result.message ?? '인증번호가 발송되었습니다.',
                    isConfirm: false,
                });

                onVerified(); // 인증번호 입력창 열기
            } else {
                openErrorModal({
                    errorCode: result.errorCode ?? '0000',
                    message: result.message ?? 'SMS 전송 중 오류가 발생했습니다.',
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
    };

    return (
        <Row>
            <Col xs="8">
                <InputGroup
                    className={`input-group-alternative mb-3 ${
                        phoneLocked ? 'custom-disabled-group' : ''
                    }`}
                >
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-chat-round" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="휴대폰 번호"
                        disabled={phoneLocked}
                        value={formatPhoneNumber(phone)}
                        onChange={(e) =>
                            setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 11))
                        }
                    />
                </InputGroup>
            </Col>
            <Col xs="4" className="pl-0">
                <Button
                    color="info"
                    className="w-100"
                    disabled={phoneLocked || isVerified}
                    onClick={handlePhoneVerify}
                >
                    {isVerified ? '인증완료' : '휴대폰 인증'}
                </Button>
            </Col>
        </Row>
    );
};

export default PhoneVerifyBlock;
