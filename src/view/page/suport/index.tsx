import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Col
} from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/view/layout/Headers/Header.jsx";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import PaginationComponent from "@/components/Module/Pagination.tsx";
import { ApiRes, ResSuportListDTO, SuportList } from "@/definition/type.ts";
import LitePicker from "@/components/Module/LitePicker.tsx";
import { callAPI } from "@/utils/interceptor.ts";

import SuportTable from "./components/SuportTable.tsx";

const Suport = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<SuportList[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0);

  const [searchParams, setSearchParams] = useState({
    schCompanyId: 0,
    schRequestCd: "",
    schStatusCd: "",
    schStartDt: "",
    schEndDt: "",
    schTitle: "",
  });

  const updateSearchParams = (key: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 유지보수 List 호출
  const fetchSuportList = useCallback(async () => {
    const url = `/api/suport/list`;
    try {
      const res = await callAPI.post<ApiRes<ResSuportListDTO>>(url, {
        ...searchParams,
        pageNo: currentPage,
        pageSize: 10,
      });
      setTotalCnt(res.data.result.suportCnt);
      setData(res.data.result.suportList);
    } catch (error) {
      console.error("데이터 조회 실패:", error);
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    fetchSuportList();
  }, [fetchSuportList]);

  // 검색 초기화
  const handleClear = () => {
    setSearchParams({
      schCompanyId: 0,
      schRequestCd: "",
      schStatusCd: "",
      schStartDt: "",
      schEndDt: "",
      schTitle: "",
    });

    const pickerInput = document.getElementById("schDate") as HTMLInputElement;
    if (pickerInput) {
      pickerInput.value = ""; // 입력 필드 초기화
    }
  };

  return (
      <>
        <Header />

        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col md="10" className="text-left">
                      <Form
                          inline
                          className="d-flex flex-wrap"
                          style={{ gap: "0.5rem" }}
                      >
                        <InputGroup>
                          <Input
                              id="schCompanyId"
                              type="select"
                              className="my-input-text form-control"
                              value={searchParams.schCompanyId}
                              onChange={(e) =>
                                  updateSearchParams("schCompanyId", e.target.value)
                              }
                          >
                            <option value="">업체 선택</option>
                            <option value="1">CODEIDEA</option>
                            <option value="2">강남구청</option>
                            <option value="3">중랑구청</option>
                          </Input>
                        </InputGroup>
                        <InputGroup>
                          <ComCodeSelect
                              masterCodeId="10"
                              selectId="schRequestCd"
                              value={searchParams.schRequestCd}
                              initText={"요청유형 선택"}
                              onChange={(e) =>
                                  updateSearchParams("schRequestCd", e.target.value)
                              }
                          />
                        </InputGroup>
                        <InputGroup>
                          <ComCodeSelect
                              masterCodeId="20"
                              selectId="schStatusCd"
                              initText={"처리상태 선택"}
                              value={searchParams.schStatusCd}
                              onChange={(e) =>
                                  updateSearchParams("schStatusCd", e.target.value)
                              }
                          />
                        </InputGroup>
                        <InputGroup className="input-group-dynamic">
                          <LitePicker
                              inputId="schDate"
                              singleMode={false}
                              placeholder={"등록일 범위 선택"}
                              onDateChange={(startDate, endDate) => {
                                  setSearchParams((prev) => ({
                                  ...prev,
                                  schStartDt: startDate,
                                  schEndDt: endDate || "",
                                }));
                              }}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58 text-primary" />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                          <Input
                              id="schTitle"
                              type="text"
                              className="my-input-text"
                              placeholder="문의 제목 입력"
                              value={searchParams.schTitle}
                              onChange={(e) =>
                                  updateSearchParams("schTitle", e.target.value)
                              }
                          />
                        </InputGroup>
                        <Button onClick={fetchSuportList} color="primary">검색</Button>
                        <Button onClick={handleClear} color="primary" outline>초기화</Button>
                      </Form>
                    </Col>
                    <Col md="2" className="d-flex justify-content-end align-items-center">
                      <Button type="button" color="success">
                        엑셀다운
                      </Button>
                      <Button
                          type="button"
                          color="default"
                          onClick={() =>
                              navigate("/admin/suportForm", {
                                state: { formType: "insert" },
                              })
                          }
                      >등록</Button>
                    </Col>
                  </Row>
                </CardHeader>

                <SuportTable data={data} />

                <CardFooter className="py-4">
                  <Row className="align-items-center">
                    <Col md="6">
                      <h4 className="mb-0">
                        총 <span>{totalCnt}</span> 건
                      </h4>
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

export default Suport;
