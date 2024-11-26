import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
import { useEffect, useRef, useState } from "react";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import useModalHook from "@/hook/useModal.ts";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import {callAPI} from "@/utils/interceptor.ts";
import { useSearchParams } from "react-router-dom";
import {base64ToUtf8} from "@/utils/common.ts";

interface FileItem {
    id: number;
    file: File;
    name: string;
}

const ResForm: React.FC = () => {
    const { openCustomModal } = useModalHook();
    const [searchParams] = useSearchParams();

    const [resStatusCd, setResStatusCd] = useState<number>(0);
    const [resTitle, setResTitle] = useState<string>('');
    const [fileList, setFileList] = useState<FileItem[]>([]);

    // 응답을 취소한다.
    const handleResCancle = () => {
        openCustomModal({
            title: "알림",
            message: "목록으로 돌아가겠습니까?",
            isConfirm: false,
            redirectUrl: "/admin/suport/index",
        });
    }

    const oEditorsRes = useRef<never[]>([]);

    useEffect(() => {
        const loadScripts = () => {
            const script = document.createElement("script");
            script.src = "/smarteditor/js/HuskyEZCreator.js";
            script.type = "text/javascript";
            script.charset = "utf-8";

            script.onload = () => {
                initializeSmartEditor("resEditorTxt", oEditorsRes.current)
                    .then(() => console.log("SmartEditor initialized."))
                    .catch((error) => console.error("SmartEditor error:", error));
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        loadScripts();
    }, []);

    // 저장버튼 클릭 이벤트
    const handleResSave = () => {
        let message = ``;

        if (!resStatusCd) {
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
    }

    // 프로젝트 문의 응대 데이터 저장
    const saveSuportRes = async () => {
        const encodedId = searchParams.get("suport_page");

        if (!encodedId) {
            console.error('suport_page parameter NaN');
            return;

        } else {
            const decodedId = parseInt(base64ToUtf8(encodedId), 10);

            const data = new FormData();

            data.append("suportReqId", decodedId.toString());
            data.append("resStatusCd", resStatusCd.toString());
            data.append("resTitle", resTitle);
            data.append("resEditor", getEditorContent(oEditorsRes.current));

            // 첨부파일
            fileList.forEach(
                (file) => data.append("resFile", file.file)
            );

            const res
                = await callAPI.post("/api/suport/resInsert", data, {
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
        }
    }

    return (
        <>
            <div className="res-form-container">
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                        <Card className="card-profile shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="10">
                                        <h2 className="mb-0">프로젝트 문의 답변 작성</h2>
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
                                                            placeholder="답변을 입력하세요."
                                                            onChange={(e) => setResTitle((e.target.value))}
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
                                                        <div id="smarteditor">
                                                        <textarea
                                                            name="resEditorTxt"
                                                            id="resEditorTxt"
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
                                                    <FileUpload formType="insert" onFileChange={setFileList}/>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="pl-lg-4">
                                            <Col className="text-right" xs="12">
                                                <Button color="danger" onClick={handleResCancle}>취소</Button>
                                                <Button color="info" onClick={handleResSave}>답변저장</Button>
                                            </Col>
                                        </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ResForm;