import { CardHeader, Col, Row } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProjectSearchBar from "./components/ProejectSearchBar.tsx";
import AddButton from "@/pages/admin/setting/project/list/components/AddButton.tsx";
import ProjectDataTable from "./components/ProjectDataTable.tsx";
import PaginationComponent from "@/components/TableModule/PaginationComponent.tsx";

import { useSearchParams } from "@/hooks/customHook.ts";
import { fetchAdminProjectList } from "@/server/api/setting/projectService.ts";

import type { ReqProjectListDTO, ResProjectListDTO } from "@/types/setting/projectTypes.ts";

/* 📁 관리 프로젝트 데이터 목록 */
const ProjectList: React.FC = () => {
    const location = useLocation();

    const [ projectList, setProjectList ] = useState<ResProjectListDTO[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalCnt, setTotalCnt ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<ReqProjectListDTO>(defaultProjectListParams());
    const { updateSearchParams, resetSearchParams } = useSearchParams(setSearchParams, defaultProjectListParams());

    const fetchProjectList = useCallback(async (): Promise<void> => {
        const request = {
            ...searchParams
            , pageNo: currentPage
        };

        const response = await fetchAdminProjectList(request);

        setProjectList(response.content);
        setTotalCnt(response.totalElements);
    }, [searchParams, currentPage]);

    useEffect((): void => {
        if (!location.state || location.state.reload) {
            fetchProjectList();
        }
    }, [location.state, fetchProjectList]);

    return (
        <>
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col md="10" className="text-left">
                        {/* 프로젝트 검색 */}
                        <ProjectSearchBar
                            searchParams={searchParams}
                            updateSearchParams={updateSearchParams}
                            resetSearchParams={resetSearchParams}
                            onSearch={fetchProjectList}
                        />
                    </Col>
                    <Col md="2">
                        {/* 프로젝트 추가 모달 버튼 */}
                        <AddButton />
                    </Col>
                </Row>
            </CardHeader>

            {/* 프로젝트 데이터 테이블 */}
            <ProjectDataTable projectList={projectList} />

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

const defaultProjectListParams = (): ReqProjectListDTO => ({
    pageNo: 1,
    pageSize: 10,
    companyId: 0,
    progressYn: "",
    projectNm: ""
});

export default ProjectList;