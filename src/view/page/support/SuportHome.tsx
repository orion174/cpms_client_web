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
import useModalHook from "@/hook/useModal.ts";
import TempHeader from "@/view/layout/Headers/TempHeader.tsx";
import SuportTable from "./components/SuportTable.tsx";
import CommonCodeSelect from "@/components/Module/CommonCodeSelect.tsx";
import PaginationComponent from "@/components/Module/Pagination.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";
import { utf8ToBase64, base64ToUtf8 } from "@/utils/common.ts";
import { ApiRes, ResSuportListDTO, SuportList } from "@/definition/commonType.ts";
import { callAPI } from "@/server/interceptor.ts";

const SuportHome: React.FC = () => {
  const navigate = useNavigate();
  const { openCustomModal } = useModalHook();

  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const [ data, setData ] = useState<SuportList[]>([]);
  const [ totalCnt, setTotalCnt ] = useState<number>(0);
  const [ authType, setAuthType ] = useState<string>("");

  // 검색 데이터
  const [searchParams, setSearchParams] = useState({
    schCompanyId: "",
    schRequestCd: 0,
    schStatusCd: 0,
    schStartDt: "",
    schEndDt: "",
    schTitle: "",
  });

  // 검색 입력
  const updateSearchParams = (key: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 유지보수 List 호출
  const fetchSuportList = useCallback(async () => {
    const url = `/api/suport/list`;

    const res
        = await callAPI.post<ApiRes<ResSuportListDTO>>(url, {
            ...searchParams,
            pageNo: currentPage,
            pageSize: 10,
          });

    setTotalCnt(res.data.result.suportCnt);
    setData(res.data.result.suportList);
    setAuthType(res.data.result.authType);

  }, [searchParams, currentPage]);

  useEffect(() => {
    fetchSuportList();
  }, [fetchSuportList]);

  // 검색 초기화
  const handleClear = () => {
    setSearchParams({
      schCompanyId: "",
      schRequestCd: 0,
      schStatusCd: 0,
      schStartDt: "",
      schEndDt: "",
      schTitle: "",
    });

    const pickerInput = document.getElementById("schDate") as HTMLInputElement;

    if (pickerInput) {
      pickerInput.value = ""; // 입력 필드 초기화
    }
  };

  // 유지보수 상세 이동
  const handleRowClick = useCallback(
      async (suportReqId: number, statusCd: number) => {
        // 접수대기인 데이터는 상세 페이지 조회 시, 접수완료로 바뀐다.
        if(statusCd === 3) {
          const jsonData = {
            suportReqId: suportReqId
            , statusCd : 4
          }

          const url = `/api/suport/updateStatus`;
          
          const res
              = await callAPI.post<ApiRes<null>>(url, jsonData);

          if(res?.data?.result === false) {
            console.error('처리상태 수정 API 에러');
            return;
          }
        }

        const encodeId = utf8ToBase64(suportReqId.toString());
        navigate(`/admin/suport/detail?suport_page=${encodeId}`);
      },
      [navigate]
  );

  // 엑셀 다운로드
  const handleExcelDown = () => {
      openCustomModal({ title: "알림", message: "해당 기능은 준비 중입니다.", isConfirm: false });
      return;
  };

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
                      <Form
                          inline
                          className="d-flex flex-wrap"
                          style={{ gap: "0.5rem" }}
                      >
                        <InputGroup>
                          {/* TODO 업체 리스트 선택 컴포넌트 구현 */}
                          {authType !== "USER" && (
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
                              <option value="1">CodeIdea</option>
                              <option value="2">Heritage</option>
                              <option value="3">마켓헤머</option>
                            </Input>
                          )}
                        </InputGroup>
                        <InputGroup>
                          <CommonCodeSelect
                              groupId="10"
                              selectId="schRequestCd"
                              value={searchParams.schRequestCd}
                              onChange={(e) =>
                                  updateSearchParams("schRequestCd", e.target.value)
                              }
                              classNm="my-input-text form-control"
                              initText="요청 선택"
                          />
                        </InputGroup>
                        <InputGroup>
                          <CommonCodeSelect
                              groupId="20"
                              selectId="schStatusCd"
                              value={searchParams.schStatusCd}
                              onChange={(e) =>
                                  updateSearchParams("schStatusCd", e.target.value)
                              }
                              classNm="my-input-text form-control"
                              initText="처리상태 선택"
                          />
                        </InputGroup>
                        <InputGroup className="input-group-dynamic-2date">
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
                      <Button type="button" onClick={handleExcelDown} color="success">
                        엑셀다운
                      </Button>
                      <Button
                          type="button"
                          color="default"
                          onClick={() =>
                              navigate("/admin/suport/form", {
                                state: { formType: "insert" },
                              })
                          }
                      >신규등록
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <SuportTable
                    data={data}
                    onRowClick={(suportReqId: number) => {
                        const row = data.find((item) => item.suportReqId === suportReqId);
                        if (row) handleRowClick(row.suportReqId, row.statusCd);
                    }}
                />

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

export default SuportHome;
