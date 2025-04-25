import React, { useEffect, useState } from "react";
import {ApiRes, ResProjectDTO} from "@/definition/commonType.ts";
import { callAPI } from "@/server/interceptor.ts";

interface CpmsProjectProps  {
    companyId?: number;
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsProjectSelect: React.FC<CpmsProjectProps> = ({companyId, selectId, value, onChange, initText, classNm}) => {
    const [options, setOptions] = useState<ResProjectDTO[]>([]);

    // CPMS 프로젝트
    const fetchCpmsProjectList = async (companyId: number): Promise<ApiRes<ResProjectDTO[]>> => {
        const url = `/api/project/list`;

        const jsonData = {
            companyId: companyId ?? 0
        }

        const response = await callAPI.post<ApiRes<ResProjectDTO[]>>(url, jsonData);

        return response.data;
    }
    
    useEffect(() => {
        const projectOptions = async () => {
            const response = await fetchCpmsProjectList(companyId);
            setOptions(response.result);
        };
        projectOptions();
    }, [companyId]);

    return (
        <>
            <select
                id={selectId}
                value={value}
                onChange={onChange}
                className={classNm}
            >
                <option value="0">{initText}</option>
                    {options.map((option) => (
                        <option key={option.projectId} value={option.projectId}>
                            {option.projectNm}
                        </option>
                    ))}
            </select>
        </>
    );
};

export default CpmsProjectSelect;