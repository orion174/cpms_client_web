import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import React from "react";

interface PaginationProps {
  totalCnt: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalCnt,
  currentPage,
  pageSize,
  onPageChange,
}) => {

  const totalPages = Math.ceil(totalCnt / pageSize); // 총 페이지 수
  const maxVisiblePages = 5; // 한 번에 표시할 페이지 수

  const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // 범위를 벗어나면 무시
    onPageChange(page); // 부모 컴포넌트의 페이지 변경 핸들러 호출
  };

  return (
    <Pagination className="pagination mb-0">

      <PaginationItem disabled={startPage === 1}>
        <PaginationLink onClick={() => handlePageChange(startPage - 1)}>
          <i className="fas fa-angle-left" />
        </PaginationLink>
      </PaginationItem>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
        (page) => (
          <PaginationItem key={page} active={page === currentPage}>
            <PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
          </PaginationItem>
        )
      )}

      <PaginationItem disabled={endPage === totalPages}>
        <PaginationLink onClick={() => handlePageChange(endPage + 1)}>
          <i className="fas fa-angle-right" />
        </PaginationLink>
      </PaginationItem>

    </Pagination>
  );
};

export default PaginationComponent;