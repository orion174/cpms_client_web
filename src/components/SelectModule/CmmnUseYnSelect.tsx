import React from "react";

interface UseYnSelectProps {
    selectId: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
};

const CmmnUseYnSelect: React.FC<UseYnSelectProps> = ({ selectId, value, onChange, initText, classNm }) => {
    const useYnCode = [
        { codeId: "Y", codeNm: "사용" },
        { codeId: "N", codeNm: "미사용" }
    ];

    return (
        <>
            <select id={selectId} value={value} className={classNm} onChange={onChange}>
                <option value="">{initText}</option>

                {useYnCode.map((option) => (
                    <option key={option.codeId} value={option.codeId}>
                        {option.codeNm}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CmmnUseYnSelect;
