import React, { useEffect, useState } from "react";
import { ApiRes, ResComCodeDTO } from "@/definition/type.ts";
import { callAPI } from "@/auth/interceptor.ts";

interface ComCodeProps  {
    groupId: string; // 공통코드 그룹
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>; // 외부 컴포넌트에서 react event 처리
    initText: string;
    classNm: string;
}

const ComCodeSelect: React.FC<ComCodeProps> = ({ groupId, selectId, value, onChange, initText, classNm }) => {
    const [options, setOptions] = useState<ResComCodeDTO[]>([]);

    // 공통코드 조회 API 호출
    const fetchComCodeList = async (groupId: string): Promise<ApiRes<ResComCodeDTO[]>> => {
        const url = `/com/code/list`;

        const jsonData = {
            groupId: groupId ?? ''
        };

        const res
            = await callAPI.post<ApiRes<ResComCodeDTO[]>>(url, jsonData);

        return res.data;
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res
                    = await fetchComCodeList(groupId);

                setOptions(res.result);

            } catch (error) {
                console.error('공통코드 조회 실패' + error);
            }
        };
        fetchOptions();
    }, [groupId]);

    return (
        <select
            id={selectId}
            value={value}
            onChange={onChange}
            className={classNm}
        >
            <option value="0">{initText}</option>
                {options.map((option) => (
                    <option key={option.codeId} value={option.codeId}>
                        {option.codeNm}
                    </option>
                ))}
        </select>
    );
};

export default ComCodeSelect;