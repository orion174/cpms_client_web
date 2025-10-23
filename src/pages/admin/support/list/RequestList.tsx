import { Card, CardHeader, Container, Row, Button, Col } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { utf8ToBase64 } from "@/utils/cmmn";
import { getUserAuthType } from "@/utils/cmmn";
import { useSearchParams } from "@/hooks/customHook";

import PaginationComponent from "@/components/TableModule/PaginationComponent";
import TempHeader from "@/layout/StatusArea/Status";
import Empty from "@/layout/StatusArea/Empty";
import SupportSearchBar from "./components/SupportSearchBar";
import SupportTable from "./components/SupportTable";

import { fetchSupportListApi, updateStatusApi } from "@/server/api/support/service.ts";
import type { SupportList, ReqSupportListDTO } from "@/types/support/types";

const RequestList: React.FC = () => {
    const navigate = useNavigate();

    const [ authType, setAuthType ] = useState<string | null>(null);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ data, setData ] = useState<SupportList[]>([]);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqSupportListDTO>(defaultSearchParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultSearchParams());

    const fetchSupportList = useCallback(async (): Promise<void> => {
        const request = {
            ...searchParams,
            pageNo: currentPage,
        };

        const result = await fetchSupportListApi(request);

        if (!result) {
            setTotalCnt(0);
            setData([]);
            return;
        }

        setTotalCnt(result.totalCnt);
        setData(result.supportList);

    }, [ searchParams, currentPage ]);

    useEffect((): void => {
        const init = async (): Promise<void> => {
            const type = await getUserAuthType();

            if (!type) {
                navigate("/auth/login");
                return;
            }

            setAuthType(type);
            await fetchSupportList();
        };

        init();
    }, [ fetchSupportList ]);

    const handleRowClick
        = useCallback(async (supportRequestId: number, statusCd: number): Promise<void> => {
            // 접수대기인 게시물을 최초 클릭시, 접수완료 상태로 바뀐다.
            if (statusCd === 3) {
                await updateStatusApi(supportRequestId);
            }

            const encodeId = utf8ToBase64(supportRequestId.toString());
            navigate(`/admin/support/view?support_page=${encodeId}`);
        }, [ navigate ]
    );

    if (authType === null) return null;

    return (
        <>
            {authType === "TEMP" ? <Empty /> : <TempHeader />}

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
                                            resetSearchParams={resetSearchParams}
                                            onSearch={fetchSupportList}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <div className="d-flex justify-content-end align-items-center gap-2">
                                            <Button
                                                type="button"
                                                color="default"
                                                onClick={() => navigate("/admin/support/form?formType=insert")}
                                            >
                                                문의등록
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <SupportTable
                                data={data}
                                onRowClick={(supportRequestId: number) => {
                                    const row = data.find((item) => item.supportRequestId === supportRequestId);
                                    if (row) handleRowClick(row.supportRequestId, row.statusCd);
                                }}
                            />

                            <PaginationComponent
                                totalCnt={totalCnt}
                                currentPage={currentPage}
                                pageSize={10}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

const defaultSearchParams = (): ReqSupportListDTO => ({
    pageNo: 1,
    pageSize: 10,
    searchCompanyId: 0,
    searchRequestCd: 0,
    searchStatusCd: 0,
    searchStartDt: "",
    searchEndDt: "",
    searchTitle: "",
});

export default RequestList;
