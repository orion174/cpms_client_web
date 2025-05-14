import {
  Card, CardHeader, CardFooter, Container, Row, Button, Col
} from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { utf8ToBase64 } from "@/utils/common.ts";
import { apiClient } from "@/core/api/client.ts";

import ExcelDownLoadButton from "@/components/Module/ExcelDownLoadButton.tsx";
import PaginationComponent from "@/components/Module/Pagination.tsx";
import TempHeader from "@/view/layout/Headers/TempHeader.tsx";

import SupportSearchBar from "./components/SupportSearchBar.tsx";
import SupportTable from "./components/SupportTable.tsx";

import { ResSupportListDTO, SupportList } from "./../types.ts";

const RequestList: React.FC = () => {
    const navigate = useNavigate();

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ data, setData ] = useState<SupportList[]>([]);
    const [ totalCnt, setTotalCnt ] = useState(0);
    const [ authType, setAuthType ] = useState("");

    // 검색 값
    const [ searchParams, setSearchParams ] = useState({
        searchCompanyId: 0,
        searchRequestCd: 0,
        searchStatusCd: 0,
        searchStartDt: "",
        searchEndDt: "",
        searchTitle: "",
    });

    // 검색 값 매핑
    const updateSearchParams = (key: keyof typeof searchParams, value: string) => {
        setSearchParams((prev) => ({ ...prev, [key]: value }));
    };

    // 검색 초기화
    const handleClearSearch = () => {
        setSearchParams({
            searchCompanyId: 0,
            searchRequestCd: 0,
            searchStatusCd: 0,
            searchStartDt: "",
            searchEndDt: "",
            searchTitle: "",
        });

        const pickerInput = document.getElementById("searchDate") as HTMLInputElement;

        if (pickerInput) pickerInput.value = "";
    };

    // 유지보수 목록 데이터를 가져온다.
    const fetchSupportList = useCallback(async () => {
        try {
            const endPoint = `/api/support/list`;
            
            const result = await apiClient.post<ResSupportListDTO>(endPoint, {
                ...searchParams,
                pageNo: currentPage,
                pageSize: 10,
            });

            setTotalCnt(result.totalCnt);
            setData(result.supportList);
            setAuthType(result.authType);
        } catch (error) {
            console.error("유지보수 목록 조회 실패:", error);
        }
    }, [searchParams, currentPage]);

    useEffect(() => {
        fetchSupportList();
    },  [fetchSupportList]);

    // 접수대기인 게시글을 클릭하여 상세 페이지로 이동 전, 접수완료로 자동 업데이트 처리한다.
    const handleRowClick = useCallback(async (supportRequestId: number, statusCd: number) => {
        try {
            if (statusCd === 3) {
                const endPoint = `/api/support/update-status`;

                const jsonData = {
                    supportRequestId,
                    statusCd: 4,
                };

                await apiClient.post(endPoint, jsonData);
            }

            const encodeId = utf8ToBase64(supportRequestId.toString());
            navigate(`/admin/support/detail?support_page=${encodeId}`);
        } catch (error) {
            console.error("상태 업데이트 실패", error);
        }
    }, [navigate]);

    return (
        <>
            <TempHeader/>

            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <Col md="10" className="text-left">
                                        <SupportSearchBar
                                            authType={authType}
                                            searchParams={searchParams}
                                            updateSearchParams={updateSearchParams}
                                            onSearch={fetchSupportList}
                                            onReset={handleClearSearch}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <div className="d-flex justify-content-end align-items-center gap-2">
                                            <ExcelDownLoadButton />
                                            <Button
                                                type="button"
                                                color="default"
                                                onClick={() => navigate("/admin/support/form", { state: { formType: "insert" } })}
                                            >
                                                등록
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <SupportTable
                                data={data}
                                onRowClick={(supportRequestId: number) => {
                                    const row
                                        = data.find((item) => item.supportRequestId === supportRequestId);

                                    if (row) handleRowClick(row.supportRequestId, row.statusCd);
                                }}
                            />

                            <CardFooter className="py-4">
                                <Row className="align-items-center">
                                    <Col md="6">
                                        <h4 className="mb-0">총 <span>{totalCnt}</span> 건</h4>
                                    </Col>
                                    <Col md="6" className="d-flex justify-content-end">
                                        <PaginationComponent
                                            totalCnt={totalCnt}
                                            currentPage={currentPage}
                                            pageSize={10}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default RequestList;
