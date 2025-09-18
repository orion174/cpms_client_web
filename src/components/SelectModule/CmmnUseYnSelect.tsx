import React from "react";

interface UseYnSelectProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    initText: string;
    classNm: string;
};

const useYnCode = [
    { codeId: "Y", codeNm: "사용" },
    { codeId: "N", codeNm: "미사용" }
];

const CmmnUseYnSelect: React.FC<UseYnSelectProps> = ({
    value,
    onChange,
    initText,
    classNm
}) => {
    return (
        <>
            <select
                value={value}
                className={classNm}
                onChange={onChange}
            >
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
