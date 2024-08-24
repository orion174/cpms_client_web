import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [userId, setUserId] = useState('');
    const [userNm, setUserNm] = useState('');
    const [entityList, setEntityList] = useState([]);

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
            const url = '/api/test/save';
            const response = await axios.post(`${import.meta.env.VITE_API_URL}${url}`, {
                userId: userId,
                userNm: userNm,
            });
            findList();
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div>
            <form onSubmit={saveData}>
                아이디: <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                이름: <input type="text" value={userNm} onChange={(e) => setUserNm(e.target.value)} />
                <button type="submit">전송</button>
            </form>

            <div>
                <h2>TestEntityList DB</h2>
                <ul>
                    {Array.isArray(entityList) && entityList.length > 0 ? (
                        entityList.map((entity) => (
                            <li key={entity.userMasterId}>
                                아이디: {entity.userId} / 이름: {entity.userNm}
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