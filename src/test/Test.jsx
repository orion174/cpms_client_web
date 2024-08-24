import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userNm, setUserNm] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [entityList, setEntityList] = useState([]);

    const [authNum, setAuthNum] = useState('');

    useEffect(() => {
        findList();
    }, []);

    const findList = async () => {

        try {
            const url = '/api/test/find';
            console.log(`${import.meta.env.VITE_API_URL}${url}`);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${url}`);
            setEntityList(response.data);
        } catch (error) {
            console.error('error', error);
        }
    };

    const saveData = async (e) => {
        e.preventDefault();
        try {
            const jsonData = {
                userId: userId,
                userNm: userNm
            }
            const url = '/api/test/save';
            const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);
            findList();
        } catch (error) {
            console.error('error', error);
        }
    };

    const sendSMS = async () => {
        const jsonData = {
            receiver : userPhone
        };
        const url = '/api/user/signup/sendSMS';
        const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);
        if (response.data.result === 0) {
            alert('인증번호가 전송되었습니다. 입력해 주세요.');
        } else {
            alert('인증번호 전송에 실패했습니다.');
        }
    }

    const authPhone = async () => {
        try {
            const jsonData = {
                originPhone: userPhone,
                authCheckCode: authCode,
            };
            const url = '/api/common/authPhone';
            const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);
            const result = response.data.result;

            if (result === 1) {
                setIsVerified(true);
                alert('본인인증에 성공했습니다.');
            } else if (result === -1) {
                alert('본인인증 번호가 일치하지 않습니다.');
            } else if (result === 0) {
                alert('인증번호 유효기간이 만료되었습니다.');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('인증 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <div>
                ID : <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>
            <div>
                PW : <input type="text" value={userPw} onChange={(e) => setUserPw(e.target.value)}/>
            </div>
            <div>
                휴대폰 : <input type="text" className="my-phone" value={userPhone}
                             onChange={(e) => setUserPhone(e.target.value)}
                             maxLength={11}
                        />
                       <button onClick={sendSMS}>인증</button>
            </div>
            <div>
                인증번호 : <input type="text" className="my-auth" value={authNum}
                              onChange={(e) => setAuthNum(e.target.value)}
                              maxLength={6}
                          />
                         <button onClick={authPhone}>확인</button>
            </div>
            <div>
                이름: <input type="text" value={userNm} onChange={(e) => setUserNm(e.target.value)}/>
            </div>
            <div>
                소속회사:
                <select onChange={(e) => setUserCompanyId(e.target.value)}>
                    <option value="1">CODEIDEA</option>
                </select>
            </div>
            <button onClick={saveData}>전송</button>
            <div>
                <h2>TestEntityList DB</h2>
                <ul>
                    {Array.isArray(entityList) && entityList.length > 0 ? (
                        entityList.map((entity) => (
                            <li key={entity.userMasterId}>
                                아이디: {entity.userId} / 이름: {entity.userNm} / 번호: {}
                            </li>
                        ))
                    ) : (
                        <li>데이터가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Test;