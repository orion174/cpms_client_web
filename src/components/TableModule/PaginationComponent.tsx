/* 📁 페이징 모듈 - 테이블 타입 */
import React from "react";
import { CardFooter, Col, Row } from "reactstrap";

import PaginationBar from "@/components/TableModule/PaginationBar.tsx";

interface PaginationProps {
    totalCnt: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

const PaginationComponent:React.FC<PaginationProps> = (
    { totalCnt, currentPage, pageSize, onPageChange }
) => {
    return (
        <>
            <CardFooter className="py-4">
                <Row className="align-items-center">
                    <Col md="6">
                        <h4 className="mb-0">총 <span>{totalCnt}</span> 건</h4>
                    </Col>
                    <Col md="6" className="d-flex justify-content-end">
                        <PaginationBar
                            totalCnt={totalCnt}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </Col>
                </Row>
            </CardFooter>
        </>
    );
};

export default PaginationComponent;