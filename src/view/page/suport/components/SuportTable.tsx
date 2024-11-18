import React from 'react';
import { Table, Badge } from 'reactstrap';
import { SuportList } from "@/definition/type.ts";

interface TableProps {
    data: SuportList[];
    onRowClick: (suportReqId : number) => void;
}

interface RowProps {
    row: SuportList;
}

const SuportTable: React.FC<TableProps> = ({ data, onRowClick }) => {
    return (
        <>
            {data.length > 0 ? (
                <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                    <tr>
                        <th className="my-input-text-thead">요청유형</th>
                        <th className="my-input-text-thead">회사명</th>
                        <th className="my-input-text-thead">프로젝트</th>
                        <th className="my-input-text-thead">제목</th>
                        <th className="my-input-text-thead">담당자</th>
                        <th className="my-input-text-thead">처리상태</th>
                        <th className="my-input-text-thead">등록일</th>
                        <th className="my-input-text-thead">처리기한</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <TableRow key={row.suportReqId} row={row} onRowClick={onRowClick} />
                    ))}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center py-4">
                    <h4 className="text-muted">검색된 프로젝트 문의글이 없습니다.</h4>
                </div>
            )}
        </>
    );
};

const TableRow: React.FC<RowProps> = ({ row, onRowClick }) => {
    // 상태 코드에 따른 색상 매핑
    const statusColors: { [key: string]: string } = {
        "10": "warning",
        "20": "info",
        "30": "primary",
        "40": "danger",
        "50": "success",
    };

    const renderDeadline = () => {
        const today = new Date(); // 오늘 날짜
        today.setHours(0, 0, 0, 0); // 시간을 초기화해서 날짜 비교
        const targetDate = new Date(row.reqDate); // 처리 기한 날짜
        targetDate.setHours(0, 0, 0, 0); // 시간을 초기화해서 날짜 비교

        const diffTime = targetDate.getTime() - today.getTime(); // 밀리초 차이
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일수 차이

        if (diffDays === 0) {
            // 처리 기한이 오늘인 경우
            return <span style={{ color: "green", fontWeight: "bold" }}>당일</span>;
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
                <span style={{ color: "#007bff", fontWeight: "bold" }}>
                    {row.reqDate}
                </span>
            );
        }
    };

    return (
        <tr key={row.suportReqId} onClick={() => onRowClick(row.suportReqId)} style={{ cursor: "pointer" }} >
            <td className="text-center align-middle">
                <Badge color={row.requestCdNm === '문의' ? 'primary' : 'danger'}
                       className="px-3 py-2 fs-5 fw-bold pill custom-badge-status">
                    {row.requestCdNm}
                </Badge>
            </td>
            <td className="my-input-text-tbody">{row.userCompanyNm}</td>
            <td className="my-input-text-tbody">{row.reqProjectNm}</td>
            <td className="my-input-text-tbody">{row.suportTitle}</td>
            <td className="my-input-text-tbody">{row.resUserNm ?? '미지정'}</td>
            <td className="text-center align-middle">
                <Badge color={statusColors[row.statusCd]} className="px-3 py-2 fs-5 fw-bold custom-badge-request">
                    {row.statusCdNm}
                </Badge>
            </td>
            <td className="my-input-text-tbody">{row.regDt}</td>
            <td className="my-input-text-tbody">{renderDeadline()}</td>
        </tr>
    );
};

export default SuportTable;