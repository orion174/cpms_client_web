import React from 'react';
import { Table } from 'reactstrap';

import SupportTableRow from "./SupportTableRow.tsx";
import type { SupportList } from "../../types.ts";

interface TableProps {
    data: SupportList[];
    onRowClick: (supportRequestId : number) => void;
}

const SupportTable: React.FC<TableProps> = ({ data, onRowClick }) => {
    return (
        <>
            <Table responsive className="align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th className="my-input-text-thead">요청유형</th>
                        <th className="my-input-text-thead">회사명</th>
                        <th className="my-input-text-thead">프로젝트</th>
                        <th className="my-input-text-thead">제목</th>
                        <th className="my-input-text-thead">담당자</th>
                        <th className="my-input-text-thead">요청일</th>
                        <th className="my-input-text-thead">처리기한</th>
                        <th className="my-input-text-thead">처리상태</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        <>
                            {data.map((row) => (
                                <SupportTableRow key={row.supportRequestId} row={row} onRowClick={onRowClick} />
                            ))}
                        </>
                    ) : (
                        <>
                            <tr>
                                <td colSpan={8} className="text-center align-middle">
                                    <h4 className="text-muted">표시할 항목이 없습니다.</h4>
                                </td>
                            </tr>
                        </>
                    )}

                    {/* 빈 행 추가 (10개 채우기) */}
                    {Array.from({ length: Math.max(0, 10 - data.length) }).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                            <td colSpan={8} style={{ height: "48px" }}></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default SupportTable;