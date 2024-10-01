import React, { useEffect, useState, useRef } from 'react';
import { loadDaumPostCodeModal } from '@/utils/daumPostcode.ts'
import { formatPhoneNumber } from '@/utils/format.ts'
import { initializeSmartEditor, getEditorContent, setEditorContent } from '@/utils/smartEditor.js';
import axios from 'axios';

const Test = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userNm, setUserNm] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [authNum, setAuthNum] = useState('');
    const [userZoneCode, setUserZoneCode] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userDetailAddress, setUserDetailAddress] = useState('');

    const [entityList, setEntityList] = useState([]);

    const oEditors = useRef([]);

    /* 컴포넌트가 마운트될 때 스크립트 로드 */
    useEffect(() => {
        const loadScripts = () => {
            // Daum Postcode 스크립트 로드
            const daumScript = document.createElement('script');
            daumScript.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            daumScript.async = true;

            document.body.appendChild(daumScript);

            // SmartEditor 스크립트 로드
            const editorScript = document.createElement('script');

            editorScript.src = '/smarteditor/js/HuskyEZCreator.js';
            editorScript.type = 'text/javascript';
            editorScript.charset = 'utf-8';

            editorScript.onload = () => {
                initializeSmartEditor('editorTxt', oEditors.current)
                    .then(() => {})
                    .catch((error) => {
                        console.error('SmartEditor 초기화 중 오류 발생:', error);
                    });
            };

            document.body.appendChild(editorScript);

            return () => {
                document.body.removeChild(daumScript);
                document.body.removeChild(editorScript);
            };
        };

        loadScripts();
    }, []);

    /* 테스트 데이터 로드 */
    useEffect(() => {
        findList();
    }, []);

    /* 테스트 데이터 조회 */
    const findList = async () => {
        try {
            const url = '/api/test/find';
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${url}`);

            setEntityList(response.data);
        } catch (error) {
            console.error('error', error);
        }
    };

    /*
     * 테스트 데이터 등록
     * @param e
     * @returns {Promise<void>}
     */
    const saveData = async (e) => {
        e.preventDefault();

        try {
            const editorContent = getEditorContent(oEditors.current);
            const jsonData = {
                'userId': userId
                , 'userPw': userPw
                , 'userNm': userNm
                , 'userPhone': userPhone
                , 'userZoneCode': userZoneCode
                , 'userAddress': userAddress
                , 'userDetailAddress': userDetailAddress
                , 'userInfo': editorContent
            }
            const url = '/api/test/save';
            const response
                = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);
            if(response.status === 200) {
                findList();
            } else {
                console.error('error', response.data.status);
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    /*
     * 인증번호 SMS 전송
     * @returns {Promise<void>}
     */
    const sendSMS = async () => {
        const jsonData = {
            'receiver' : userPhone
        };

        const url = '/api/user/signup/sendSMS';
        const response
            = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);

        if (response.data.result === 0) {
            alert('인증번호가 전송되었습니다. 입력해 주세요.');
        } else {
            alert('인증번호 전송에 실패했습니다.');
        }
    }

    /*
     * 휴대폰 번호 인증
     * @returns {Promise<void>}
     */
    const authPhone = async () => {
        try {
            const jsonData = {
                'originPhone': userPhone,
                'authCheckCode': authCode,
            };

            const url = '/api/common/authPhone';
            const response
                = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, jsonData);

            const result = response.data.result;

            if (result === 1) {
                alert('본인인증에 성공했습니다.');
            } else if (result === -1) {
                alert('본인인증 번호가 일치하지 않습니다.');
            } else if (result === 0) {
                alert('인증번호 유효기간이 만료되었습니다.');
            }
        } catch (error) {
            console.error('error' + error);
            alert('인증 처리 중 오류가 발생했습니다.');
        }
    };

    /* 주소선택 */
    const handleAddressClick = () => {
        loadDaumPostCodeModal(setUserZoneCode, setUserAddress);
    };

    return (
        <div>
            <div>
                ID :&nbsp;
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>
            <div>
                PW :&nbsp;
                <input type="text" value={userPw} onChange={(e) => setUserPw(e.target.value)}/>
            </div>
            <div>
                이름:&nbsp;
                <input type="text" value={userNm} onChange={(e) => setUserNm(e.target.value)}/>
            </div>
            <div>
                휴대폰 :&nbsp;
                <input type="text" className="my-phone" value={userPhone}
                       onChange={(e) => setUserPhone(e.target.value)}
                       maxLength={11}
                />
                <button onClick={sendSMS}>인증</button>
            </div>
            <div>
                인증번호 :&nbsp;
                <input type="text" className="my-auth" value={authNum}
                       onChange={(e) => setAuthNum(e.target.value)}
                       maxLength={6}
                />
                <button onClick={authPhone}>확인</button>
            </div>
            <div>
                주소 :&nbsp;
                <input type="text" value={userAddress} readOnly
                       onClick={handleAddressClick}
                       onChange={(e) => setUserAddress(e.target.value)}
                />
                <input type="hidden" value={userZoneCode} onChange={(e) => setUserZoneCode(e.target.value)}/>
            </div>
            <div>
                상세주소 :&nbsp;
                <input type="text" value={userDetailAddress} onChange={(e) => setUserDetailAddress(e.target.value)}/>
            </div>
            <div id="smarteditor">
                정보 :&nbsp;
                <textarea
                    name="editorTxt"
                    id="editorTxt"
                    rows={20}
                    cols={10}
                    style={{width: '100%'}}
                />
            </div>
            <div>
                <button onClick={saveData} type="button">저장</button>
            </div>
            <div>
                <h2>TestEntityList DB</h2>
                <ul>
                    {Array.isArray(entityList) && entityList.length > 0 ? (
                        entityList.map((entity) => (
                            <li key={entity.userMasterId}>
                                아이디: {entity.userId} / 이름: {entity.userNm} /
                                번호: {entity.userPhone ? formatPhoneNumber(entity.userPhone) : '-'} / 주소 1
                                : {entity.userAddress} / 주소 2 : {entity.userDetailAddress}
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