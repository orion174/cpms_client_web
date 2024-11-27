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
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import useModalHook from "@/hook/useModal.ts";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import { callAPI } from "@/utils/interceptor.ts";
import { useSearchParams } from "react-router-dom";
import { base64ToUtf8 } from "@/utils/common.ts";
import { suportRes, suportFileList, FileItem, NewFileItem } from "@/definition/type.ts";

interface ResFormProps {
    statusCd?: number | null;
    editData?: suportRes | null;
    resFileList?: suportFileList[];
    onCancel?: () => void;
}

const ResForm: React.FC<ResFormProps> = ({ statusCd, editData, resFileList, onCancel }) => {
    const { openCustomModal } = useModalHook();
    const [ searchParams] = useSearchParams();

    const [ resStatusCd, setResStatusCd ] = useState<number>(editData?.suportResId ? statusCd || 0 : 0);
    const [ resTitle, setResTitle ] = useState<string>(editData?.resTitle || "");
    const [ fileList, setFileList ] = useState<FileItem[]>([]);

    const oEditorsRes = useRef<any[]>([]);

    // SmartEditor 초기화
    useEffect(() => {
        const loadScripts = () => {
            const script = document.createElement("script");
            script.src = "/smarteditor/js/HuskyEZCreator.js";
            script.type = "text/javascript";
            script.charset = "utf-8";

            script.onload = () => {
                initializeSmartEditor("resEditorTxt", oEditorsRes.current)
                    .then(() => {
                        if (editData?.resEditor) {
                            oEditorsRes.current[0].setContents(editData.resEditor);
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

    }, [editData]);

    useEffect(() => {
        if (resFileList && fileList.length === 0) {
            const existingFiles: FileItem[] = resFileList.map((file) => ({
                id: file.suportFileId,
                name: file.fileOgNm,
                isNew: false,
            }));

            setFileList(existingFiles);
        }
    }, [resFileList]);

    // 저장버튼 클릭 이벤트
    const handleResSave = () => {
        let message = ``;

        if (!resTitle.trim()) {
            message = `처리 내역을 입력하세요.`;

        } else if (!resStatusCd) {
            message = `처리 상태를 선택하세요.`;
        }

        if (message) {
            openCustomModal({ title: "알림", message, isConfirm: false });

        } else {
            openCustomModal({
                title: "확인",
                message: "저장하시겠습니까?",
                isConfirm: true,
                onConfirm: () => {
                    saveSuportRes();
                }
            });
        }
    };

    // 데이터 저장
    const saveSuportRes = async () => {
        const encodedId = searchParams.get("suport_page");

        if (!encodedId) {
            console.error("suport_page parameter NaN");
            return;
        }

        const decodedId = parseInt(base64ToUtf8(encodedId), 10);

        const formData = new FormData();
        formData.append("suportReqId", decodedId.toString());
        formData.append("resStatusCd", resStatusCd.toString());
        formData.append("resTitle", resTitle);
        formData.append("resEditor", getEditorContent(oEditorsRes.current));

        // 첨부파일
        fileList.filter((file): file is NewFileItem => file.isNew && !!file.file)
            .forEach((file) => {
                if (file.file) {
                    formData.append("resFile", file.file);
                }
            });

        const endpoint
            = editData ? `/api/suport/resUpdate` : `/api/suport/resInsert`;

        const res = await callAPI.post(endpoint, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
            openCustomModal({
                title: "알림",
                message: "저장이 완료되었습니다.",
                isConfirm: false,
                redirectUrl: `/admin/suport/detail?suport_page=${encodedId}`,
            });
        }
    };

    const handleDeleteResFile = async (suportFileId: number) => {
        openCustomModal({
            title: "알림",
            message: "저장된 파일을 삭제하시겠습니까?",
            isConfirm: true,
            onConfirm: async () => {
                const res
                    = await callAPI.post(`/api/suport/file/${suportFileId}`);

                if(res.status === 200) {
                    openCustomModal({ title: "알림", message: "파일이 삭제되었습니다.", isConfirm: false });

                    // UI에서 삭제된 파일 제거
                    setFileList((prev) => prev.filter((file) => file.id !== suportFileId));
                }
            }
        });
    };

    return (
        <div className="res-form-container">
            <Row>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                    <Card className="card-profile shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="10">
                                    <h2 className="mb-0">{editData ? "처리 내역 수정" : "처리 내역 작성"}</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col xl="10">
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    className="my-input-text"
                                                    value={resTitle}
                                                    placeholder="처리 내역을 입력하세요"
                                                    onChange={(e) => setResTitle(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="2">
                                            <ComCodeSelect
                                                groupId="20"
                                                selectId="resStatusCd"
                                                value={resStatusCd}
                                                onChange={(e) => setResStatusCd(parseInt(e.target.value, 10))}
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
                                                <label className="form-control-label-custom">
                                                    처리 상세 내역
                                                </label>
                                                <div id="smarteditor">
                                                    <textarea
                                                        name="resEditorTxt"
                                                        id="resEditorTxt"
                                                        rows={10}
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col xl="12">
                                            <FileUpload
                                                formType={editData ? "update" : "insert"}
                                                initFiles={resFileList?.map((file) => ({
                                                    id: file.suportFileId,
                                                    name: file.fileOgNm,
                                                    isNew: false
                                                }))}
                                                onFileChange={setFileList}
                                                onDeleteFiles={handleDeleteResFile}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="pl-lg-4">
                                    <Col className="text-right" xs="12">
                                        <Button onClick={onCancel} color="danger">취소</Button>
                                        <Button onClick={handleResSave} color="info">답변 저장</Button>
                                    </Col>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ResForm;
