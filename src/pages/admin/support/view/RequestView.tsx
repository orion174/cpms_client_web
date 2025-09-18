import { Button, Card, CardHeader, CardBody, Form, Container, Row, Col, FormGroup } from "reactstrap";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useModalHook from "@/hooks/useModal.ts";
import { useCancelNavigation } from "@/hooks/customHook.ts";
import { base64ToUtf8, isBase64 } from "@/utils/cmmn.ts";
import { getUserAuthType } from '@/utils/cmmn.ts';

import Empty from "@/layout/StatusArea/Empty.tsx";
import FileDown from "@/components/CmmnModule/FileDownload.tsx";
import ResponseForm from "./components/ResponseForm.tsx";
import ResponseView from "./components/ResponseView.tsx";
import SupportInfoBlock from "./components/SupportInfoBlock.tsx";

import { fetchSupportViewApi, deleteSupportResponseApi } from "@/server/api/support/service"
import type { ResSupportViewDTO, supportResponse, supportFileList } from "@/types/support/types";

const SupportView: React.FC = () => {
    const { openCustomModal } = useModalHook();
    const confirmCancel = useCancelNavigation(false);

    const [ showResponseForm, setShowResponseForm ] = useState(false);
    const handleShowResponseForm = () => setShowResponseForm(true);

    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ statusCd, setStatusCd ] = useState<number | null>(null);
    const [ editData, setEditData ] = useState<supportResponse | null>(null);
    const [ searchParams ] = useSearchParams();
    const [ result, setResult ] = useState<ResSupportViewDTO | null>(null);
    const [ requestFileList, setRequestFileList ] = useState<supportFileList[]>([]);
    const [ responseFileList, setResponseFileList ] = useState<supportFileList[]>([]);
    const [ authType, setAuthType ] = useState<string>("");

    const encodedId = searchParams.get("support_page");

    useEffect((): void => {
        const fetchSupportView = async (): Promise<void> => {

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

            const [type, viewResult] = await Promise.all([
                getUserAuthType(),
                fetchSupportViewApi(decodedId)
            ]);

            setAuthType(type ?? "");
            if (!viewResult) return;
            setResult(viewResult);

            setRequestFileList(viewResult.fileList?.filter(f => f.fileType === "REQ") ?? []);
            setResponseFileList(viewResult.fileList?.filter(f => f.fileType === "RES") ?? []);
        };

        fetchSupportView();
    }, [ encodedId ]);

    // 답변 삭제
    const handleDeleteResponse = async (): Promise<void> => {
        if (!result) return;

        openCustomModal({
            title: "알림",
            message: "정말 삭제하시겠습니까?",
            isConfirm: true,
            onConfirm: async (): Promise<void> => {
                await deleteSupportResponseApi(result.supportRequestId);

                openCustomModal({
                    title: "알림",
                    message: "답변이 삭제되었습니다.",
                    isConfirm: false,
                });

                setResult({...result, supportResponse: null});
                setResponseFileList([]);
            },
        });
    };

    // 문의 답변 수정
    const handleUpdateResponse = (): void => {
        if (result?.supportResponse) {
            setStatusCd(result.statusCd);
            setEditData(result.supportResponse);
            setEditMode(true);
        }
    };

    // 문의 답변 유무를 검사한다.
    const hasSupportResponse = (
        response: ResSupportViewDTO | null
    ): response is ResSupportViewDTO & { supportResponse: supportResponse } => {
        return response?.supportResponse != null
            && response.supportResponse.supportResponseId > 0;
    };

    return (
        <>
            <Empty/>

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
                                        <Button
                                            color="default"
                                            onClick={confirmCancel}
                                        >
                                            목록
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Form>
                                    {/* 문의 기본 정보 */}
                                    <SupportInfoBlock result={result} />

                                    {/* 요청 제목, 첨부파일, 상세 내용 */}
                                    {result && (
                                        <>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label className="form-control-label-custom">요청 제목</label>
                                                            <div className="my-detail-text">{result.supportTitle}</div>
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
                                                                <FileDown
                                                                    content="support"
                                                                    fileList={requestFileList}
                                                                    idKey="supportFileId"
                                                                />
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
                                                                <div
                                                                    className="my-detail-text-editor"
                                                                    dangerouslySetInnerHTML={{ __html: result.supportEditor || "" }}
                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </>
                                    )}

                                    {/* 답변하기 버튼 */}
                                    {authType === "ADMIN" && !showResponseForm && !hasSupportResponse(result) && (
                                        <div className="button-right">
                                            <Button
                                                color="success"
                                                onClick={handleShowResponseForm}
                                            >
                                                답변하기
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* 답변 조회 */}
                {!editMode && hasSupportResponse(result) && (
                    <ResponseView
                        authType={authType}
                        supportResponse={result.supportResponse}
                        responseFileList={responseFileList}
                        onResponseDelete={handleDeleteResponse}
                        onResponseUpdate={handleUpdateResponse}
                    />
                )}

                {/* 답변 작성 및 수정 폼 */}
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

export default SupportView;
