import React from 'react';
import { Table, Badge } from 'reactstrap';

import SupportTableRow from "./SupportTableRow.tsx";
import { SupportList } from "../../types.ts";

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
                        data.map((row) => (
                            <SupportTableRow key={row.supportRequestId} row={row} onRowClick={onRowClick}/>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center align-middle">
                                <h4 className="text-muted">검색된 프로젝트 문의글이 없습니다.</h4>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default SupportTable;