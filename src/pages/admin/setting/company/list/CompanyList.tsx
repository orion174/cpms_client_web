import { useCallback, useState, useEffect } from "react";
import { CardHeader, Col, Row } from "reactstrap";

import { useSearchParams } from "@/hook/customHook.ts";
import { fetchAdminCompanyList } from "@/core/api/setting/companyService.ts";

import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";
import CompanySearchBar from "@/pages/admin/setting/company/list/components/CompanySearchBar.tsx";
import ManagementButton from "@/pages/admin/setting/company/list/components/ManagementButton.tsx";
import CompanyDataTable from "@/pages/admin/setting/company/list/components/CompanyDataTable.tsx";

import { ResCompanyListDTO, ReqCompanyListDTO, defaultCompanyListParams } from "@/pages/admin/setting/company/types.ts";

/* 📁 CPMS 관리 업체 데이터 목록 */
const CompanyList: React.FC = () => {

    const [ companyList, setCompanyList ] = useState<ResCompanyListDTO[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqCompanyListDTO>(defaultCompanyListParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultCompanyListParams());

    const fetchCompanyList = useCallback(async () => {
        const request = {
            ...searchParams
            , pageNo: currentPage
        };

        const response = await fetchAdminCompanyList(request);

        setCompanyList(response.content);
        setTotalCnt(response.totalElements);
    }, [searchParams, currentPage]);

    useEffect(() => {
        fetchCompanyList();
    }, [fetchCompanyList]);

    return (
        <>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col md="10" className="text-left">
                        {/* 회사 검색 */}
                        <CompanySearchBar
                            searchParams={searchParams}
                            updateSearchParams={updateSearchParams}
                            resetSearchParams={resetSearchParams}
                            onSearch={fetchCompanyList}
                        />
                    </Col>
                    <Col md="2">
                        {/* 각종 버튼 */}
                        <ManagementButton />
                    </Col>
                </Row>
            </CardHeader>

            {/* 업체 데이터 테이블 */}
            <CompanyDataTable companyList={companyList} />

            {/* 페이징 */}
            <PaginationComponent
                totalCnt={totalCnt}
                currentPage={currentPage}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
};

export default CompanyList;