import { ApiRes, ResLoginDTO} from "@/definition/type.ts";
import { handleInputKeyDown } from '@/utils/common.ts'
import { saveCookie } from "@/utils/auth.ts";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import axios from 'axios';


/* 로그인 페이지 */
const Login = () => {

    /* 회원가입 페이지 이동 */
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('')
    const [loginPw, setLoginPw] = useState('')

    /* CPMS 로그인 */
    const login = async(): Promise<void> => {
        const jsonData = {
            'loginId' : loginId,
            'loginPw' : loginPw
        }

        const url = `${import.meta.env.VITE_API_URL}/auth/login`;

        try {
            const res = await axios.post<ApiRes<ResLoginDTO>>(url, jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(res.status) {
                if(res.data.result) {
                    await saveCookie(res.data.result);
                }
            } else {
                const msg = res.message;

                if(msg === 'ERR_NOT_FOUND') {
                    alert('일치하는 정보가 없습니다. 다시 한번 확인해주세요.');

                } else {
                    alert('오류가 발생하였습니다. 관리자에게 문의하세요.');
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div>
                <div>
                    <h2>CPMS<br/>로그인</h2>
                    <div>
                        <div>
                            <input type="text"
                                   value={loginId}
                                   placeholder="아이디"
                                   onChange={(e) => setLoginId(e.target.value)}
                                   onKeyDown={(event) => handleInputKeyDown(event, login)}
                            />
                            <input type="text"
                                   placeholder="비밀번호"
                                   onChange={(e) => setLoginPw(e.target.value)}
                                   onKeyDown={(event) => handleInputKeyDown(event, login)}
                            />
                        </div>
                        <div>
                            <button type={'button'}
                                    onClick={login}
                            >로그인
                            </button>
                            <button type={'button'}
                                    value={loginPw}
                                    onClick={() => navigate('/test')}
                            > 회원가입(테스트)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;