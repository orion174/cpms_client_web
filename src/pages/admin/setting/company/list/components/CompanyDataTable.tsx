import React from 'react';
import { Table } from 'reactstrap';

import TableEmpty from "@/components/TableModule/TableEmpty.tsx";
import CompanyDataRow from "@/pages/admin/setting/company/list/components/CompanyDataRow.tsx";

import type { ResCompanyListDTO } from "@/types/setting/companyTypes.ts";

interface CompanyListProps {
    companyList: ResCompanyListDTO[];
};

const CompanyDataTable: React.FC<CompanyListProps> = ({ companyList }) => {
    return (
        <>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="col-type">No.</th>
                        <th className="col-type">등급</th>
                        <th className="col-type">업체 명</th>
                        <th className="col-type">주소</th>
                        <th className="col-type">등록일</th>
                        <th className="col-type">상태</th>
                    </tr>
                </thead>
                <tbody>
                    {companyList.length > 0
                        ? companyList.map((row, idx) => (
                            <CompanyDataRow key={row.companyId} index={idx} rowData={row} />
                        ))
                        : <TableEmpty colSpan={6} />
                    }

                    {/* 임시 : 빈 행 추가 (10개 채우기) */}
                    {Array.from({ length: Math.max(0, 10 - companyList.length) }).map((_, idx) => (
                        <tr key={`empty-${idx}`}>
                            <td colSpan={6} style={{ height: "48px" }}></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default CompanyDataTable;