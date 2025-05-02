import React from "react";

interface CpmsCompanyProps {
    selectId: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    classNm: string;
}

const CpmsCompanySelect: React.FC<CpmsCompanyProps> = ({
    selectId,
    value,
    onChange,
    classNm
}) => {
    return (
        <select id={selectId} value={value} className={classNm} onChange={onChange}>
            <option value="1">CODEIDEA</option>
        </select>
    );
};

export default CpmsCompanySelect;