import React, { useEffect, useState } from "react";
import { ApiRes, ResComCodeDTO } from "@/definition/type.ts";
import { callAPI } from "@/utils/interceptor.ts";

interface ComCodeProps  {
    masterCodeId: string;
    selectId: string;
    value: string; // 외부 컴포넌트에서 value 처리
    onChange: React.ChangeEventHandler<HTMLSelectElement>; // 외부 컴포넌트에서 react event 처리
}

/**
 * 공통코드 Select Option
 * @param masterCodeId
 * @param selectId
 * @param value
 * @param onChange
 * @constructor
 */
const ComCodeSelect: React.FC<ComCodeProps> = ({ masterCodeId, selectId, value, onChange }) => {
    const [options, setOptions] = useState<ResComCodeDTO[]>([]);

    // 공통코드 조회 API
    const fetchComCodeList = async (masterCodeId: string): Promise<ApiRes<ResComCodeDTO[]>> => {
        const url = `/com/code/list`;
        const jsonData = {
            masterCodeId: masterCodeId ?? ''
        };

        const res
            = await callAPI.post<ApiRes<ResComCodeDTO[]>>(url, jsonData);

        return res.data;
    };

    useEffect(() => {
        const fetchOptions = async() => {
            try {
                const res
                    = await fetchComCodeList(masterCodeId);
                setOptions(res.result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOptions();
    }, [masterCodeId]);

    return (
        <select
            id={selectId}
            className="my-input-text form-control"
            value={value}
            onChange={onChange}
        >
            <option value="" disabled>선택</option>
            {options.map((option) => (
                <option key={option.codeId} value={option.codeId}>
                    {option.codeNm}
                </option>
            ))}
        </select>
    );
};

export default ComCodeSelect;