import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Container,
    Row,
    Col,
    FormGroup
} from "reactstrap";

import Header from "@/view/layout/Headers/Header.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams  } from "react-router-dom";
import useModalHook from "@/hook/useModal";

import {ApiRes, FileList, ResSuportDetailDTO} from "@/definition/type.ts";
import { base64ToUtf8, isBase64 } from "@/utils/common.ts";
import { callAPI } from "@/utils/interceptor";
import FileDown from "@/components/Module/FileDownload";
import ResForm from "@/view/page/suport/components/ResForm.tsx";

const SuportDetail: React.FC = () => {
    const navigate = useNavigate();
    const { openCustomModal } = useModalHook();
    const [ showResForm, setShowResForm ] = useState(false);

    // 응답 폼 Show
    const handleShowResForm = () => {
        setShowResForm(true);
    }

    // 목록 이동
    const handleList = () => {
        navigate("/admin/suport/index");
    };

    const [searchParams] = useSearchParams();
    const encodedId = searchParams.get("suport_page");

    const [ result, setResult ] = useState<ResSuportDetailDTO | null>(null);
    const [ fileList, setFileList ] = useState<FileList[]>([]);

    // suport_page가 바뀔 때 마다 데이터 바인딩
    useEffect(() => {
        const fetchData = async () => {

            if (!encodedId || !isBase64(encodedId)) {
                openCustomModal({
                    title: "오류",
                    message: "잘못된 접근입니다.",
                    isConfirm: false,
                    redirectUrl: "/admin/suport/index",
                });

                return;
            }

            const decodedId = parseInt(base64ToUtf8(encodedId), 10);

            if (isNaN(decodedId)) {
                console.error('NaN');
                return;
            }

            // API 호출
            const jsonData = {
                suportReqId: decodedId
            };

            const url = `/api/suport/detail`;

            const res
                = await callAPI.post<ApiRes<ResSuportDetailDTO>>(url, jsonData);

            if(res?.data?.result) {
                setResult(res.data.result);
                setFileList((res.data.result.fileList || []));
            }
        };

        fetchData();

    }, [encodedId]);

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                    <Card className="card-profile shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                              <h2 className="mb-0">프로젝트 문의</h2>
                          </Col>
                          <Col className="text-right" xs="4">
                            <Button color="default" onClick={handleList}>목록</Button>
                            <Button color="info" outline>수정</Button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody className="pt-0 pt-md-4">
                          <Form>
                              <div className="pl-lg-4">
                                  <Row>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">요청 업체</label>
                                              <div className="my-detail-text">{result?.reqCompanyNm}</div>
                                          </FormGroup>
                                      </Col>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">프로젝트 명</label>
                                              <div className="my-detail-text">{result?.reqProjectNm}</div>
                                          </FormGroup>
                                      </Col>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">요청 유형</label>
                                              <div className="my-detail-text">{result?.requestCdNm}</div>
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">처리 기한</label>
                                              <div className="my-detail-text">{result?.reqDate}</div>
                                          </FormGroup>
                                      </Col>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">처리 상태</label>
                                              <div className="my-detail-text">{result?.statusCdNm}</div>
                                          </FormGroup>
                                      </Col>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">처리 담당자</label>
                                              <div className="my-detail-text">{result?.resUserNm ?? '-'}</div>
                                          </FormGroup>
                                      </Col>
                                  </Row>
                              </div>
                              <div className="pl-lg-4 section-space">
                                  <Row>
                                      <Col lg="12">
                                          <FormGroup>
                                              <label className="form-control-label-custom">요청 제목</label>
                                              <div className="my-detail-text">{result?.suportTitle}</div>
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col lg="12">
                                          <FileDown fileList={fileList} idKey="suportFileId"/>
                                      </Col>
                                  </Row>
                              </div>
                              <div className="pl-lg-4 section-space">
                                  <Row>
                                      <Col lg="12">
                                          <FormGroup>
                                              <label className="form-control-label-custom">상세 내용</label>
                                              <div className="text-editor__wrapper">
                                                  <div className="my-detail-text-editor"
                                                       dangerouslySetInnerHTML={{__html: result?.suportEditor || ""} as {
                                                           __html: string
                                                       }}
                                                  ></div>
                                              </div>
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  {!showResForm && (
                                      <div className="button-right" onClick={handleShowResForm}>
                                          <Button color="success">응대</Button>
                                      </div>
                                  )}
                              </div>

                          </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                {showResForm && <ResForm />}

            </Container>
        </>
    );
};

export default SuportDetail;