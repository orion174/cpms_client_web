import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row
} from "reactstrap";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useModalHook from "@/hook/useModal.ts";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import { base64ToUtf8 } from "@/utils/common.ts";
import { apiClient } from "@/core/api/client.ts";

import CommonCodeSelect from "@/components/CommonModule/CommonCodeSelect.tsx";
import FileUpload from "@/components/CommonModule/FileUpload.tsx";

import { FileItem, NewFileItem } from '@/definition/common.types.ts';
import { supportResponse, supportFileList } from "../../types.ts";

interface ResponseFormProps {
    statusCd?: number | null;
    editData?: supportResponse | null;
    responseFileList?: supportFileList[];
    onCancel?: () => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ statusCd, editData, responseFileList, onCancel }) => {
    const [ searchParams ] = useSearchParams();
    const { openCustomModal } = useModalHook();

    const [ supportResponseId ] = useState<number>(editData?.supportResponseId || 0);
    const [ responseStatusCd, setResponseStatusCd ] = useState<number>(editData?.supportResponseId ? statusCd || 0 : 0);
    const [ responseTitle, setResponseTitle ] = useState<string>(editData?.responseTitle || "");
    const [ fileList, setFileList ] = useState<FileItem[]>([]);

    const oEditorsResponse = useRef<any[]>([]);
    useEffect(() => {
        const loadScripts = () => {
            const script = document.createElement("script");
            script.src = "/smarteditor/js/HuskyEZCreator.js";
            script.type = "text/javascript";
            script.charset = "utf-8";

            script.onload = () => {
                initializeSmartEditor("responseEditorTxt", oEditorsResponse.current)
                    .then(() => {
                        if (editData?.responseEditor) {
                            oEditorsResponse.current[0].setContents(editData.responseEditor);
                        }
                    })
                    .catch((error) => console.error("SmartEditor error:", error));
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        loadScripts();
    }, []);

    // 문의 답변 첨부파일
    useEffect(() => {
        if (responseFileList) {
            const existingFiles: FileItem[] = responseFileList.map((file) => ({
                id: file.supportFileId,
                name: file.fileOgNm,
                isNew: false,
            }));

            setFileList(existingFiles);
        }
    }, [responseFileList]);

    // 문의 답변을 저장한다.
    const handleSaveSupportResponse = () => {
        let message = "";

        if (!responseTitle.trim()) message = "처리 내역을 입력하세요.";
        else if (!responseStatusCd) message = "처리 상태를 선택하세요.";

        if (message) {
            openCustomModal({ title: "알림", message, isConfirm: false });

        } else {
            openCustomModal({
                title: "확인",
                message: "저장하시겠습니까?",
                isConfirm: true,
                onConfirm: saveSupportResponse
            });
        }
    };

    // 문의 답변 저장 API
    const saveSupportResponse = async () => {
        const encodedId = searchParams.get("support_page");
        if (!encodedId) return;

        const formData = new FormData();
        const decodedId = parseInt(base64ToUtf8(encodedId), 10);

        formData.append("supportRequestId", decodedId.toString());
        formData.append("responseStatusCd", responseStatusCd.toString());
        formData.append("responseTitle", responseTitle);
        formData.append("responseEditor", getEditorContent(oEditorsResponse.current));

        if (editData) formData.append("supportResponseId", supportResponseId.toString());

        fileList.filter((file): file is NewFileItem => file.isNew && !!file.file)
            .forEach((file) => file.file && formData.append("responseFile", file.file));

        const endPoint
            = editData ? `/api/support/update-response` : `/api/support/insert-response`;

        await apiClient.postForm<null>(endPoint, formData);

        openCustomModal({
            title: "알림",
            message: "저장이 완료되었습니다.",
            isConfirm: false,
            redirectUrl: `/admin/support/detail?support_page=${encodedId}`,
        });
    };

    // 문의 답변에 첨부된 파일을 삭제한다.
    const handleDeleteResponseFile = (supportFileId: number) => {
        openCustomModal({
            title: "알림",
            message: "파일을 삭제하시겠습니까?",
            isConfirm: true,
            onConfirm: async () => {
                try {
                    const endPoint = `/api/support/file/${supportFileId}/delete`;

                    await apiClient.post<null>(endPoint);

                    openCustomModal({
                        title: "알림",
                        message: "파일이 삭제되었습니다.",
                        isConfirm: false,
                    });

                    setFileList(fileList.filter((file) => file.id !== supportFileId));

                } catch (error) {
                    console.error("파일 삭제 실패", error);
                    openCustomModal({
                        title: "오류",
                        message: "파일 삭제 중 오류가 발생했습니다.",
                        isConfirm: false,
                    });
                }
            },
        });
    };

    return (
        <div className="res-form-container">
            <Row>
                <Col xl="12">
                    <Card className="card-profile shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="10">
                                    <h2 className="mb-0">{editData ? "처리 내역 수정" : "처리 내역 작성"}</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col xl="10">
                                            <label className="form-control-label-custom">처리 내역</label>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    className="my-input-text"
                                                    value={responseTitle}
                                                    placeholder="처리 내역을 입력하세요"
                                                    onChange={(e) => setResponseTitle(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="2">
                                            <label className="form-control-label-custom">처리 상태</label>
                                            <CommonCodeSelect
                                                groupCode="20"
                                                selectId="responseStatusCd"
                                                value={responseStatusCd}
                                                onChange={(e) => setResponseStatusCd(parseInt(e.target.value, 10))}
                                                classNm="my-input-text form-control"
                                                initText="처리 상태 선택"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col xl="12">
                                            <FormGroup>
                                                <label className="form-control-label-custom">처리 상세 내역</label>
                                                <div id="smarteditor">
                                                    <textarea
                                                        name="responseEditorTxt"
                                                        id="responseEditorTxt"
                                                        rows={10}
                                                        style={{width: "100%"}}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col xl="12">
                                            <FormGroup>
                                                <FileUpload
                                                    formType={editData ? "update" : "insert"}
                                                    onFileChange={setFileList}
                                                    initFiles={fileList}
                                                    onDeleteFiles={handleDeleteResponseFile}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                        <CardBody>
                            <Form>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col className="text-right" xs="12">
                                            {onCancel && <Button onClick={onCancel} color="danger">취소</Button>}
                                            <Button onClick={handleSaveSupportResponse} color="info">답변 저장</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ResponseForm;
