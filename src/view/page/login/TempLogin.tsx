import { ApiRes, ResLoginDTO} from "@/definition/type.ts";
import { handleInputKeyDown } from '@/utils/common.ts'
import { saveCookie } from "@/utils/auth.ts";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import axios from 'axios';

/* 로그인 페이지 */
const TempLogin = () => {

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

            if(res.status == 200) {
                if(res.data.result) {
                    await saveCookie(res.data.result);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('아이디 또는 비밀번호가 일치하지 않습니다.');

                    } else {
                        alert('서버 오류가 발생했습니다. 관리자에게 문의하세요.');
                    }

                } else if (error.request) {
                    alert('서버와의 연결이 원활하지 않습니다.');

                } else {
                    alert('요청 중 오류가 발생했습니다.');
                }
            } else {
                console.error(error);
            }
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

export default TempLogin;