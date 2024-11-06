import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

import { ApiRes, ResComCodeDTO } from "@/definition/type.ts";
import { callAPI } from "@/utils/interceptor.ts";

interface ComCodeProps  {
    masterCodeId: string;
    selectId: string;
}

const ComCodeSelect: React.FC<ComCodeProps> = ({ masterCodeId, selectId }) => {
    const [options, setOptions] = useState<ResComCodeDTO[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>("");

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
                const res = await fetchComCodeList(masterCodeId);
                setOptions(res.result);

            } catch (error) {
                console.error(error);
            }
        };
        fetchOptions();
    }, [masterCodeId]);

    const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Input
            id={selectId}
            type="select"
            value={selectedValue}
            onChange={handleSelectChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
        >
            <option value="" disabled>선택</option>
            {options.map((option) => (
                <option key={option.codeId} value={option.codeId}>
                    {option.codeNm}
                </option>
            ))}
        </Input>
    );
};

export default ComCodeSelect;