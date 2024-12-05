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
import ResForm from "@/view/page/suport/components/ResForm.tsx";
import ResDetail from "@/view/page/suport/components/ResDetail.tsx";
import useModalHook from "@/hook/useModal";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ApiRes, suportFileList, ResSuportDetailDTO, suportRes } from "@/definition/type.ts";
import { base64ToUtf8, isBase64 } from "@/utils/common.ts";
import FileDown from "@/components/Module/FileDownload";
import { callAPI } from "@/auth/interceptor.ts";

const SuportDetail: React.FC = () => {
    const navigate = useNavigate();

    const {openCustomModal} = useModalHook();
    const [showResForm, setShowResForm] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [statusCd, setStatusCd] = useState<number | null>(null);
    const [editData, setEditData] = useState<suportRes | null>(null);

    const [searchParams] = useSearchParams();
    const encodedId = searchParams.get("suport_page");

    // 프로젝트 문의 상세 데이터
    const [result, setResult] = useState<ResSuportDetailDTO | null>(null);
    // 문의, 처리 첨부파일 구분
    const [reqFileList, setReqFileList] = useState<suportFileList[]>([]);
    const [resFileList, setResFileList] = useState<suportFileList[]>([]);

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

            if (res?.data?.result) {
                setResult(res.data.result);

                // 첨부파일
                const fileList = res.data.result.fileList || [];

                const reqFileList: SetStateAction<suportFileList[]> = [];
                const resFileList: SetStateAction<suportFileList[]> = [];

                if(fileList.length > 0) {
                    fileList.forEach(item => {
                        if(item.fileType === 'REQ') {
                            reqFileList.push(item);

                        } else if(item.fileType === 'RES') {
                            resFileList.push(item);
                        }
                    });

                    setReqFileList(reqFileList);
                    setResFileList(resFileList);
                }
            }
        };

        fetchData();

    }, [encodedId]);

    // 답변 입력 폼 노출
    const handleShowResForm = () => {
        setShowResForm(true);
    }

    // 목록 이동
    const handleList = () => {
        navigate("/admin/suport/index");
    };

    const handleReqUpdate = () => {
        openCustomModal({
            title: "알림",
            message: "해당 기능은 준비중입니다.",
            isConfirm: false
        });
    }
    
    // 답변 삭제
    const handleResDelete = async () => {
        if(!result) {
            return;

        } else {
            openCustomModal({
                title: "알림",
                message: "정말 삭제하시겠습니까?",
                isConfirm: true,
                onConfirm: async () => {
                    const suportReqId = result.suportReqId;

                    if(suportReqId) {
                        const jsonData = {
                            suportReqId: suportReqId
                        }

                        const res
                            = await callAPI.post(`/api/suport/resDelete`, jsonData);

                        if(res.status === 200) {
                            openCustomModal({
                                title: "알림",
                                message: "답변이 삭제되었습니다.",
                                isConfirm: false
                                // 리다이렉트도 고려
                            });

                            setResult({ ...result, suportRes: null });
                            setResFileList([]);
                        }
                    }
                }
            });
        }
    }
    
    // 답변 수정 ( 폼 리랜더링 )
    const handleResUpdate = () => {
        if(result && result.suportRes) {
            setStatusCd(result.statusCd); // 처리 상태 코드
            setEditData(result.suportRes); // 처리 내역 데이터
            setEditMode(true);
        }
    }

    // 문의의 답변 여부 상태를 감별한다.
    const hasSuportRes = (res: ResSuportDetailDTO | null): res is ResSuportDetailDTO & { suportRes: suportRes } => {
        return !!res?.suportRes && res.suportRes.suportResId > 0;
    };

    return (
        <>
            <Header/>
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
                            <Button color="info" onClick={handleReqUpdate}>문의수정</Button>
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
                                              <label className="form-control-label-custom">처리 담당자</label>
                                              <div className="my-detail-text">{result?.resUserNm ?? '-'}</div>
                                          </FormGroup>
                                      </Col>
                                      <Col lg="4">
                                          <FormGroup>
                                              <label className="form-control-label-custom">처리 상태</label>
                                              <div className="my-detail-text">{result?.statusCdNm}</div>
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
                                          <label className="form-control-label-custom">첨부 파일</label>
                                          <FileDown fileList={reqFileList} idKey="suportFileId"/>
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
                              </div>

                              {!showResForm &&
                                  !(hasSuportRes(result)) && (
                                      <div className="button-right" onClick={handleShowResForm}>
                                          <Button color="success">답변하기</Button>
                                      </div>
                                  )
                              }

                          </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                {!editMode && hasSuportRes(result) && (
                    <ResDetail
                        suportRes={result.suportRes}
                        resFileList={resFileList}
                        onResDelete={handleResDelete}
                        onResUpdate={handleResUpdate}
                    />
                )}

                {showResForm && <ResForm />}

                {editMode &&
                    <ResForm
                        statusCd={statusCd}
                        editData={editData}
                        resFileList={resFileList}
                        onCancel={() => setEditMode(false)}
                    />
                }

            </Container>
        </>
    );
};

export default SuportDetail;