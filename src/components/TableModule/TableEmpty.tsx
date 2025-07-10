import React from "react";

interface TableEmptyProps {
    colSpan: number;
    message?: string;
}

const TableEmpty: React.FC<TableEmptyProps> = ({ colSpan, message = "표시할 항목이 없습니다." }) => {
    return (
        <tr>
            <td colSpan={colSpan} className="text-center align-middle">
                <h4 className="text-muted">{message}</h4>
            </td>
        </tr>
    );
};

export default TableEmpty;