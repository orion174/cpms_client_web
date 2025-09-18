import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useModalHook from '@/hooks/useModal.ts';
import LoginForm from './components/LoginForm.tsx';
import { userLogin } from '@/server/api/auth/service.ts';
import { HttpError } from '@/types/cmmn.ts';

const LoginContainer: React.FC = () => {
    const navigate = useNavigate();
    const { openCustomModal, openErrorModal } = useModalHook();

    const [ loginId, setLoginId ] = useState<string>('');
    const [ loginPw, setLoginPw ] = useState<string>('');

    const loginIdRef = useRef<HTMLInputElement>(null);
    const loginPwRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        if (!loginId.trim()) {
            openCustomModal({
                title: '알림',
                message: '아이디를 입력해 주세요.',
                isConfirm: false
            });

            loginIdRef.current?.focus();
            return;
        }

        if (!loginPw.trim()) {
            openCustomModal({
                title: '알림',
                message: '비밀번호를 입력해 주세요.',
                isConfirm: false
            })
            ;
            loginPwRef.current?.focus();
            return;
        }

        try {
            const result = await userLogin({ loginId, loginPw });

            if (result.success && result.data?.accessToken) {
                sessionStorage.setItem('accessToken', result.data.accessToken);
                sessionStorage.setItem('accessExp', String(result.data.accessTokenExpiration));
                sessionStorage.setItem('loginHistoryId', String(result.data.loginHistoryId));

                navigate('/admin/support/list');
            } else {
                openErrorModal({
                    errorCode: result.errorCode ?? '0000',
                    message: result.message ?? '로그인 실패',
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
                    message: '예상치 못한 오류가 발생했습니다.'
                });
            }
        }
    };

    return (
        <LoginForm
            loginId={loginId}
            loginPw={loginPw}
            onChangeId={setLoginId}
            onChangePw={setLoginPw}
            onSubmit={handleLogin}
        />
    );
};

export default LoginContainer;
