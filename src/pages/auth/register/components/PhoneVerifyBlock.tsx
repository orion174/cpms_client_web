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
import axios from 'axios';

import { formatPhoneNumber } from '@/utils/format.ts';
import useModalHook from '@/hooks/useModal.ts';

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
    const [ phoneLocked, setPhoneLocked ] = useState(false);

    // 입력된 휴대폰 번호로 인증 문자를 전송한다.
    const handlePhoneVerify = async (): Promise<void> => {
        if (!/^\d{11}$/.test(phone)) {
            openCustomModal({
                title: '알림',
                message: '전화번호는 숫자 11자리만 입력해주세요.',
                isConfirm: false
            });

            return;
        }

        try {
            const endPoint = `
                ${import.meta.env.VITE_API_URL}/api/user/verify/send-sms
            `;

            const response
                = await axios.post(endPoint, { receiver: phone.replace(/-/g, '') });

            const { success, message } = response.data;

            if (success) {
                setPhoneLocked(true);

                openCustomModal({
                    title: '알림',
                    message,
                    isConfirm: false
                });

                onVerified(); // 인증번호 입력창 열기 외부에 알림
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                openErrorModal({
                    errorCode: error?.response?.data?.errorCode ?? '0000',
                    message: error?.response?.data?.message ?? 'SMS 전송 중 오류가 발생했습니다.'
                });
            }
        }
    };

    return (
        <Row>
            <Col xs="8">
                <InputGroup className={`input-group-alternative mb-3 ${phoneLocked ? 'custom-disabled-group' : ''}`}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-chat-round" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="휴대폰 번호"
                        disabled={phoneLocked}
                        value={formatPhoneNumber(phone)}
                        onChange={(e) => setPhone(
                            e.target.value.replace(/[^\d]/g, '').slice(0, 11)
                        )}
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
