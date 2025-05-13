import React from "react";
import { Badge } from "reactstrap";

import { SupportList } from "../../types.ts";

interface RowProps {
    row: SupportList;
    onRowClick: (supportRequestId: number) => void;
}

const SupportTableRow: React.FC<RowProps> = ({ row, onRowClick }) => {
    // 요청 유횽 코드에 따른 색상 매핑
    const requestCdColors: { [key: number]: string} = {
        1: "primary",
        2: "danger"
    };

    // 처리 상태 코드에 따른 색상 매핑
    const statusColors: { [key: number]: string } = {
        3: "warning",
        4: "info",
        5: "primary",
        6: "danger",
        7: "success",
        8: "dark",
    };

    // 처리기한 따라 다르게 표시
    const renderDeadline = () => {
        const today = new Date(); // 오늘 날짜
        today.setHours(0, 0, 0, 0); // 시간을 초기화해서 날짜 비교

        const targetDate = new Date(row.requestDate); // 처리 기한 날짜
        targetDate.setHours(0, 0, 0, 0); // 시간을 초기화해서 날짜 비교

        const diffTime = targetDate.getTime() - today.getTime(); // 밀리초 차이
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일수 차이

        if (diffDays === 0) {
            // 처리 기한이 오늘인 경우
            return <span style={{ color: "green", fontWeight: "bold" }}>기한 당일</span>;

        } else if (diffDays < 0) {
            // 처리 기한이 초과된 경우
            return (
                <span style={{ color: "red", fontWeight: "bold" }}>
                    {Math.abs(diffDays)}일 초과
                </span>
            );

        } else {
            // 처리 기한 전인 경우
            return (
                <span style={{ color: "green", fontWeight: "bold" }}>
                    {row.requestDate}
                </span>
            );
        }
    };

    return (
        <tr onClick={() => onRowClick(row.supportRequestId)} style={{ cursor: "pointer" }}>
            <td className="text-center align-middle">
                <Badge color={requestCdColors[row.requestCd]} className="px-3 py-2 fs-5 fw-bold pill custom-badge-status">
                    {row.requestNm}
                </Badge>
            </td>
            <td className="my-input-text-tbody">{row.userCompanyNm}</td>
            <td className="my-input-text-tbody">{row.requestProjectNm}</td>
            <td className="my-input-text-tbody">{row.supportTitle}</td>
            <td className="my-input-text-tbody">{row.responseUserNm ?? '미지정'}</td>
            <td className="my-input-text-tbody">{row.regDt}</td>
            <td className="my-input-text-tbody">{renderDeadline()}</td>
            <td className="text-center align-middle">
                <Badge color={statusColors[row.statusCd]} className="px-3 py-2 fs-5 fw-bold custom-badge-request">
                    {row.statusNm}
                </Badge>
            </td>
        </tr>
    );
};

export default SupportTableRow;
