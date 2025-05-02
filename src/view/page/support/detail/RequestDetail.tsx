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
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useModalHook from "@/hook/useModal.ts";
import { base64ToUtf8, isBase64 } from "@/utils/common.ts";
import { apiClient } from "@/core/api/client.ts";

import Header from "@/view/layout/Headers/Header.jsx";
import FileDown from "@/components/Module/FileDownload.tsx";

import ResponseForm from "./components/ResponseForm.tsx";
import ResponseDetail from "./components/ResponseDetail.tsx";

import { ResSupportDetailDTO, supportResponse, supportFileList } from "../types.ts";

const SupportDetail: React.FC = () => {
    const navigate = useNavigate();
    const { openCustomModal } = useModalHook();

    const [showResponseForm, setShowResponseForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [statusCd, setStatusCd] = useState<number | null>(null);
    const [editData, setEditData] = useState<supportResponse | null>(null);
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState<ResSupportDetailDTO | null>(null);
    const [requestFileList, setRequestFileList] = useState<supportFileList[]>([]);
    const [responseFileList, setResponseFileList] = useState<supportFileList[]>([]);
    const [authType, setAuthType] = useState<string>("");

    const encodedId = searchParams.get("support_page");

    useEffect(() => {
        const fetchDetail = async () => {
            if (!encodedId || !isBase64(encodedId)) {
                openCustomModal({
                    title: "오류",
                    message: "잘못된 접근입니다.",
                    isConfirm: false,
                    redirectUrl: "/admin/support/list",
                });

                return;
            }

            const decodedId = parseInt(base64ToUtf8(encodedId), 10);
            if (isNaN(decodedId)) return;

            try {
                const endPoint = `/api/support/detail`;

                const result = await apiClient.post<ResSupportDetailDTO>(endPoint, {
                    supportRequestId: decodedId,
                });

                setResult(result);
                setAuthType(result.authType);

                const requestFiles = result.fileList?.filter(f => f.fileType === "REQ") ?? [];
                const responseFiles = result.fileList?.filter(f => f.fileType === "RES") ?? [];

                setRequestFileList(requestFiles);
                setResponseFileList(responseFiles);
            } catch (error) {
                console.error("유지보수 상세 조회 실패", error);
            }
        };

        fetchDetail();
    }, [encodedId]);

    const handleList = () => {
        navigate("/admin/support/list");
    };

    const handleUpdateRequest = () => {
        openCustomModal({
            title: "알림",
            message: "해당 기능은 준비중입니다.",
            isConfirm: false,
        });
    };

    const handleShowResponseForm = () => setShowResponseForm(true);

    const handleDeleteResponse = async () => {
        if (!result) return;

        openCustomModal({
            title: "알림",
            message: "정말 삭제하시겠습니까?",
            isConfirm: true,
            onConfirm: async () => {
                const endPoint = `/api/support/delete-response`;

                await apiClient.post<null>(endPoint, {
                    supportRequestId: result.supportRequestId,
                });

                openCustomModal({
                    title: "알림",
                    message: "답변이 삭제되었습니다.",
                    isConfirm: false,
                });

                setResult({ ...result, supportResponse: null });
                setResponseFileList([]);
            },
        });
    };

    const handleUpdateResponse = () => {
        if (result?.supportResponse) {
            setStatusCd(result.statusCd);
            setEditData(result.supportResponse);
            setEditMode(true);
        }
    };

    const hasSupportResponse = (
        response: ResSupportDetailDTO | null
    ): response is ResSupportDetailDTO & { supportResponse: supportResponse } => {
        return !!response?.supportResponse && response.supportResponse.supportResponseId > 0;
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card className="card-profile shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h2 className="mb-0">프로젝트 문의</h2>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button color="default" onClick={handleList}>목록</Button>
                                        <Button color="info" onClick={handleUpdateRequest}>문의수정</Button>
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
                                                    <div className="my-detail-text">{result?.requestCompanyNm}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">프로젝트 명</label>
                                                    <div className="my-detail-text">{result?.requestProjectNm}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">요청 유형</label>
                                                    <div className="my-detail-text">{result?.requestNm}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">처리 기한</label>
                                                    <div className="my-detail-text">{result?.requestDate}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">처리 담당자</label>
                                                    <div className="my-detail-text">{result?.requestUserNm ?? '-'}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">처리 상태</label>
                                                    <div className="my-detail-text">{result?.statusNm}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">요청 제목</label>
                                                    <div className="my-detail-text">{result?.supportTitle}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    {requestFileList.length > 0 && (
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label className="form-control-label-custom">첨부 파일</label>
                                                        <FileDown fileList={requestFileList} idKey="supportFileId" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">상세 내용</label>
                                                    <div className="text-editor__wrapper">
                                                        <div className="my-detail-text-editor"
                                                             dangerouslySetInnerHTML={{ __html: result?.supportEditor || "" }}
                                                        ></div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    {authType !== "USER" && !showResponseForm && !hasSupportResponse(result) && (
                                        <div className="button-right">
                                            <Button color="success" onClick={handleShowResponseForm}>답변하기</Button>
                                        </div>
                                    )}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {!editMode && hasSupportResponse(result) && (
                    <ResponseDetail
                        supportResponse={result.supportResponse}
                        authType={authType}
                        responseFileList={responseFileList}
                        onResponseDelete={handleDeleteResponse}
                        onResponseUpdate={handleUpdateResponse}
                    />
                )}

                {showResponseForm && <ResponseForm />}

                {editMode && (
                    <ResponseForm
                        statusCd={statusCd}
                        editData={editData}
                        responseFileList={responseFileList}
                        onCancel={() => setEditMode(false)}
                    />
                )}
            </Container>
        </>
    );
};

export default SupportDetail;
