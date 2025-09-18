import React, { useEffect, useState } from "react";

import { companyList } from "@/server/api/setting/companyService.ts";
import type { ResCompanyListDTO } from "@/types/setting/companyTypes.ts";

interface CpmsCompanyProps {
    companyId?: number;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
}

const CpmsCompanySelect: React.FC<CpmsCompanyProps> = ({
    companyId = 0,
    value,
    onChange,
    initText,
    classNm
}) => {
    const [ options, setOptions ] = useState<ResCompanyListDTO[]>([]);
    const [ hasAutoSelected, setHasAutoSelected ] = useState(false);

    useEffect((): void => {
        const fetchCompanys = async (): Promise<void> => {
            const response = await companyList(companyId);
            setOptions(response ?? []);
        };

        fetchCompanys();
    }, [companyId]);

    // 옵션이 하나뿐이면 자동 선택 (단 한 번만 실행)
    useEffect((): void => {
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