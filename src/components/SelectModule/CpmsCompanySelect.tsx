import React, { useEffect, useState } from "react";
import { apiClient } from "@/core/api/client.ts";
import type { ResCompanyDTO } from "@/types/cmmn.ts";

interface CpmsCompanyProps {
    companyId?: number;
    selectId?: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsCompanySelect: React.FC<CpmsCompanyProps> = ({
    companyId = 0,
    selectId,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResCompanyDTO[]>([]);
    const [ hasAutoSelected, setHasAutoSelected ] = useState(false);

    useEffect(() => {
        const fetchCompanys = async (): Promise<void> => {
            const jsonData = {
                companyId: companyId ?? 0
            };

            const response
                = await apiClient.post<ResCompanyDTO[]>('/api/setting/company/list', jsonData);

            setOptions(response);
        };

        fetchCompanys();
    }, [companyId]);

    // 옵션이 하나뿐이면 자동 선택 (단 한 번만 실행)
    useEffect(() => {
        if (options.length === 1 && !hasAutoSelected) {

            const fakeEvent = {
                target: { value: options[0].companyId.toString() }
            } as React.ChangeEvent<HTMLSelectElement>;

            onChange(fakeEvent);
            setHasAutoSelected(true);
        }
    }, [options, hasAutoSelected, onChange]);

    return (
        <select
            id={selectId}
            value={value}
            className={classNm}
            onChange={onChange}
        >
            <option value="">{initText}</option>

            {options.map((option) => (
                <option key={option.companyId} value={option.companyId}>
                    {option.companyNm}
                </option>
            ))}
        </select>
    );
};

export default CpmsCompanySelect;