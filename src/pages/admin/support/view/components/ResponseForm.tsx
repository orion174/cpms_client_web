import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row } from "reactstrap";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useModalHook from "@/hooks/useModal";
import { base64ToUtf8 } from "@/utils/cmmn";

import SmartEditor, { SmartEditorHandle } from "@/components/CmmnModule/SmartEditor";
import CmmnCodeSelect from "@/components/SelectModule/CmmnCodeSelect";
import FileUpload from "@/components/CmmnModule/FileUpload";

import { FileItem, NewFileItem } from '@/types/cmmn';
import { supportResponse, supportFileList } from '@/types/support/types';
import { saveSupportResponseApi, deleteSupportFileApi } from "@/server/api/support/service";

interface ResponseFormProps {
    statusCd?: number | null;
    editData?: supportResponse | null;
    responseFileList?: supportFileList[];
    onCancel?: () => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({
    statusCd,
    editData,
    responseFileList,
    onCancel
}) => {
    const [ searchParams ] = useSearchParams();
    const { openCustomModal } = useModalHook();

    const [ supportResponseId ] = useState<number>(editData?.supportResponseId || 0);
    const [ responseStatusCd, setResponseStatusCd ] = useState<number>(editData?.supportResponseId ? statusCd || 0 : 0);
    const [ responseTitle, setResponseTitle ] = useState<string>(editData?.responseTitle || "");
    const [ fileList, setFileList ] = useState<FileItem[]>([]);

    const editorRef = useRef<SmartEditorHandle>(null);
    const responseEditor = editData?.responseEditor || "";

    // 문의 답변 첨부파일
    useEffect((): void => {
        if (responseFileList) {
            const existingFiles: FileItem[]
                = responseFileList.map((file) => ({
                    id: file.supportFileId,
                    name: file.fileOgNm,
                    isNew: false,
                }));

            setFileList(existingFiles);
        }
    }, [ responseFileList ]);

    // 문의 답변을 저장한다.
    const handleSaveSupportResponse = (): void => {
        let message = "";

        if (!responseTitle.trim()) message = "처리 내역을 입력하세요.";
        else if (!responseStatusCd) message = "처리 상태를 선택하세요.";

        if (message) {
            openCustomModal({
                title: "알림"
                , message
                , isConfirm: false
            });

        } else {
            openCustomModal({
                title: "확인",
                message: "저장하시겠습니까?",
                isConfirm: true,
                onConfirm: saveSupportResponse
            });
        }
    };

    // 문의 답변 저장
    const saveSupportResponse = async () : Promise<void> => {
        const encodedId = searchParams.get("support_page");
        if (!encodedId) return;

        const decodedId = parseInt(base64ToUtf8(encodedId), 10);
        const formData = new FormData();

        formData.append("supportRequestId", decodedId.toString());
        formData.append("responseStatusCd", responseStatusCd.toString());
        formData.append("responseTitle", responseTitle);

        const content = editorRef.current?.getContent() ?? "";
        formData.append("responseEditor", content);

        if (editData) formData.append("supportResponseId", supportResponseId.toString());

        fileList
            .filter((file): file is NewFileItem => file.isNew && !!file.file)
            .forEach((file) => file.file && formData.append("responseFile", file.file));

        await saveSupportResponseApi(formData, !!editData);

        openCustomModal({
            title: "알림",
            message: "저장이 완료되었습니다.",
            isConfirm: false,
            redirectUrl: `/admin/support/view?support_page=${encodedId}`,
        });
    };


    // 문의 답변에 첨부된 파일을 삭제한다.
    const handleDeleteResponseFile = (supportFileId: number): void => {
        openCustomModal({
            title: "알림",
            message: "파일을 삭제하시겠습니까?",
            isConfirm: true,
            onConfirm: async (): Promise<void> => {
                await deleteSupportFileApi(supportFileId);

                openCustomModal({
                    title: "알림",
                    message: "파일이 삭제되었습니다.",
                    isConfirm: false,
                });

                setFileList(fileList.filter(f => f.id !== supportFileId));
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
                                    <h2 className="mb-0">
                                        {editData ? "처리 내역 수정" : "처리 내역 작성"}
                                    </h2>
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
                                                    onChange={
                                                        (e) => setResponseTitle(e.target.value)
                                                    }
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="2">
                                            <label className="form-control-label-custom">처리 상태</label>
                                            <CmmnCodeSelect
                                                groupCode="20"
                                                value={responseStatusCd}
                                                onChange={
                                                    (e) => setResponseStatusCd(parseInt(e.target.value, 10))
                                                }
                                                classNm="my-custom-select form-control"
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

                                                <SmartEditor
                                                    id="responseEditorTxt"
                                                    row={10}
                                                    ref={editorRef}
                                                    initValue={responseEditor}
                                                />
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
                                            {onCancel &&
                                                <Button
                                                    onClick={onCancel}
                                                    color="danger"
                                                >
                                                    취소
                                                </Button>
                                            }
                                            <Button
                                                onClick={handleSaveSupportResponse}
                                                color="info"
                                            >
                                                답변 저장
                                            </Button>
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
